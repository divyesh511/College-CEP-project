package com.cybersafe.service.impl;

import com.cybersafe.dto.request.ChangePasswordRequest;
import com.cybersafe.dto.request.LoginRequest;
import com.cybersafe.dto.request.RegisterRequest;
import com.cybersafe.dto.request.UpdateProfileRequest;
import com.cybersafe.dto.response.AuthResponse;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.dto.response.UserProfileDto;
import com.cybersafe.entity.Role;
import com.cybersafe.entity.User;
import com.cybersafe.enums.RoleName;
import com.cybersafe.exception.BadRequestException;
import com.cybersafe.exception.ResourceNotFoundException;
import com.cybersafe.repository.RoleRepository;
import com.cybersafe.repository.UserRepository;
import com.cybersafe.security.JwtTokenProvider;
import com.cybersafe.service.AuthService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().toLowerCase().trim())) {
            throw new BadRequestException("An account with this email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setActive(true);

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_USER, "Community Member")));
        user.setRoles(Collections.singleton(userRole));

        User savedUser = userRepository.save(user);

        // Auto authenticate after registration
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase().trim(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        List<String> roles = savedUser.getRoles().stream()
                .map(r -> r.getName().name())
                .collect(Collectors.toList());

        return new AuthResponse(jwt, savedUser.getId(), savedUser.getEmail(), savedUser.getFullName(), roles);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase().trim(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        List<String> roles = user.getRoles().stream()
                .map(r -> r.getName().name())
                .collect(Collectors.toList());

        return new AuthResponse(jwt, user.getId(), user.getEmail(), user.getFullName(), roles);
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapToProfileDto(user);
    }

    @Override
    @Transactional
    public UserProfileDto updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        user.setFullName(request.getFullName().trim());
        user.setPhone(request.getPhone());
        User updated = userRepository.save(user);

        return mapToProfileDto(updated);
    }

    @Override
    @Transactional
    public void changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password does not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<UserProfileDto> getAllUsers(int page, int size) {
        Page<User> usersPage = userRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        List<UserProfileDto> content = usersPage.getContent().stream()
                .map(this::mapToProfileDto)
                .collect(Collectors.toList());

        return new PageResponse<>(content, usersPage.getNumber(), usersPage.getSize(),
                usersPage.getTotalElements(), usersPage.getTotalPages(), usersPage.isLast());
    }

    private UserProfileDto mapToProfileDto(User user) {
        List<String> roles = user.getRoles().stream()
                .map(r -> r.getName().name())
                .collect(Collectors.toList());

        return new UserProfileDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getActive(),
                roles,
                user.getCreatedAt()
        );
    }
}
