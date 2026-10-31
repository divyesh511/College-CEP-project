import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Award, CheckCircle, XCircle, Calendar, ArrowRight } from 'lucide-react';
import { quizService } from '../../services/quizService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QuizHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await quizService.getMyQuizHistory();
        if (res?.success && res.data) {
          setHistory(res.data);
        }
      } catch (err) {
        console.error('Error fetching quiz history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Retrieving your quiz attempts history..." />;
  }

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-semibold small mb-2">
              <History size={16} />
              <span>Assessment Records</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">My Quiz History</h2>
            <p className="text-secondary small mb-0">
              Audit trail of your previous attempts, score improvements, and pass/fail milestones.
            </p>
          </div>
          <Link to="/quizzes" className="btn btn-cyber-primary rounded-pill px-4 shadow-sm">
            Take Another Quiz
          </Link>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <History size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Quiz History Yet</h4>
          <p className="text-secondary small max-w-500 mx-auto mb-4">
            You haven't completed any cyber awareness tests. Complete a quiz challenge to track your scores.
          </p>
          <Link to="/quizzes" className="btn btn-cyber-primary rounded-pill px-4">
            Browse Quizzes
          </Link>
        </div>
      ) : (
        <div className="cyber-card p-4 shadow-sm border bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Quiz Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Score</th>
                  <th scope="col">Result</th>
                  <th scope="col">Attempted On</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((attempt) => (
                  <tr key={attempt.id}>
                    <td>
                      <div className="fw-bold text-dark">{attempt.quizTitle}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small">
                        {attempt.categoryName}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold fs-6 text-dark">{attempt.scorePercentage}%</span>
                      <div className="small text-muted">{attempt.correctAnswers} of {attempt.totalQuestions} correct</div>
                    </td>
                    <td>
                      {attempt.passed ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
                          <CheckCircle size={14} />
                          <span>PASSED</span>
                        </span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
                          <XCircle size={14} />
                          <span>FAILED</span>
                        </span>
                      )}
                    </td>
                    <td className="text-muted small">
                      {new Date(attempt.attemptedAt).toLocaleString()}
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/quizzes/${attempt.quizId}/play`}
                        className="btn btn-outline-info btn-sm rounded-pill px-3"
                      >
                        Retake
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizHistoryPage;
