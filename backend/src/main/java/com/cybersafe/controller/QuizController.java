package com.cybersafe.controller;

import com.cybersafe.dto.request.QuizRequest;
import com.cybersafe.dto.request.QuizSubmissionRequest;
import com.cybersafe.dto.response.*;
import com.cybersafe.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // Public / User: View available quizzes
    @GetMapping("/quizzes")
    public ResponseEntity<ApiResponse<List<QuizSummaryDto>>> getAllQuizzes(@RequestParam(required = false) Long categoryId) {
        List<QuizSummaryDto> quizzes = quizService.getAllQuizzes(categoryId);
        return ResponseEntity.ok(ApiResponse.success(quizzes));
    }

    // User: Fetch quiz questions for taking the quiz (answers stripped)
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<ApiResponse<QuizPlayDto>> getQuizForPlay(@PathVariable Long id) {
        QuizPlayDto quiz = quizService.getQuizForPlay(id);
        return ResponseEntity.ok(ApiResponse.success(quiz));
    }

    // User: Submit quiz attempt and get real server evaluation
    @PostMapping("/quizzes/{id}/submit")
    public ResponseEntity<ApiResponse<QuizResultDto>> submitQuiz(
            @PathVariable Long id,
            Authentication authentication,
            @Valid @RequestBody QuizSubmissionRequest request) {
        QuizResultDto result = quizService.submitQuiz(id, authentication.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Quiz submitted successfully", result));
    }

    // User: Fetch personal quiz attempts history
    @GetMapping("/quizzes/attempts/my")
    public ResponseEntity<ApiResponse<List<QuizAttemptDto>>> getMyQuizHistory(Authentication authentication) {
        List<QuizAttemptDto> history = quizService.getUserQuizHistory(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    // Admin: Get quiz with correct answers and explanations
    @GetMapping("/admin/quizzes/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<QuizPlayDto>> getQuizForAdmin(@PathVariable Long id) {
        QuizPlayDto quiz = quizService.getQuizForAdmin(id);
        return ResponseEntity.ok(ApiResponse.success(quiz));
    }

    // Admin: Create quiz
    @PostMapping("/admin/quizzes")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<QuizSummaryDto>> createQuiz(@Valid @RequestBody QuizRequest request) {
        QuizSummaryDto created = quizService.createQuiz(request);
        return ResponseEntity.ok(ApiResponse.success("Quiz created successfully", created));
    }

    // Admin: Update quiz
    @PutMapping("/admin/quizzes/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<QuizSummaryDto>> updateQuiz(
            @PathVariable Long id,
            @Valid @RequestBody QuizRequest request) {
        QuizSummaryDto updated = quizService.updateQuiz(id, request);
        return ResponseEntity.ok(ApiResponse.success("Quiz updated successfully", updated));
    }

    // Admin: Delete quiz
    @DeleteMapping("/admin/quizzes/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok(ApiResponse.success("Quiz deleted successfully", null));
    }
}
