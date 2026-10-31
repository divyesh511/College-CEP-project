package com.cybersafe.repository;

import com.cybersafe.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);
    List<QuizAttempt> findTop10ByOrderByAttemptedAtDesc();

    @Query("SELECT AVG(qa.scorePercentage) FROM QuizAttempt qa")
    Double calculateAverageScore();

    long countByUserId(Long userId);
}
