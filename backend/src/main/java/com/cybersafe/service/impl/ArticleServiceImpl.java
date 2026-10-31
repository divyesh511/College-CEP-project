package com.cybersafe.service.impl;

import com.cybersafe.dto.request.ArticleRequest;
import com.cybersafe.dto.response.ArticleDetailDto;
import com.cybersafe.dto.response.ArticleSummaryDto;
import com.cybersafe.dto.response.PageResponse;
import com.cybersafe.entity.Article;
import com.cybersafe.entity.Category;
import com.cybersafe.entity.User;
import com.cybersafe.exception.BadRequestException;
import com.cybersafe.exception.ResourceNotFoundException;
import com.cybersafe.repository.ArticleRepository;
import com.cybersafe.repository.CategoryRepository;
import com.cybersafe.repository.UserRepository;
import com.cybersafe.service.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public ArticleServiceImpl(ArticleRepository articleRepository,
                              CategoryRepository categoryRepository,
                              UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleSummaryDto> getPublishedArticles(Long categoryId, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
        String querySearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;

        Page<Article> articles = articleRepository.findPublishedArticles(categoryId, querySearch, pageable);
        List<ArticleSummaryDto> content = articles.getContent().stream()
                .map(this::mapToSummaryDto)
                .collect(Collectors.toList());

        return new PageResponse<>(content, articles.getNumber(), articles.getSize(),
                articles.getTotalElements(), articles.getTotalPages(), articles.isLast());
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleDetailDto getArticleBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with slug: " + slug));
        return mapToDetailDto(article);
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleDetailDto getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));
        return mapToDetailDto(article);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleSummaryDto> getAllArticlesForAdmin(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        String querySearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;

        Page<Article> articles = articleRepository.findAllArticlesWithSearch(querySearch, pageable);
        List<ArticleSummaryDto> content = articles.getContent().stream()
                .map(this::mapToSummaryDto)
                .collect(Collectors.toList());

        return new PageResponse<>(content, articles.getNumber(), articles.getSize(),
                articles.getTotalElements(), articles.getTotalPages(), articles.isLast());
    }

    @Override
    @Transactional
    public ArticleDetailDto createArticle(String authorEmail, ArticleRequest request) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + authorEmail));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        String slug = toSlug(request.getTitle());
        if (articleRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Article article = new Article();
        article.setTitle(request.getTitle().trim());
        article.setSlug(slug);
        article.setSummary(request.getSummary().trim());
        article.setContent(request.getContent().trim());
        article.setThreatLevel(request.getThreatLevel());
        article.setPublished(request.getPublished() != null ? request.getPublished() : true);
        article.setCategory(category);
        article.setAuthor(author);
        if (Boolean.TRUE.equals(article.getPublished())) {
            article.setPublishedAt(LocalDateTime.now());
        }

        Article saved = articleRepository.save(article);
        return mapToDetailDto(saved);
    }

    @Override
    @Transactional
    public ArticleDetailDto updateArticle(Long id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        article.setTitle(request.getTitle().trim());
        article.setSummary(request.getSummary().trim());
        article.setContent(request.getContent().trim());
        article.setThreatLevel(request.getThreatLevel());
        article.setCategory(category);

        if (request.getPublished() != null) {
            if (Boolean.TRUE.equals(request.getPublished()) && Boolean.FALSE.equals(article.getPublished())) {
                article.setPublishedAt(LocalDateTime.now());
            }
            article.setPublished(request.getPublished());
        }

        Article updated = articleRepository.save(article);
        return mapToDetailDto(updated);
    }

    @Override
    @Transactional
    public void togglePublishStatus(Long id, boolean published) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));

        article.setPublished(published);
        if (published && article.getPublishedAt() == null) {
            article.setPublishedAt(LocalDateTime.now());
        }
        articleRepository.save(article);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));
        articleRepository.delete(article);
    }

    private ArticleSummaryDto mapToSummaryDto(Article article) {
        ArticleSummaryDto dto = new ArticleSummaryDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setSummary(article.getSummary());
        dto.setThreatLevel(article.getThreatLevel());
        dto.setPublished(article.getPublished());
        dto.setCategoryId(article.getCategory().getId());
        dto.setCategoryName(article.getCategory().getName());
        dto.setAuthorName(article.getAuthor().getFullName());
        dto.setPublishedAt(article.getPublishedAt());
        dto.setCreatedAt(article.getCreatedAt());
        return dto;
    }

    private ArticleDetailDto mapToDetailDto(Article article) {
        ArticleDetailDto dto = new ArticleDetailDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setSummary(article.getSummary());
        dto.setContent(article.getContent());
        dto.setThreatLevel(article.getThreatLevel());
        dto.setPublished(article.getPublished());
        dto.setCategoryId(article.getCategory().getId());
        dto.setCategoryName(article.getCategory().getName());
        dto.setAuthorId(article.getAuthor().getId());
        dto.setAuthorName(article.getAuthor().getFullName());
        dto.setPublishedAt(article.getPublishedAt());
        dto.setCreatedAt(article.getCreatedAt());
        dto.setUpdatedAt(article.getUpdatedAt());
        return dto;
    }

    private String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
