package com.cybersafe.repository;

import com.cybersafe.entity.HelpdeskQuery;
import com.cybersafe.enums.HelpdeskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpdeskQueryRepository extends JpaRepository<HelpdeskQuery, Long> {
    List<HelpdeskQuery> findByUserIdOrderByCreatedAtDesc(Long userId);
    Page<HelpdeskQuery> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<HelpdeskQuery> findByStatusOrderByCreatedAtDesc(HelpdeskStatus status, Pageable pageable);
    
    long countByStatus(HelpdeskStatus status);
}
