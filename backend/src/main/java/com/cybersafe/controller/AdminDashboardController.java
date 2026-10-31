package com.cybersafe.controller;

import com.cybersafe.dto.response.AdminStatsDto;
import com.cybersafe.dto.response.ApiResponse;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.dto.response.UserProfileDto;
import com.cybersafe.service.AuthService;
import com.cybersafe.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminDashboardController {

    private final DashboardService dashboardService;
    private final AuthService authService;

    public AdminDashboardController(DashboardService dashboardService, AuthService authService) {
        this.dashboardService = dashboardService;
        this.authService = authService;
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getDashboardStats() {
        AdminStatsDto stats = dashboardService.getAdminStatistics();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<PageResponse<UserProfileDto>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<UserProfileDto> users = authService.getAllUsers(page, size);
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
