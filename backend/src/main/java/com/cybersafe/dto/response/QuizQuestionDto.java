package com.cybersafe.dto.response;

import java.util.List;

public class QuizQuestionDto {
    private Long id;
    private String questionText;
    private Integer points;
    private String explanation; // Populated for Admin or after submission
    private List<QuizOptionDto> options;

    public QuizQuestionDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public List<QuizOptionDto> getOptions() {
        return options;
    }

    public void setOptions(List<QuizOptionDto> options) {
        this.options = options;
    }
}
