package com.cybersafe.service;

import com.cybersafe.dto.request.ChangePasswordRequest;
import com.cybersafe.dto.request.LoginRequest;
import com.cybersafe.dto.request.RegisterRequest;
import com.cybersafe.dto.request.UpdateProfileRequest;
import com.cybersafe.dto.response.AuthResponse;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.dto.response.UserProfileDto;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserProfileDto getCurrentUser(String email);
    UserProfileDto updateProfile(String email, UpdateProfileRequest request);
    void changePassword(String email, ChangePasswordRequest request);
    PageResponse<UserProfileDto> getAllUsers(int page, int size);
}
