package com.cybersafe.service.impl;

import com.cybersafe.dto.request.HelpdeskQueryRequest;
import com.cybersafe.dto.request.HelpdeskResponseRequest;
import com.cybersafe.dto.response.HelpdeskQueryDto;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.entity.HelpdeskQuery;
import com.cybersafe.entity.User;
import com.cybersafe.enums.HelpdeskStatus;
import com.cybersafe.exception.ResourceNotFoundException;
import com.cybersafe.exception.UnauthorizedException;
import com.cybersafe.repository.HelpdeskQueryRepository;
import com.cybersafe.repository.UserRepository;
import com.cybersafe.service.HelpdeskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HelpdeskServiceImpl implements HelpdeskService {

    private final HelpdeskQueryRepository helpdeskRepository;
    private final UserRepository userRepository;

    public HelpdeskServiceImpl(HelpdeskQueryRepository helpdeskRepository, UserRepository userRepository) {
        this.helpdeskRepository = helpdeskRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public HelpdeskQueryDto submitQuery(String userEmail, HelpdeskQueryRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        HelpdeskQuery query = new HelpdeskQuery();
        query.setUser(user);
        query.setSubject(request.getSubject().trim());
        query.setCategory(request.getCategory().trim());
        query.setDescription(request.getDescription().trim());
        query.setStatus(HelpdeskStatus.PENDING);

        HelpdeskQuery saved = helpdeskRepository.save(query);
        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HelpdeskQueryDto> getMyQueries(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        return helpdeskRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HelpdeskQueryDto getQueryById(Long id, String requesterEmail, boolean isAdmin) {
        HelpdeskQuery query = helpdeskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Helpdesk query", "id", id));

        // Strict privacy check: only the author or an admin can view the query
        if (!isAdmin && !query.getUser().getEmail().equalsIgnoreCase(requesterEmail)) {
            throw new UnauthorizedException("You are not authorized to view another user's helpdesk query");
        }

        return mapToDto(query);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<HelpdeskQueryDto> getAllQueriesForAdmin(HelpdeskStatus status, int page, int size) {
        Page<HelpdeskQuery> queries;
        if (status != null) {
            queries = helpdeskRepository.findByStatusOrderByCreatedAtDesc(status, PageRequest.of(page, size));
        } else {
            queries = helpdeskRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        }

        List<HelpdeskQueryDto> content = queries.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return new PageResponse<>(content, queries.getNumber(), queries.getSize(),
                queries.getTotalElements(), queries.getTotalPages(), queries.isLast());
    }

    @Override
    @Transactional
    public HelpdeskQueryDto respondToQuery(Long id, String adminEmail, HelpdeskResponseRequest request) {
        HelpdeskQuery query = helpdeskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Helpdesk query", "id", id));

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + adminEmail));

        query.setAdminResponse(request.getAdminResponse().trim());
        query.setStatus(request.getStatus());
        query.setResponder(admin);

        if (request.getStatus() == HelpdeskStatus.RESOLVED) {
            query.setResolvedAt(LocalDateTime.now());
        }

        HelpdeskQuery updated = helpdeskRepository.save(query);
        return mapToDto(updated);
    }

    private HelpdeskQueryDto mapToDto(HelpdeskQuery query) {
        HelpdeskQueryDto dto = new HelpdeskQueryDto();
        dto.setId(query.getId());
        dto.setUserId(query.getUser().getId());
        dto.setUserName(query.getUser().getFullName());
        dto.setUserEmail(query.getUser().getEmail());
        dto.setSubject(query.getSubject());
        dto.setCategory(query.getCategory());
        dto.setDescription(query.getDescription());
        dto.setStatus(query.getStatus());
        dto.setAdminResponse(query.getAdminResponse());
        if (query.getResponder() != null) {
            dto.setResponderId(query.getResponder().getId());
            dto.setResponderName(query.getResponder().getFullName());
        }
        dto.setResolvedAt(query.getResolvedAt());
        dto.setCreatedAt(query.getCreatedAt());
        dto.setUpdatedAt(query.getUpdatedAt());
        return dto;
    }
}
