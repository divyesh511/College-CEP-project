package com.cybersafe.service.impl;

import com.cybersafe.dto.request.QuizRequest;
import com.cybersafe.dto.request.QuizSubmissionRequest;
import com.cybersafe.dto.response.*;
import com.cybersafe.entity.*;
import com.cybersafe.exception.BadRequestException;
import com.cybersafe.exception.ResourceNotFoundException;
import com.cybersafe.repository.*;
import com.cybersafe.service.QuizService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final QuizAttemptRepository attemptRepository;
    private final QuizAnswerRepository answerRepository;

    public QuizServiceImpl(QuizRepository quizRepository,
                           CategoryRepository categoryRepository,
                           UserRepository userRepository,
                           QuizAttemptRepository attemptRepository,
                           QuizAnswerRepository answerRepository) {
        this.quizRepository = quizRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.attemptRepository = attemptRepository;
        this.answerRepository = answerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizSummaryDto> getAllQuizzes(Long categoryId) {
        List<Quiz> quizzes;
        if (categoryId != null) {
            quizzes = quizRepository.findByCategoryIdAndActiveTrue(categoryId);
        } else {
            quizzes = quizRepository.findByActiveTrue();
        }

        return quizzes.stream().map(this::mapToSummaryDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public QuizPlayDto getQuizForPlay(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", quizId));

        QuizPlayDto dto = new QuizPlayDto();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setPassingScore(quiz.getPassingScore());
        dto.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        dto.setCategoryName(quiz.getCategory().getName());

        // Map questions and options, STRIPPING correct answers & explanations to prevent cheating
        List<QuizQuestionDto> questions = quiz.getQuestions().stream().map(q -> {
            QuizQuestionDto qDto = new QuizQuestionDto();
            qDto.setId(q.getId());
            qDto.setQuestionText(q.getQuestionText());
            qDto.setPoints(q.getPoints());
            qDto.setExplanation(null); // Hidden during test

            List<QuizOptionDto> options = q.getOptions().stream().map(o -> {
                QuizOptionDto oDto = new QuizOptionDto();
                oDto.setId(o.getId());
                oDto.setOptionText(o.getOptionText());
                oDto.setIsCorrect(null); // Hidden during test
                return oDto;
            }).collect(Collectors.toList());

            qDto.setOptions(options);
            return qDto;
        }).collect(Collectors.toList());

        dto.setQuestions(questions);
        return dto;
    }

    @Override
    @Transactional
    public QuizResultDto submitQuiz(Long quizId, String userEmail, QuizSubmissionRequest request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", quizId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        Map<Long, Long> submittedMap = new HashMap<>();
        if (request.getAnswers() != null) {
            for (QuizSubmissionRequest.SelectedAnswerDto item : request.getAnswers()) {
                if (item.getQuestionId() != null) {
                    submittedMap.put(item.getQuestionId(), item.getSelectedOptionId());
                }
            }
        }

        int totalQuestions = quiz.getQuestions().size();
        if (totalQuestions == 0) {
            throw new BadRequestException("This quiz has no questions");
        }

        int correctCount = 0;
        List<QuizAnswerDetailDto> details = new ArrayList<>();
        List<QuizAnswer> answersToPersist = new ArrayList<>();

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setTotalQuestions(totalQuestions);

        for (QuizQuestion question : quiz.getQuestions()) {
            Long selectedOptionId = submittedMap.get(question.getId());
            QuizOption selectedOption = null;
            QuizOption correctOption = null;

            for (QuizOption opt : question.getOptions()) {
                if (Boolean.TRUE.equals(opt.getIsCorrect())) {
                    correctOption = opt;
                }
                if (selectedOptionId != null && opt.getId().equals(selectedOptionId)) {
                    selectedOption = opt;
                }
            }

            boolean isQuestionCorrect = selectedOption != null && Boolean.TRUE.equals(selectedOption.getIsCorrect());
            if (isQuestionCorrect) {
                correctCount++;
            }

            QuizAnswerDetailDto detailDto = new QuizAnswerDetailDto();
            detailDto.setQuestionId(question.getId());
            detailDto.setQuestionText(question.getQuestionText());
            detailDto.setSelectedOptionId(selectedOptionId);
            detailDto.setSelectedOptionText(selectedOption != null ? selectedOption.getOptionText() : "Not Answered");
            detailDto.setCorrectOptionId(correctOption != null ? correctOption.getId() : null);
            detailDto.setCorrectOptionText(correctOption != null ? correctOption.getOptionText() : "");
            detailDto.setIsCorrect(isQuestionCorrect);
            detailDto.setExplanation(question.getExplanation());
            details.add(detailDto);

            QuizAnswer ans = new QuizAnswer(attempt, question, selectedOption, isQuestionCorrect);
            answersToPersist.add(ans);
        }

        int scorePercentage = (int) Math.round(((double) correctCount / totalQuestions) * 100);
        boolean passed = scorePercentage >= quiz.getPassingScore();

        attempt.setCorrectAnswers(correctCount);
        attempt.setScorePercentage(scorePercentage);
        attempt.setPassed(passed);
        attempt.setAnswers(answersToPersist);

        QuizAttempt savedAttempt = attemptRepository.save(attempt);

        QuizResultDto resultDto = new QuizResultDto();
        resultDto.setAttemptId(savedAttempt.getId());
        resultDto.setQuizId(quiz.getId());
        resultDto.setQuizTitle(quiz.getTitle());
        resultDto.setTotalQuestions(totalQuestions);
        resultDto.setCorrectAnswers(correctCount);
        resultDto.setScorePercentage(scorePercentage);
        resultDto.setPassed(passed);
        resultDto.setPassingScore(quiz.getPassingScore());
        resultDto.setAnswerDetails(details);

        return resultDto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizAttemptDto> getUserQuizHistory(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        return attemptRepository.findByUserIdOrderByAttemptedAtDesc(user.getId()).stream()
                .map(this::mapAttemptToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public QuizPlayDto getQuizForAdmin(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", quizId));

        QuizPlayDto dto = new QuizPlayDto();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setPassingScore(quiz.getPassingScore());
        dto.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        dto.setCategoryName(quiz.getCategory().getName());

        List<QuizQuestionDto> questions = quiz.getQuestions().stream().map(q -> {
            QuizQuestionDto qDto = new QuizQuestionDto();
            qDto.setId(q.getId());
            qDto.setQuestionText(q.getQuestionText());
            qDto.setPoints(q.getPoints());
            qDto.setExplanation(q.getExplanation());

            List<QuizOptionDto> options = q.getOptions().stream().map(o -> {
                QuizOptionDto oDto = new QuizOptionDto();
                oDto.setId(o.getId());
                oDto.setOptionText(o.getOptionText());
                oDto.setIsCorrect(o.getIsCorrect());
                return oDto;
            }).collect(Collectors.toList());

            qDto.setOptions(options);
            return qDto;
        }).collect(Collectors.toList());

        dto.setQuestions(questions);
        return dto;
    }

    @Override
    @Transactional
    public QuizSummaryDto createQuiz(QuizRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle().trim());
        quiz.setDescription(request.getDescription().trim());
        quiz.setPassingScore(request.getPassingScore());
        quiz.setTimeLimitMinutes(request.getTimeLimitMinutes());
        quiz.setCategory(category);
        quiz.setActive(request.getActive() != null ? request.getActive() : true);

        if (request.getQuestions() != null) {
            for (QuizRequest.QuestionRequest qReq : request.getQuestions()) {
                QuizQuestion question = new QuizQuestion();
                question.setQuiz(quiz);
                question.setQuestionText(qReq.getQuestionText().trim());
                question.setExplanation(qReq.getExplanation().trim());
                question.setPoints(qReq.getPoints() != null ? qReq.getPoints() : 1);

                if (qReq.getOptions() != null) {
                    for (QuizRequest.OptionRequest oReq : qReq.getOptions()) {
                        QuizOption opt = new QuizOption();
                        opt.setQuestion(question);
                        opt.setOptionText(oReq.getOptionText().trim());
                        opt.setIsCorrect(Boolean.TRUE.equals(oReq.getIsCorrect()));
                        question.getOptions().add(opt);
                    }
                }
                quiz.getQuestions().add(question);
            }
        }

        Quiz saved = quizRepository.save(quiz);
        return mapToSummaryDto(saved);
    }

    @Override
    @Transactional
    public QuizSummaryDto updateQuiz(Long id, QuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        quiz.setTitle(request.getTitle().trim());
        quiz.setDescription(request.getDescription().trim());
        quiz.setPassingScore(request.getPassingScore());
        quiz.setTimeLimitMinutes(request.getTimeLimitMinutes());
        quiz.setCategory(category);
        if (request.getActive() != null) {
            quiz.setActive(request.getActive());
        }

        // Replace questions
        quiz.getQuestions().clear();
        if (request.getQuestions() != null) {
            for (QuizRequest.QuestionRequest qReq : request.getQuestions()) {
                QuizQuestion question = new QuizQuestion();
                question.setQuiz(quiz);
                question.setQuestionText(qReq.getQuestionText().trim());
                question.setExplanation(qReq.getExplanation().trim());
                question.setPoints(qReq.getPoints() != null ? qReq.getPoints() : 1);

                if (qReq.getOptions() != null) {
                    for (QuizRequest.OptionRequest oReq : qReq.getOptions()) {
                        QuizOption opt = new QuizOption();
                        opt.setQuestion(question);
                        opt.setOptionText(oReq.getOptionText().trim());
                        opt.setIsCorrect(Boolean.TRUE.equals(oReq.getIsCorrect()));
                        question.getOptions().add(opt);
                    }
                }
                quiz.getQuestions().add(question);
            }
        }

        Quiz updated = quizRepository.save(quiz);
        return mapToSummaryDto(updated);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", id));
        quizRepository.delete(quiz);
    }

    private QuizSummaryDto mapToSummaryDto(Quiz quiz) {
        QuizSummaryDto dto = new QuizSummaryDto();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setPassingScore(quiz.getPassingScore());
        dto.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        dto.setCategoryId(quiz.getCategory().getId());
        dto.setCategoryName(quiz.getCategory().getName());
        dto.setQuestionCount(quiz.getQuestions() != null ? quiz.getQuestions().size() : 0);
        dto.setActive(quiz.getActive());
        return dto;
    }

    private QuizAttemptDto mapAttemptToDto(QuizAttempt attempt) {
        QuizAttemptDto dto = new QuizAttemptDto();
        dto.setId(attempt.getId());
        dto.setQuizId(attempt.getQuiz().getId());
        dto.setQuizTitle(attempt.getQuiz().getTitle());
        dto.setCategoryName(attempt.getQuiz().getCategory().getName());
        dto.setTotalQuestions(attempt.getTotalQuestions());
        dto.setCorrectAnswers(attempt.getCorrectAnswers());
        dto.setScorePercentage(attempt.getScorePercentage());
        dto.setPassed(attempt.getPassed());
        dto.setAttemptedAt(attempt.getAttemptedAt());
        return dto;
    }
}
