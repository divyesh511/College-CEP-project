package com.cybersafe.dto.response;

public class CategoryDto {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String iconClass;

    public CategoryDto() {}

    public CategoryDto(Long id, String name, String slug, String description, String iconClass) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.iconClass = iconClass;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconClass() {
        return iconClass;
    }

    public void setIconClass(String iconClass) {
        this.iconClass = iconClass;
    }
}
