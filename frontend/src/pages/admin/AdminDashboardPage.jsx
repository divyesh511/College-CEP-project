import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  CheckSquare,
  HelpCircle,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getAdminStats();
        if (res?.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Calculating real-time database metrics..." />;
  }

  // Helpdesk Pie Chart Data
  const pieData = [
    { name: 'Pending', value: stats?.pendingQueries || 0, color: '#f59e0b' },
    { name: 'In Progress', value: stats?.inProgressQueries || 0, color: '#0ea5e9' },
    { name: 'Resolved', value: stats?.resolvedQueries || 0, color: '#10b981' },
  ].filter(d => d.value > 0);

  // Recent Attempts Chart Data
  const barData = (stats?.recentAttempts || []).slice(0, 6).map((attempt, index) => ({
    name: `A-${attempt.id}`,
    score: attempt.scorePercentage,
    passScore: 60,
  }));

  return (
    <div>
      {/* Header */}
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2 border border-danger border-opacity-25">
              <ShieldCheck size={16} />
              <span>Real-Time MySQL Aggregates</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">Administrative Analytics Dashboard</h2>
            <p className="text-secondary small mb-0">
              Live metrics across community users, published educational guides, quiz pass rates, and resolved helpdesk queries.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/admin/articles/new" className="btn btn-outline-danger btn-sm rounded-pill px-3">
              + New Article
            </Link>
            <Link to="/admin/quizzes/new" className="btn btn-danger btn-sm rounded-pill px-3">
              + New Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Registered Users</span>
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
                <Users size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{stats?.totalUsers || 0}</h3>
            <div className="small text-muted">Community members</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Published Articles</span>
              <div className="bg-info bg-opacity-10 text-info p-2 rounded-circle">
                <BookOpen size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{stats?.totalArticles || 0}</h3>
            <div className="small text-muted">Live educational guides</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Quiz Attempts</span>
              <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle">
                <CheckSquare size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{stats?.totalQuizAttempts || 0}</h3>
            <div className="small text-muted">Across {stats?.totalQuizzes || 0} quizzes</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Average Quiz Score</span>
              <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle">
                <TrendingUp size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-dark mb-1">{stats?.averageQuizScore || 0}%</h3>
            <div className="small text-muted">Community average</div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="cyber-card p-4 h-100 shadow-sm border">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Pending Inquiries</span>
              <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle">
                <HelpCircle size={18} />
              </div>
            </div>
            <h3 className="fw-bold text-danger mb-1">{stats?.pendingQueries || 0}</h3>
            <div className="small text-muted">Awaiting moderator reply</div>
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="row g-4 mb-4">
        {/* Recent Quiz Scores Bar Chart */}
        <div className="col-lg-7">
          <div className="cyber-card p-4 shadow-sm border bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Recent Quiz Performance (%)</h5>
            {barData.length === 0 ? (
              <div className="text-center py-5 text-muted small">No quiz attempts recorded yet.</div>
            ) : (
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#0284c7" radius={[4, 4, 0, 0]} name="Score %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Helpdesk Queries Status Breakdown Pie Chart */}
        <div className="col-lg-5">
          <div className="cyber-card p-4 shadow-sm border bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Helpdesk Inquiry Resolution</h5>
            {pieData.length === 0 ? (
              <div className="text-center py-5 text-muted small">No helpdesk queries submitted yet.</div>
            ) : (
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Feeds */}
      <div className="row g-4">
        {/* Recent Attempts Feed */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 shadow-sm border bg-white h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-dark mb-0">Recent Quiz Activity</h5>
              <Link to="/admin/quizzes" className="text-info small text-decoration-none fw-semibold">
                Manage Quizzes
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats?.recentAttempts || []).slice(0, 5).map((att) => (
                    <tr key={att.id}>
                      <td className="fw-semibold text-truncate" style={{ maxWidth: '160px' }}>{att.quizTitle}</td>
                      <td><strong>{att.scorePercentage}%</strong></td>
                      <td>
                        <span className={`badge ${att.passed ? 'bg-success' : 'bg-danger'}`}>
                          {att.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </td>
                      <td className="text-muted">{new Date(att.attemptedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {(!stats?.recentAttempts || stats.recentAttempts.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center py-3 text-muted">No attempts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Helpdesk Queries Feed */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 shadow-sm border bg-white h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-dark mb-0">Recent Helpdesk Submissions</h5>
              <Link to="/admin/helpdesk" className="text-danger small text-decoration-none fw-semibold">
                Manage Tickets
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th>User</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats?.recentQueries || []).slice(0, 5).map((q) => (
                    <tr key={q.id}>
                      <td className="fw-semibold text-truncate" style={{ maxWidth: '160px' }}>{q.subject}</td>
                      <td className="text-muted text-truncate" style={{ maxWidth: '100px' }}>{q.userName}</td>
                      <td>
                        <span className={`badge ${
                          q.status === 'RESOLVED' ? 'bg-success' : q.status === 'IN_PROGRESS' ? 'bg-warning text-dark' : 'bg-danger'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <Link to="/admin/helpdesk" className="btn btn-outline-dark btn-sm py-0 px-2 rounded-pill">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentQueries || stats.recentQueries.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center py-3 text-muted">No tickets found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
