import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Plus, Edit, Trash2, Clock, Award, AlertCircle } from 'lucide-react';
import { quizService } from '../../services/quizService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const QuizManagePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, quizId: null, title: '' });

  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const res = await quizService.getAllQuizzes();
      if (res?.success && res.data) {
        setQuizzes(res.data);
      }
    } catch (err) {
      console.error('Error loading quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await quizService.deleteQuiz(deleteModal.quizId);
      setDeleteModal({ show: false, quizId: null, title: '' });
      loadQuizzes();
    } catch (err) {
      console.error('Error deleting quiz:', err);
    }
  };

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
              <CheckSquare size={16} />
              <span>Assessment Architecture</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">Quiz & Question Bank Management</h2>
            <p className="text-secondary small mb-0">
              Create and manage multiple-choice scenarios, configure passing score thresholds, and write educational explanations.
            </p>
          </div>
          <Link to="/admin/quizzes/new" className="btn btn-danger rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm">
            <Plus size={18} />
            <span>Create New Quiz</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading quiz catalog..." />
      ) : quizzes.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <CheckSquare size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Quizzes Found</h4>
          <p className="text-secondary small mb-4">No active quizzes exist in the database.</p>
          <Link to="/admin/quizzes/new" className="btn btn-danger rounded-pill px-4">
            Build First Quiz
          </Link>
        </div>
      ) : (
        <div className="cyber-card p-4 shadow-sm border bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title & Description</th>
                  <th>Category</th>
                  <th>Questions</th>
                  <th>Passing Mark</th>
                  <th>Time Limit</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td style={{ maxWidth: '320px' }}>
                      <div className="fw-bold text-dark">{quiz.title}</div>
                      <div className="small text-muted text-truncate">{quiz.description}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small">
                        {quiz.categoryName}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold text-dark">{quiz.questionCount}</span> questions
                    </td>
                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success border border-success">
                        {quiz.passingScore}% Pass
                      </span>
                    </td>
                    <td className="small text-muted">
                      {quiz.timeLimitMinutes} Mins
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-1">
                        <Link
                          to={`/admin/quizzes/${quiz.id}/edit`}
                          className="btn btn-outline-primary btn-sm rounded-circle p-1.5"
                          title="Edit Questions & Settings"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle p-1.5"
                          title="Delete Quiz"
                          onClick={() => setDeleteModal({ show: true, quizId: quiz.id, title: quiz.title })}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmationModal
        show={deleteModal.show}
        title="Delete Quiz"
        message={`Are you sure you want to delete quiz "${deleteModal.title}" and all its questions and attempt history?`}
        confirmText="Delete Quiz"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ show: false, quizId: null, title: '' })}
      />
    </div>
  );
};

export default QuizManagePage;
