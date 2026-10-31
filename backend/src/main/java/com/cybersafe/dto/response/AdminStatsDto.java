package com.cybersafe.dto.response;

import java.util.List;

public class AdminStatsDto {
    private long totalUsers;
    private long totalArticles;
    private long totalQuizzes;
    private long totalQuizAttempts;
    private double averageQuizScore;
    private long pendingQueries;
    private long inProgressQueries;
    private long resolvedQueries;
    private List<QuizAttemptDto> recentAttempts;
    private List<HelpdeskQueryDto> recentQueries;

    public AdminStatsDto() {}

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalArticles() {
        return totalArticles;
    }

    public void setTotalArticles(long totalArticles) {
        this.totalArticles = totalArticles;
    }

    public long getTotalQuizzes() {
        return totalQuizzes;
    }

    public void setTotalQuizzes(long totalQuizzes) {
        this.totalQuizzes = totalQuizzes;
    }

    public long getTotalQuizAttempts() {
        return totalQuizAttempts;
    }

    public void setTotalQuizAttempts(long totalQuizAttempts) {
        this.totalQuizAttempts = totalQuizAttempts;
    }

    public double getAverageQuizScore() {
        return averageQuizScore;
    }

    public void setAverageQuizScore(double averageQuizScore) {
        this.averageQuizScore = averageQuizScore;
    }

    public long getPendingQueries() {
        return pendingQueries;
    }

    public void setPendingQueries(long pendingQueries) {
        this.pendingQueries = pendingQueries;
    }

    public long getInProgressQueries() {
        return inProgressQueries;
    }

    public void setInProgressQueries(long inProgressQueries) {
        this.inProgressQueries = inProgressQueries;
    }

    public long getResolvedQueries() {
        return resolvedQueries;
    }

    public void setResolvedQueries(long resolvedQueries) {
        this.resolvedQueries = resolvedQueries;
    }

    public List<QuizAttemptDto> getRecentAttempts() {
        return recentAttempts;
    }

    public void setRecentAttempts(List<QuizAttemptDto> recentAttempts) {
        this.recentAttempts = recentAttempts;
    }

    public List<HelpdeskQueryDto> getRecentQueries() {
        return recentQueries;
    }

    public void setRecentQueries(List<HelpdeskQueryDto> recentQueries) {
        this.recentQueries = recentQueries;
    }
}
