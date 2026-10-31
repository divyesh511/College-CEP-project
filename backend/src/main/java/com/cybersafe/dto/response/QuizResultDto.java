package com.cybersafe.dto.response;

import java.util.List;

public class QuizResultDto {
    private Long attemptId;
    private Long quizId;
    private String quizTitle;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer scorePercentage;
    private Boolean passed;
    private Integer passingScore;
    private List<QuizAnswerDetailDto> answerDetails;

    public QuizResultDto() {}

    public Long getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Long attemptId) {
        this.attemptId = attemptId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getScorePercentage() {
        return scorePercentage;
    }

    public void setScorePercentage(Integer scorePercentage) {
        this.scorePercentage = scorePercentage;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public Integer getPassingScore() {
        return passingScore;
    }

    public void setPassingScore(Integer passingScore) {
        this.passingScore = passingScore;
    }

    public List<QuizAnswerDetailDto> getAnswerDetails() {
        return answerDetails;
    }

    public void setAnswerDetails(List<QuizAnswerDetailDto> answerDetails) {
        this.answerDetails = answerDetails;
    }
}
