package com.cybersafe.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class QuizRequest {

    @NotBlank(message = "Quiz title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Passing score is required")
    private Integer passingScore = 60;

    @NotNull(message = "Time limit is required")
    private Integer timeLimitMinutes = 10;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private Boolean active = true;

    @NotEmpty(message = "At least one question is required")
    @Valid
    private List<QuestionRequest> questions;

    public static class QuestionRequest {
        private Long id;

        @NotBlank(message = "Question text is required")
        private String questionText;

        @NotBlank(message = "Explanation is required")
        private String explanation;

        private Integer points = 1;

        @NotEmpty(message = "At least two options are required")
        @Valid
        private List<OptionRequest> options;

        public QuestionRequest() {}

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

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }

        public Integer getPoints() {
            return points;
        }

        public void setPoints(Integer points) {
            this.points = points;
        }

        public List<OptionRequest> getOptions() {
            return options;
        }

        public void setOptions(List<OptionRequest> options) {
            this.options = options;
        }
    }

    public static class OptionRequest {
        private Long id;

        @NotBlank(message = "Option text is required")
        private String optionText;

        private Boolean isCorrect = false;

        public OptionRequest() {}

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

    public QuizRequest() {}

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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<QuestionRequest> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionRequest> questions) {
        this.questions = questions;
    }
}
