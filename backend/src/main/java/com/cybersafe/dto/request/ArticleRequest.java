package com.cybersafe.dto.request;

import com.cybersafe.enums.ThreatLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ArticleRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @NotBlank(message = "Summary is required")
    private String summary;

    @NotBlank(message = "Content is required")
    private String content;

    @NotNull(message = "Threat level is required")
    private ThreatLevel threatLevel = ThreatLevel.MEDIUM;

    private Boolean published = true;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    public ArticleRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ThreatLevel getThreatLevel() {
        return threatLevel;
    }

    public void setThreatLevel(ThreatLevel threatLevel) {
        this.threatLevel = threatLevel;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
