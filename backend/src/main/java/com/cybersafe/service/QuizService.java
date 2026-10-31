package com.cybersafe.service;

import com.cybersafe.dto.request.QuizRequest;
import com.cybersafe.dto.request.QuizSubmissionRequest;
import com.cybersafe.dto.response.*;

import java.util.List;

public interface QuizService {
    List<QuizSummaryDto> getAllQuizzes(Long categoryId);
    QuizPlayDto getQuizForPlay(Long quizId);
    QuizResultDto submitQuiz(Long quizId, String userEmail, QuizSubmissionRequest request);
    List<QuizAttemptDto> getUserQuizHistory(String userEmail);
    QuizPlayDto getQuizForAdmin(Long quizId);
    QuizSummaryDto createQuiz(QuizRequest request);
    QuizSummaryDto updateQuiz(Long id, QuizRequest request);
    void deleteQuiz(Long id);
}
