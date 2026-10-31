package com.cybersafe.controller;

import com.cybersafe.dto.request.HelpdeskQueryRequest;
import com.cybersafe.dto.request.HelpdeskResponseRequest;
import com.cybersafe.dto.response.ApiResponse;
import com.cybersafe.dto.response.HelpdeskQueryDto;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.enums.HelpdeskStatus;
import com.cybersafe.service.HelpdeskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class HelpdeskController {

    private final HelpdeskService helpdeskService;

    public HelpdeskController(HelpdeskService helpdeskService) {
        this.helpdeskService = helpdeskService;
    }

    // User: Submit a cyber safety query
    @PostMapping("/helpdesk")
    public ResponseEntity<ApiResponse<HelpdeskQueryDto>> submitQuery(
            Authentication authentication,
            @Valid @RequestBody HelpdeskQueryRequest request) {
        HelpdeskQueryDto created = helpdeskService.submitQuery(authentication.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Your query has been submitted to the community helpdesk", created));
    }

    // User: View personal submitted queries
    @GetMapping("/helpdesk/my")
    public ResponseEntity<ApiResponse<List<HelpdeskQueryDto>>> getMyQueries(Authentication authentication) {
        List<HelpdeskQueryDto> queries = helpdeskService.getMyQueries(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(queries));
    }

    // User/Admin: View specific query details
    @GetMapping("/helpdesk/{id}")
    public ResponseEntity<ApiResponse<HelpdeskQueryDto>> getQueryById(
            @PathVariable Long id,
            Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        HelpdeskQueryDto query = helpdeskService.getQueryById(id, authentication.getName(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success(query));
    }

    // Admin: List all community helpdesk queries with status filter and pagination
    @GetMapping("/admin/helpdesk")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<HelpdeskQueryDto>>> getAllQueriesForAdmin(
            @RequestParam(required = false) HelpdeskStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<HelpdeskQueryDto> queries = helpdeskService.getAllQueriesForAdmin(status, page, size);
        return ResponseEntity.ok(ApiResponse.success(queries));
    }

    // Admin: Provide response and update inquiry status
    @PutMapping("/admin/helpdesk/{id}/respond")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<HelpdeskQueryDto>> respondToQuery(
            @PathVariable Long id,
            Authentication authentication,
            @Valid @RequestBody HelpdeskResponseRequest request) {
        HelpdeskQueryDto updated = helpdeskService.respondToQuery(id, authentication.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Response recorded and query updated successfully", updated));
    }
}
