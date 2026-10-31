package com.cybersafe.service;

import com.cybersafe.dto.request.HelpdeskQueryRequest;
import com.cybersafe.dto.request.HelpdeskResponseRequest;
import com.cybersafe.dto.response.HelpdeskQueryDto;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.enums.HelpdeskStatus;

import java.util.List;

public interface HelpdeskService {
    HelpdeskQueryDto submitQuery(String userEmail, HelpdeskQueryRequest request);
    List<HelpdeskQueryDto> getMyQueries(String userEmail);
    HelpdeskQueryDto getQueryById(Long id, String requesterEmail, boolean isAdmin);
    PageResponse<HelpdeskQueryDto> getAllQueriesForAdmin(HelpdeskStatus status, int page, int size);
    HelpdeskQueryDto respondToQuery(Long id, String adminEmail, HelpdeskResponseRequest request);
}
