package com.cybersafe.dto.response;

import java.util.List;

public class QuizPlayDto {
    private Long id;
    private String title;
    private String description;
    private Integer passingScore;
    private Integer timeLimitMinutes;
    private String categoryName;
    private List<QuizQuestionDto> questions;

    public QuizPlayDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPassingScore() {
        return passingScore;
    }

    public void setPassingScore(Integer passingScore) {
        this.passingScore = passingScore;
    }

    public Integer getTimeLimitMinutes() {
        return timeLimitMinutes;
    }

    public void setTimeLimitMinutes(Integer timeLimitMinutes) {
        this.timeLimitMinutes = timeLimitMinutes;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<QuizQuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuizQuestionDto> questions) {
        this.questions = questions;
    }
}
