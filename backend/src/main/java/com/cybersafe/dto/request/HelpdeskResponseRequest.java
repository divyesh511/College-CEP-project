package com.cybersafe.dto.request;

import com.cybersafe.enums.HelpdeskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class HelpdeskResponseRequest {

    @NotBlank(message = "Response cannot be empty")
    private String adminResponse;

    @NotNull(message = "Status is required")
    private HelpdeskStatus status;

    public HelpdeskResponseRequest() {}

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }

    public HelpdeskStatus getStatus() {
        return status;
    }

    public void setStatus(HelpdeskStatus status) {
        this.status = status;
    }
}
