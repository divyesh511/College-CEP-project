import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Award, HelpCircle, ArrowRight, History } from 'lucide-react';
import { quizService } from '../../services/quizService';
import { categoryService } from '../../services/categoryService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [quizRes, catRes] = await Promise.all([
          quizService.getAllQuizzes(selectedCategory || null),
          categoryService.getAllCategories(),
        ]);

        if (quizRes?.success && quizRes.data) {
          setQuizzes(quizRes.data);
        }
        if (catRes?.success && catRes.data) {
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary fw-bold small mb-2">
              <CheckCircle size={16} />
              <span>Interactive Assessment Hub</span>
            </div>
            <h1 className="display-5 fw-extrabold text-dark mb-1">Cyber Safety Quizzes</h1>
            <p className="text-secondary mb-0">
              Test your instinct against realistic fraudulent payment requests, deceptive links, and social engineering traps.
            </p>
          </div>

          <Link to="/quizzes/history" className="btn btn-outline-light rounded-pill px-4 d-inline-flex align-items-center gap-2">
            <History size={18} />
            <span>My Quiz History</span>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            className={`btn btn-sm rounded-pill px-3 ${selectedCategory === '' ? 'btn-cyber-primary' : 'btn-outline-light'}`}
            onClick={() => setSelectedCategory('')}
          >
            All Topics
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`btn btn-sm rounded-pill px-3 ${
                selectedCategory === String(c.id) ? 'btn-cyber-primary text-white fw-bold' : 'btn-outline-light'
              }`}
              onClick={() => setSelectedCategory(String(c.id))}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Quizzes List */}
        {loading ? (
          <LoadingSpinner message="Loading available cyber safety quizzes..." />
        ) : quizzes.length === 0 ? (
          <div className="text-center py-5 cyber-card p-5">
            <CheckCircle size={48} className="text-muted mb-3" />
            <h4 className="fw-bold text-dark">No Quizzes Found</h4>
            <p className="text-secondary small max-w-500 mx-auto">
              There are no active quizzes for this category at the moment. Try selecting "All Topics" above.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="col-lg-6">
                <div className="cyber-card p-4 p-md-5 h-100 shadow-sm border d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-1.5 rounded-pill fw-semibold">
                      {quiz.categoryName}
                    </span>
                    <span className="badge bg-light text-muted border px-2.5 py-1 rounded-pill small d-flex align-items-center gap-1">
                      <Clock size={14} />
                      <span>{quiz.timeLimitMinutes} Mins</span>
                    </span>
                  </div>

                  <h4 className="fw-bold text-heading mb-2">{quiz.title}</h4>
                  <p className="text-secondary small flex-grow-1 leading-relaxed mb-4">
                    {quiz.description}
                  </p>

                  <div className="row g-2 mb-4 py-3 rounded-4 cyber-card text-center small shadow-sm">
                    <div className="col-6 border-end">
                      <div className="text-muted">Questions</div>
                      <div className="fw-bold text-heading fs-6">{quiz.questionCount} Questions</div>
                    </div>
                    <div className="col-6">
                      <div className="text-muted">Pass Mark</div>
                      <div className="fw-bold text-success fs-6">{quiz.passingScore}% Needed</div>
                    </div>
                  </div>

                  <Link
                    to={`/quizzes/${quiz.id}/play`}
                    className="btn btn-cyber-primary w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-auto rounded-pill shadow"
                  >
                    <span>Start Challenge</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizListPage;
