package com.cybersafe.service;

import com.cybersafe.dto.request.CategoryRequest;
import com.cybersafe.dto.response.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    CategoryDto createCategory(CategoryRequest request);
    CategoryDto updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}
