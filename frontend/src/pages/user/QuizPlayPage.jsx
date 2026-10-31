import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Award,
  HelpCircle,
  RefreshCw,
  History
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QuizPlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionId }
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await quizService.getQuizForPlay(id);
        if (res?.success && res.data) {
          setQuiz(res.data);
          setTimeLeft((res.data.timeLimitMinutes || 10) * 60);
        } else {
          setError('Quiz not found or currently inactive');
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Unable to load the requested quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (loading || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, submitted, timeLeft]);

  const handleOptionSelect = (questionId, optionId) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const answersPayload = Object.entries(selectedAnswers).map(([qId, optId]) => ({
        questionId: Number(qId),
        selectedOptionId: optId ? Number(optId) : null,
      }));

      const res = await quizService.submitQuiz(id, answersPayload);
      if (res?.success && res.data) {
        setResult(res.data);
        setSubmitted(true);
      } else {
        setError(res.message || 'Failed to submit quiz results');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Error evaluating quiz submission');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return <LoadingSpinner message="Preparing simulated cyber scenario..." />;
  }

  if (error && !quiz) {
    return (
      <div className="container py-5 text-center">
        <div className="cyber-card p-5 max-w-600 mx-auto">
          <AlertTriangle size={48} className="text-warning mb-3" />
          <h4 className="fw-bold text-dark">Quiz Unavailable</h4>
          <p className="text-secondary small mb-4">{error}</p>
          <Link to="/quizzes" className="btn btn-cyber-primary rounded-pill px-4">
            Back to Quiz Catalog
          </Link>
        </div>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  // POST SUBMISSION RESULT VIEW
  if (submitted && result) {
    return (
      <div className="py-5 bg-page min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {/* Score Header Card */}
              <div className={`cyber-card p-4 p-md-5 mb-4 text-center shadow-lg border-2 ${
                result.passed ? 'border-success' : 'border-warning'
              }`}>
                <div className={`p-3 rounded-circle d-inline-flex mb-3 ${
                  result.passed ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                }`}>
                  {result.passed ? <Award size={48} /> : <AlertTriangle size={48} />}
                </div>

                <h2 className="fw-extrabold text-dark mb-1">
                  {result.passed ? 'Congratulations! You Passed!' : 'Review Needed: Good Effort!'}
                </h2>
                <p className="text-secondary small max-w-600 mx-auto mb-4">
                  {result.passed
                    ? 'You demonstrated strong instinctive defenses against common digital scam tactics.'
                    : `You scored ${result.scorePercentage}%, which is below the passing mark of ${result.passingScore}%. Read the explanations below to sharpen your instincts.`}
                </p>

                <div className="row g-3 max-w-600 mx-auto py-3 bg-light rounded-3 border mb-4">
                  <div className="col-4 border-end">
                    <div className="small text-muted">Your Score</div>
                    <div className="fs-3 fw-bold text-dark">{result.scorePercentage}%</div>
                  </div>
                  <div className="col-4 border-end">
                    <div className="small text-muted">Correct</div>
                    <div className="fs-3 fw-bold text-success">{result.correctAnswers}/{result.totalQuestions}</div>
                  </div>
                  <div className="col-4">
                    <div className="small text-muted">Status</div>
                    <div className={`fs-5 fw-bold mt-1 ${result.passed ? 'text-success' : 'text-danger'}`}>
                      {result.passed ? 'PASSED' : 'RETRY'}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button
                    className="btn btn-cyber-primary rounded-pill px-4 d-inline-flex align-items-center gap-2"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw size={18} />
                    <span>Retake Quiz</span>
                  </button>
                  <Link to="/quizzes/history" className="btn btn-outline-secondary rounded-pill px-4 d-inline-flex align-items-center gap-2">
                    <History size={18} />
                    <span>View Past Attempts</span>
                  </Link>
                  <Link to="/quizzes" className="btn btn-link text-secondary text-decoration-none">
                    More Quizzes
                  </Link>
                </div>
              </div>

              {/* Detailed Breakdown with Explanations */}
              <h4 className="fw-bold text-dark mb-3">Detailed Answers & Security Explanations</h4>
              <p className="text-secondary small mb-4">
                Review each question to understand the deception techniques scammers employ and how to counter them:
              </p>

              <div className="d-flex flex-column gap-4">
                {result.answerDetails?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`cyber-card p-4 shadow-sm border-start border-4 ${
                      item.isCorrect ? 'border-success' : 'border-danger'
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-light text-muted border small">Question {idx + 1}</span>
                      {item.isCorrect ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success d-flex align-items-center gap-1">
                          <CheckCircle size={14} />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger d-flex align-items-center gap-1">
                          <XCircle size={14} />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    <h5 className="fw-bold text-dark mb-3">{item.questionText}</h5>

                    <div className="p-3 rounded-3 bg-light border mb-3 small">
                      <div className="mb-1 text-secondary">
                        <strong>Your Selected Answer:</strong>{' '}
                        <span className={item.isCorrect ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                          {item.selectedOptionText || 'Not Answered'}
                        </span>
                      </div>
                      {!item.isCorrect && (
                        <div className="text-success">
                          <strong>Correct Safe Choice:</strong> {item.correctOptionText}
                        </div>
                      )}
                    </div>

                    <div className="alert alert-info py-2.5 px-3 mb-0 small border-info border-opacity-30">
                      <strong>Security Rationale:</strong> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ QUESTION INTERFACE
  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Top Bar with Timer and Progress */}
            <div className="cyber-card p-3 p-md-4 mb-4 shadow-sm border">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small text-muted fw-bold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className={`badge rounded-pill px-3 py-1.5 fw-bold d-flex align-items-center gap-1.5 ${
                  timeLeft < 120 ? 'bg-danger' : 'bg-dark'
                }`}>
                  <Clock size={15} />
                  <span>{formatTime(timeLeft)}</span>
                </span>
              </div>

              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: `${progressPercent}%` }}
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
                <AlertTriangle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Current Question Card */}
            {currentQ && (
              <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border">
                <h4 className="fw-bold text-dark mb-4 leading-relaxed">
                  {currentQ.questionText}
                </h4>

                <div className="d-flex flex-column gap-2.5 mb-4">
                  {currentQ.options?.map((option) => {
                    const isSelected = selectedAnswers[currentQ.id] === option.id;
                    return (
                      <div
                        key={option.id}
                        className={`p-3.5 rounded-3 border d-flex align-items-center gap-3 cursor-pointer transition ${
                          isSelected
                            ? 'border-info bg-info bg-opacity-10 text-dark shadow-sm'
                            : 'border-light bg-light hover-border-info'
                        }`}
                        onClick={() => handleOptionSelect(currentQ.id, option.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name={`q_${currentQ.id}`}
                          id={`opt_${option.id}`}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(currentQ.id, option.id)}
                        />
                        <label
                          htmlFor={`opt_${option.id}`}
                          className="form-check-label w-100 cursor-pointer small leading-relaxed mb-0"
                          style={{ cursor: 'pointer' }}
                        >
                          {option.optionText}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4 d-inline-flex align-items-center gap-1.5"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-cyber-primary rounded-pill px-4 d-inline-flex align-items-center gap-1.5"
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    >
                      <span>Next</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success rounded-pill px-4 d-inline-flex align-items-center gap-1.5 fw-bold shadow"
                      disabled={submitting}
                      onClick={handleSubmit}
                    >
                      {submitting ? (
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          <span>Submit Assessment</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayPage;
