import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CheckSquare, Plus, Trash2, Save, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { quizService } from '../../services/quizService';
import { categoryService } from '../../services/categoryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QuizFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    description: '',
    passingScore: 70,
    timeLimitMinutes: 10,
    active: true,
    questions: [
      {
        questionText: '',
        explanation: '',
        points: 1,
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await categoryService.getAllCategories();
        if (catRes?.success && catRes.data) {
          setCategories(catRes.data);
          if (!isEdit && catRes.data.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: catRes.data[0].id }));
          }
        }

        if (isEdit) {
          const quizRes = await quizService.getQuizForAdmin(id);
          if (quizRes?.success && quizRes.data) {
            const q = quizRes.data;
            setFormData({
              title: q.title,
              categoryId: q.categoryId || (catRes.data[0] ? catRes.data[0].id : ''),
              description: q.description,
              passingScore: q.passingScore,
              timeLimitMinutes: q.timeLimitMinutes,
              active: true,
              questions: q.questions.map((ques) => ({
                id: ques.id,
                questionText: ques.questionText,
                explanation: ques.explanation || '',
                points: ques.points || 1,
                options: ques.options.map((opt) => ({
                  id: opt.id,
                  optionText: opt.optionText,
                  isCorrect: Boolean(opt.isCorrect),
                })),
              })),
            });
          }
        }
      } catch (err) {
        console.error('Error fetching quiz details:', err);
        setError('Failed to load quiz details.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  // Question manipulation
  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: '',
          explanation: '',
          points: 1,
          options: [
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
          ],
        },
      ],
    });
  };

  const handleRemoveQuestion = (qIndex) => {
    if (formData.questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    const updated = formData.questions.filter((_, idx) => idx !== qIndex);
    setFormData({ ...formData, questions: updated });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updated = [...formData.questions];
    updated[qIndex][field] = value;
    setFormData({ ...formData, questions: updated });
  };

  // Option manipulation
  const handleAddOption = (qIndex) => {
    const updated = [...formData.questions];
    updated[qIndex].options.push({ optionText: '', isCorrect: false });
    setFormData({ ...formData, questions: updated });
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updated = [...formData.questions];
    if (updated[qIndex].options.length <= 2) {
      alert('A question must have at least two choices.');
      return;
    }
    updated[qIndex].options = updated[qIndex].options.filter((_, idx) => idx !== oIndex);
    setFormData({ ...formData, questions: updated });
  };

  const handleOptionTextChange = (qIndex, oIndex, text) => {
    const updated = [...formData.questions];
    updated[qIndex].options[oIndex].optionText = text;
    setFormData({ ...formData, questions: updated });
  };

  const handleSetCorrectOption = (qIndex, oIndex) => {
    const updated = [...formData.questions];
    updated[qIndex].options.forEach((opt, idx) => {
      opt.isCorrect = idx === oIndex;
    });
    setFormData({ ...formData, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Quiz title and description are required.');
      return;
    }

    // Validate that each question has text, explanation, and exactly one correct option
    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i];
      if (!q.questionText.trim()) {
        setError(`Question ${i + 1} text cannot be empty.`);
        return;
      }
      if (!q.explanation.trim()) {
        setError(`Question ${i + 1} requires an explanation for users.`);
        return;
      }
      const hasCorrect = q.options.some((o) => o.isCorrect);
      if (!hasCorrect) {
        setError(`Question ${i + 1} must have a designated correct answer.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].optionText.trim()) {
          setError(`Option ${j + 1} in Question ${i + 1} cannot be empty.`);
          return;
        }
      }
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        categoryId: Number(formData.categoryId),
        description: formData.description.trim(),
        passingScore: Number(formData.passingScore),
        timeLimitMinutes: Number(formData.timeLimitMinutes),
        active: formData.active,
        questions: formData.questions.map((q) => ({
          id: q.id,
          questionText: q.questionText.trim(),
          explanation: q.explanation.trim(),
          points: Number(q.points) || 1,
          options: q.options.map((o) => ({
            id: o.id,
            optionText: o.optionText.trim(),
            isCorrect: Boolean(o.isCorrect),
          })),
        })),
      };

      let res;
      if (isEdit) {
        res = await quizService.updateQuiz(id, payload);
      } else {
        res = await quizService.createQuiz(payload);
      }

      if (res?.success) {
        navigate('/admin/quizzes');
      } else {
        setError(res?.message || 'Failed to save quiz.');
      }
    } catch (err) {
      console.error('Quiz save error:', err);
      setError(err.response?.data?.message || 'Error occurred while saving the quiz.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner message="Loading quiz and question bank..." />;
  }

  return (
    <div>
      <div className="mb-3">
        <Link to="/admin/quizzes" className="text-secondary text-decoration-none d-inline-flex align-items-center gap-1.5 small fw-semibold">
          <ArrowLeft size={16} />
          <span>Back to Quizzes List</span>
        </Link>
      </div>

      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
          <CheckSquare size={16} />
          <span>Assessment Builder</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">
          {isEdit ? 'Edit Quiz & Question Bank' : 'Build New Cyber Safety Quiz'}
        </h2>
        <p className="text-secondary small mb-0">
          Configure scenario prompts, multiple choices, and designate the correct answer evaluated on the server.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Core Quiz Settings */}
        <div className="cyber-card p-4 mb-4 shadow-sm border bg-white">
          <h5 className="fw-bold text-dark mb-3">Quiz Configuration</h5>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label small fw-semibold text-secondary">Quiz Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. UPI QR & Payment Security Challenge"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold text-secondary">Category</label>
              <select
                className="form-select"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary">Quiz Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="A brief summary of what instincts this test challenges."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Passing Score Percentage (%)</label>
              <input
                type="number"
                min="10"
                max="100"
                className="form-control"
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Time Limit (Minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                className="form-control"
                value={formData.timeLimitMinutes}
                onChange={(e) => setFormData({ ...formData, timeLimitMinutes: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Dynamic Question Bank */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-dark mb-0">Question Bank ({formData.questions.length})</h5>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1.5"
              onClick={handleAddQuestion}
            >
              <Plus size={16} />
              <span>Add Question</span>
            </button>
          </div>

          <div className="d-flex flex-column gap-4">
            {formData.questions.map((question, qIdx) => (
              <div key={qIdx} className="cyber-card p-4 shadow-sm border bg-white">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger fw-bold">
                    Question #{qIdx + 1}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm border-0 text-danger p-1"
                    title="Remove Question"
                    onClick={() => handleRemoveQuestion(qIdx)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Scenario / Question Prompt</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="e.g. Someone asks you to enter your UPI PIN to claim ₹2,000. What happens?"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(qIdx, 'questionText', e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Multiple Choices */}
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <label className="form-label small fw-semibold text-secondary mb-0">
                      Answer Choices (Select radio button for the CORRECT safe answer)
                    </label>
                    <button
                      type="button"
                      className="btn btn-link text-info p-0 small text-decoration-none fw-semibold"
                      onClick={() => handleAddOption(qIdx)}
                    >
                      + Add Option
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {question.options.map((opt, oIdx) => (
                      <div key={oIdx} className="input-group">
                        <span className="input-group-text">
                          <input
                            type="radio"
                            name={`correct_q_${qIdx}`}
                            checked={opt.isCorrect}
                            onChange={() => handleSetCorrectOption(qIdx, oIdx)}
                            className="form-check-input mt-0"
                            title="Mark as correct answer"
                          />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${opt.isCorrect ? 'border-success bg-success bg-opacity-10 fw-semibold text-success' : ''}`}
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt.optionText}
                          onChange={(e) => handleOptionTextChange(qIdx, oIdx, e.target.value)}
                          required
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveOption(qIdx, oIdx)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="form-label small fw-semibold text-secondary">
                    Security Rationale & Explanation (Revealed post-test)
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Explain why the correct choice is safe and what scam tactic is at play."
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="cyber-card p-4 shadow-sm border bg-white d-flex align-items-center justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill px-4"
            onClick={() => navigate('/admin/quizzes')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-danger rounded-pill px-4 d-inline-flex align-items-center gap-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status"></span>
            ) : (
              <>
                <Save size={18} />
                <span>{isEdit ? 'Update Quiz' : 'Save & Publish Quiz'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizFormPage;
