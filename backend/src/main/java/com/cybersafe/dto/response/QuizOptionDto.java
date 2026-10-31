package com.cybersafe.dto.response;

public class QuizOptionDto {
    private Long id;
    private String optionText;
    private Boolean isCorrect; // Only populated for Admin, NULL during play

    public QuizOptionDto() {}

    public QuizOptionDto(Long id, String optionText) {
        this.id = id;
        this.optionText = optionText;
    }

    public QuizOptionDto(Long id, String optionText, Boolean isCorrect) {
        this.id = id;
        this.optionText = optionText;
        this.isCorrect = isCorrect;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
}
