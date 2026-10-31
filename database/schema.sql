-- =============================================================================
-- CyberSafe Community – Database Schema Definition
-- Target Database: MySQL 8.0+
-- Project: B.Sc. IT Semester 5 Community Engagement Project (CEP)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `cybersafe_community` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `cybersafe_community`;

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS `roles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `description` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. User-Roles Join Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Content Categories
CREATE TABLE IF NOT EXISTS `categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `description` VARCHAR(500) NULL,
    `icon_class` VARCHAR(50) NULL DEFAULT 'bi-shield-check',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Educational Articles
CREATE TABLE IF NOT EXISTS `articles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(280) NOT NULL UNIQUE,
    `summary` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `threat_level` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    `published` BOOLEAN NOT NULL DEFAULT TRUE,
    `category_id` BIGINT NOT NULL,
    `author_id` BIGINT NOT NULL,
    `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_articles_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_articles_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
    INDEX `idx_articles_published` (`published`),
    INDEX `idx_articles_category` (`category_id`),
    INDEX `idx_articles_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Quizzes
CREATE TABLE IF NOT EXISTS `quizzes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `passing_score` INT NOT NULL DEFAULT 60,
    `time_limit_minutes` INT NOT NULL DEFAULT 10,
    `category_id` BIGINT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_quizzes_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
    INDEX `idx_quizzes_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Quiz Questions
CREATE TABLE IF NOT EXISTS `quiz_questions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `quiz_id` BIGINT NOT NULL,
    `question_text` TEXT NOT NULL,
    `explanation` TEXT NOT NULL,
    `points` INT NOT NULL DEFAULT 1,
    CONSTRAINT `fk_questions_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
    INDEX `idx_questions_quiz` (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Quiz Question Options
CREATE TABLE IF NOT EXISTS `quiz_options` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `question_id` BIGINT NOT NULL,
    `option_text` TEXT NOT NULL,
    `is_correct` BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT `fk_options_question` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE,
    INDEX `idx_options_question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quiz Attempts
CREATE TABLE IF NOT EXISTS `quiz_attempts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `quiz_id` BIGINT NOT NULL,
    `total_questions` INT NOT NULL,
    `correct_answers` INT NOT NULL,
    `score_percentage` INT NOT NULL,
    `passed` BOOLEAN NOT NULL,
    `attempted_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_attempts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_attempts_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
    INDEX `idx_attempts_user` (`user_id`),
    INDEX `idx_attempts_quiz` (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Quiz Answers (Detailed Audit Trail of Choices)
CREATE TABLE IF NOT EXISTS `quiz_answers` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `attempt_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `selected_option_id` BIGINT NULL,
    `is_correct` BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT `fk_answers_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `quiz_attempts` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_answers_question` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_answers_option` FOREIGN KEY (`selected_option_id`) REFERENCES `quiz_options` (`id`) ON DELETE SET NULL,
    INDEX `idx_answers_attempt` (`attempt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Helpdesk Queries
CREATE TABLE IF NOT EXISTS `helpdesk_queries` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED') NOT NULL DEFAULT 'PENDING',
    `admin_response` TEXT NULL,
    `responder_id` BIGINT NULL,
    `resolved_at` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_helpdesk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_helpdesk_responder` FOREIGN KEY (`responder_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    INDEX `idx_helpdesk_user` (`user_id`),
    INDEX `idx_helpdesk_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
