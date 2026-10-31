package com.cybersafe.service.impl;

import com.cybersafe.dto.request.CategoryRequest;
import com.cybersafe.dto.response.CategoryDto;
import com.cybersafe.entity.Category;
import com.cybersafe.exception.BadRequestException;
import com.cybersafe.exception.ResourceNotFoundException;
import com.cybersafe.repository.CategoryRepository;
import com.cybersafe.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return mapToDto(category);
    }

    @Override
    @Transactional
    public CategoryDto createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName().trim())) {
            throw new BadRequestException("Category with this name already exists");
        }

        String slug = toSlug(request.getName().trim());
        if (categoryRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Category category = new Category(
                request.getName().trim(),
                slug,
                request.getDescription(),
                request.getIconClass() != null ? request.getIconClass() : "bi-shield-check"
        );

        Category saved = categoryRepository.save(category);
        return mapToDto(saved);
    }

    @Override
    @Transactional
    public CategoryDto updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        category.setName(request.getName().trim());
        category.setDescription(request.getDescription());
        if (request.getIconClass() != null) {
            category.setIconClass(request.getIconClass());
        }

        Category updated = categoryRepository.save(category);
        return mapToDto(updated);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        categoryRepository.delete(category);
    }

    private CategoryDto mapToDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.getIconClass()
        );
    }

    private String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
