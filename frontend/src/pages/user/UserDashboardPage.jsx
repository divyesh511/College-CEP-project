import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle,
  Clock,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Shield,
  FileQuestion
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { quizService } from '../../services/quizService';
import { helpdeskService } from '../../services/helpdeskService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [quizRes, queryRes] = await Promise.all([
          quizService.getMyQuizHistory(),
          helpdeskService.getMyQueries(),
        ]);

        if (quizRes?.success && quizRes.data) {
          setHistory(quizRes.data);
        }
        if (queryRes?.success && queryRes.data) {
          setQueries(queryRes.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your CyberSafe dashboard..." />;
  }

  // Calculate user aggregates
  const totalAttempts = history.length;
  const passedAttempts = history.filter((h) => h.passed).length;
  const avgScore =
    totalAttempts > 0
      ? Math.round(history.reduce((acc, h) => acc + h.scorePercentage, 0) / totalAttempts)
      : 0;
  const resolvedQueriesCount = queries.filter((q) => q.status === 'RESOLVED').length;

  return (
    <div>
      {/* Welcome Header */}
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm bg-white border">
        <div className="row align-items-center g-3">
          <div className="col-lg-8">
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-semibold small mb-2">
              <Shield size={16} />
              <span>Community Member Learning Dashboard</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">
              Welcome back, {user?.fullName}!
            </h2>
            <p className="text-secondary small mb-0">
              Track your quiz scores, fraud detection competencies, and active helpdesk tickets in one place.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <Link to="/quizzes" className="btn btn-cyber-primary rounded-pill px-4 shadow-sm">
              Take New Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Quizzes Attempted</span>
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
                <FileQuestion size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{totalAttempts}</h3>
            <div className="small text-muted">{passedAttempts} Passed</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Average Score</span>
              <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle">
                <TrendingUp size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{avgScore}%</h3>
            <div className="progress mt-2" style={{ height: '6px' }}>
              <div
                className={`progress-bar ${avgScore >= 70 ? 'bg-success' : 'bg-warning'}`}
                role="progressbar"
                style={{ width: `${avgScore}%` }}
                aria-valuenow={avgScore}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Helpdesk Queries</span>
              <div className="bg-info bg-opacity-10 text-info p-2 rounded-circle">
                <HelpCircle size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{queries.length}</h3>
            <div className="small text-muted">{resolvedQueriesCount} Answered & Resolved</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Awareness Level</span>
              <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle">
                <Award size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">
              {avgScore >= 80 ? 'Master' : avgScore >= 60 ? 'Proficient' : totalAttempts === 0 ? 'Novice' : 'Learning'}
            </h3>
            <div className="small text-muted">Based on server assessment</div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Attempts & Quick Helpdesk */}
      <div className="row g-4 mb-4">
        {/* Recent Quiz Attempts */}
        <div className="col-lg-7">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-dark mb-0">Recent Quiz Attempts</h5>
              <Link to="/quizzes/history" className="text-info small fw-bold text-decoration-none">
                View All History
              </Link>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <FileQuestion size={36} className="text-secondary opacity-50 mb-2" />
                <p className="small mb-3">You haven't attempted any cyber safety quizzes yet.</p>
                <Link to="/quizzes" className="btn btn-outline-info btn-sm rounded-pill px-3">
                  Start Your First Quiz
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 small">
                  <thead className="table-light">
                    <tr>
                      <th>Quiz Title</th>
                      <th>Score</th>
                      <th>Result</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="fw-semibold text-dark">{attempt.quizTitle}</td>
                        <td>
                          <span className="fw-bold">{attempt.scorePercentage}%</span>{' '}
                          <span className="text-muted">({attempt.correctAnswers}/{attempt.totalQuestions})</span>
                        </td>
                        <td>
                          {attempt.passed ? (
                            <span className="badge bg-success bg-opacity-10 text-success border border-success">
                              PASSED
                            </span>
                          ) : (
                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger">
                              NEEDS REVIEW
                            </span>
                          )}
                        </td>
                        <td className="text-muted">
                          {new Date(attempt.attemptedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Community Helpdesk Quick Status */}
        <div className="col-lg-5">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-dark mb-0">Helpdesk Queries</h5>
              <Link to="/helpdesk/submit" className="text-info small fw-bold text-decoration-none">
                + Ask Question
              </Link>
            </div>

            {queries.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <HelpCircle size={36} className="text-secondary opacity-50 mb-2" />
                <p className="small mb-3">No active queries. Have a question about an unknown link or call?</p>
                <Link to="/helpdesk/submit" className="btn btn-outline-info btn-sm rounded-pill px-3">
                  Submit An Inquiry
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2.5">
                {queries.slice(0, 4).map((q) => (
                  <div key={q.id} className="p-3 rounded-3 bg-light border small">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '200px' }}>
                        {q.subject}
                      </div>
                      <span
                        className={`badge ${
                          q.status === 'RESOLVED'
                            ? 'bg-success'
                            : q.status === 'IN_PROGRESS'
                            ? 'bg-warning text-dark'
                            : 'bg-secondary'
                        }`}
                      >
                        {q.status}
                      </span>
                    </div>
                    {q.adminResponse ? (
                      <div className="text-success small fst-italic text-truncate mt-1">
                        Response: {q.adminResponse}
                      </div>
                    ) : (
                      <div className="text-muted small">Pending review by community team</div>
                    )}
                  </div>
                ))}
                <div className="text-center mt-2">
                  <Link to="/helpdesk/my" className="text-secondary small text-decoration-none hover-info">
                    View all your inquiries ➔
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
