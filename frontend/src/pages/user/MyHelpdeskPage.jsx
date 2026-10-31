import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Clock, CheckCircle2, AlertCircle, MessageSquare, Send, Calendar } from 'lucide-react';
import { helpdeskService } from '../../services/helpdeskService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MyHelpdeskPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await helpdeskService.getMyQueries();
        if (res?.success && res.data) {
          setQueries(res.data);
        }
      } catch (err) {
        console.error('Error fetching my queries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your helpdesk inquiries..." />;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return (
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
            <CheckCircle2 size={14} />
            <span>RESOLVED</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="badge bg-warning bg-opacity-10 text-warning border border-warning px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
            <Clock size={14} />
            <span>IN PROGRESS</span>
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1">
            <AlertCircle size={14} />
            <span>PENDING REVIEW</span>
          </span>
        );
    }
  };

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-semibold small mb-2">
              <MessageSquare size={16} />
              <span>Inquiry Tracking</span>
            </div>
            <h2 className="fw-bold text-dark mb-1">My Helpdesk Queries</h2>
            <p className="text-secondary small mb-0">
              Track responses from community cyber safety moderators on your submitted incidents.
            </p>
          </div>
          <Link to="/helpdesk/submit" className="btn btn-cyber-primary rounded-pill px-4 shadow-sm">
            + New Query
          </Link>
        </div>
      </div>

      {queries.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <HelpCircle size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Queries Submitted</h4>
          <p className="text-secondary small max-w-500 mx-auto mb-4">
            You haven't submitted any questions yet. If you encounter a suspicious message, link, or call, our team is here to assist.
          </p>
          <Link to="/helpdesk/submit" className="btn btn-cyber-primary rounded-pill px-4">
            Ask A Question Now
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {queries.map((q) => (
            <div key={q.id} className="cyber-card p-4 p-md-5 shadow-sm border bg-white">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill small">
                  {q.category}
                </span>
                {getStatusBadge(q.status)}
              </div>

              <h4 className="fw-bold text-dark mb-2">{q.subject}</h4>
              <p className="text-secondary small mb-3 leading-relaxed">
                {q.description}
              </p>

              <div className="small text-muted mb-3 d-flex align-items-center gap-1.5">
                <Calendar size={14} />
                <span>Submitted on {new Date(q.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Admin Advice Block */}
              {q.adminResponse ? (
                <div className="p-3.5 rounded-4 cyber-card border border-success border-opacity-40 mt-3 shadow-sm">
                  <div className="d-flex align-items-center gap-2 text-success fw-bold small mb-1">
                    <CheckCircle2 size={16} />
                    <span>Expert Advice from Moderator ({q.responderName || 'CyberSafe Team'}):</span>
                  </div>
                  <p className="text-heading small leading-relaxed mb-1">
                    {q.adminResponse}
                  </p>
                  {q.resolvedAt && (
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      Resolved on {new Date(q.resolvedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-4 cyber-card small text-muted fst-italic">
                  A community moderator is reviewing your inquiry. Please check back shortly for recommendations.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHelpdeskPage;
