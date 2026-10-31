package com.cybersafe.controller;

import com.cybersafe.dto.request.ArticleRequest;
import com.cybersafe.dto.response.ApiResponse;
import com.cybersafe.dto.response.ArticleDetailDto;
import com.cybersafe.dto.response.ArticleSummaryDto;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // Public: List published articles with category and search filter
    @GetMapping("/articles")
    public ResponseEntity<ApiResponse<PageResponse<ArticleSummaryDto>>> getPublishedArticles(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        PageResponse<ArticleSummaryDto> result = articleService.getPublishedArticles(categoryId, search, page, size);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    // Public: Article details by slug
    @GetMapping("/articles/slug/{slug}")
    public ResponseEntity<ApiResponse<ArticleDetailDto>> getArticleBySlug(@PathVariable String slug) {
        ArticleDetailDto article = articleService.getArticleBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(article));
    }

    // Public: Article details by ID
    @GetMapping("/articles/{id}")
    public ResponseEntity<ApiResponse<ArticleDetailDto>> getArticleById(@PathVariable Long id) {
        ArticleDetailDto article = articleService.getArticleById(id);
        return ResponseEntity.ok(ApiResponse.success(article));
    }

    // Admin: List all articles (published and unpublished)
    @GetMapping("/admin/articles")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<ArticleSummaryDto>>> getAllArticlesForAdmin(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<ArticleSummaryDto> result = articleService.getAllArticlesForAdmin(search, page, size);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    // Admin: Create article
    @PostMapping("/admin/articles")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ArticleDetailDto>> createArticle(
            Authentication authentication,
            @Valid @RequestBody ArticleRequest request) {
        ArticleDetailDto created = articleService.createArticle(authentication.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Article created successfully", created));
    }

    // Admin: Update article
    @PutMapping("/admin/articles/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ArticleDetailDto>> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleRequest request) {
        ArticleDetailDto updated = articleService.updateArticle(id, request);
        return ResponseEntity.ok(ApiResponse.success("Article updated successfully", updated));
    }

    // Admin: Toggle publish status
    @PatchMapping("/admin/articles/{id}/publish")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> togglePublish(
            @PathVariable Long id,
            @RequestParam boolean status) {
        articleService.togglePublishStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Article publication status updated", null));
    }

    // Admin: Delete article
    @DeleteMapping("/admin/articles/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(ApiResponse.success("Article deleted successfully", null));
    }
}
