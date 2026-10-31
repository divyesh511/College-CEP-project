package com.cybersafe.repository;

import com.cybersafe.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);
    Boolean existsBySlug(String slug);

    // Published articles for public/users with optional category & keyword search
    @Query("SELECT a FROM Article a WHERE a.published = true " +
           "AND (:categoryId IS NULL OR a.category.id = :categoryId) " +
           "AND (:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(a.summary) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Article> findPublishedArticles(
        @Param("categoryId") Long categoryId,
        @Param("search") String search,
        Pageable pageable
    );

    // Admin listing with optional search
    @Query("SELECT a FROM Article a WHERE " +
           "(:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(a.summary) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Article> findAllArticlesWithSearch(@Param("search") String search, Pageable pageable);

    long countByPublishedTrue();
}
