package com.cybersafe.dto.request;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class QuizSubmissionRequest {

    @NotEmpty(message = "Submission cannot be empty")
    private List<SelectedAnswerDto> answers;

    public static class SelectedAnswerDto {
        private Long questionId;
        private Long selectedOptionId;

        public SelectedAnswerDto() {}

        public SelectedAnswerDto(Long questionId, Long selectedOptionId) {
            this.questionId = questionId;
            this.selectedOptionId = selectedOptionId;
        }

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public Long getSelectedOptionId() {
            return selectedOptionId;
        }

        public void setSelectedOptionId(Long selectedOptionId) {
            this.selectedOptionId = selectedOptionId;
        }
    }

    public QuizSubmissionRequest() {}

    public List<SelectedAnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SelectedAnswerDto> answers) {
        this.answers = answers;
    }
}
