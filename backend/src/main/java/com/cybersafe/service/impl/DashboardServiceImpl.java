package com.cybersafe.service.impl;

import com.cybersafe.dto.response.AdminStatsDto;
import com.cybersafe.dto.response.HelpdeskQueryDto;
import com.cybersafe.dto.response.QuizAttemptDto;
import com.cybersafe.entity.HelpdeskQuery;
import com.cybersafe.entity.QuizAttempt;
import com.cybersafe.enums.HelpdeskStatus;
import com.cybersafe.repository.ArticleRepository;
import com.cybersafe.repository.HelpdeskQueryRepository;
import com.cybersafe.repository.QuizAttemptRepository;
import com.cybersafe.repository.QuizRepository;
import com.cybersafe.repository.UserRepository;
import com.cybersafe.service.DashboardService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;
    private final HelpdeskQueryRepository helpdeskRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                ArticleRepository articleRepository,
                                QuizRepository quizRepository,
                                QuizAttemptRepository attemptRepository,
                                HelpdeskQueryRepository helpdeskRepository) {
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
        this.quizRepository = quizRepository;
        this.attemptRepository = attemptRepository;
        this.helpdeskRepository = helpdeskRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AdminStatsDto getAdminStatistics() {
        AdminStatsDto stats = new AdminStatsDto();

        stats.setTotalUsers(userRepository.countByActiveTrue());
        stats.setTotalArticles(articleRepository.countByPublishedTrue());
        stats.setTotalQuizzes(quizRepository.countByActiveTrue());
        stats.setTotalQuizAttempts(attemptRepository.count());

        Double avgScore = attemptRepository.calculateAverageScore();
        stats.setAverageQuizScore(avgScore != null ? Math.round(avgScore * 10.0) / 10.0 : 0.0);

        stats.setPendingQueries(helpdeskRepository.countByStatus(HelpdeskStatus.PENDING));
        stats.setInProgressQueries(helpdeskRepository.countByStatus(HelpdeskStatus.IN_PROGRESS));
        stats.setResolvedQueries(helpdeskRepository.countByStatus(HelpdeskStatus.RESOLVED));

        // Top 5 recent attempts
        List<QuizAttemptDto> recentAttempts = attemptRepository.findTop10ByOrderByAttemptedAtDesc().stream()
                .map(this::mapAttemptToDto)
                .collect(Collectors.toList());
        stats.setRecentAttempts(recentAttempts);

        // Top 5 recent queries
        List<HelpdeskQueryDto> recentQueries = helpdeskRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 5))
                .getContent().stream()
                .map(this::mapQueryToDto)
                .collect(Collectors.toList());
        stats.setRecentQueries(recentQueries);

        return stats;
    }

    private QuizAttemptDto mapAttemptToDto(QuizAttempt attempt) {
        QuizAttemptDto dto = new QuizAttemptDto();
        dto.setId(attempt.getId());
        dto.setQuizId(attempt.getQuiz().getId());
        dto.setQuizTitle(attempt.getQuiz().getTitle());
        dto.setCategoryName(attempt.getQuiz().getCategory().getName());
        dto.setTotalQuestions(attempt.getTotalQuestions());
        dto.setCorrectAnswers(attempt.getCorrectAnswers());
        dto.setScorePercentage(attempt.getScorePercentage());
        dto.setPassed(attempt.getPassed());
        dto.setAttemptedAt(attempt.getAttemptedAt());
        return dto;
    }

    private HelpdeskQueryDto mapQueryToDto(HelpdeskQuery query) {
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
        dto.setCreatedAt(query.getCreatedAt());
        return dto;
    }
}
