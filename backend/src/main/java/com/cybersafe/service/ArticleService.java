package com.cybersafe.service;

import com.cybersafe.dto.request.ArticleRequest;
import com.cybersafe.dto.response.ArticleDetailDto;
import com.cybersafe.dto.response.ArticleSummaryDto;
import com.cybersafe.dto.response.PageResponse;

public interface ArticleService {
    PageResponse<ArticleSummaryDto> getPublishedArticles(Long categoryId, String search, int page, int size);
    ArticleDetailDto getArticleBySlug(String slug);
    ArticleDetailDto getArticleById(Long id);
    PageResponse<ArticleSummaryDto> getAllArticlesForAdmin(String search, int page, int size);
    ArticleDetailDto createArticle(String authorEmail, ArticleRequest request);
    ArticleDetailDto updateArticle(Long id, ArticleRequest request);
    void togglePublishStatus(Long id, boolean published);
    void deleteArticle(Long id);
}
