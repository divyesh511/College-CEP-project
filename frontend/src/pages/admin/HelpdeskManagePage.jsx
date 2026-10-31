import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, Clock, AlertCircle, MessageSquare, Send, Calendar, User } from 'lucide-react';
import { helpdeskService } from '../../services/helpdeskService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';

const HelpdeskManagePage = () => {
  const [queries, setQueries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Response Modal State
  const [activeModal, setActiveModal] = useState({
    show: false,
    query: null,
    response: '',
    status: 'RESOLVED',
  });
  const [savingResponse, setSavingResponse] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadQueries = async (statusFilter, pageNum) => {
    setLoading(true);
    try {
      const res = await helpdeskService.getAllQueriesForAdmin(statusFilter || null, pageNum, 10);
      if (res?.success && res.data) {
        setQueries(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (err) {
      console.error('Error loading admin helpdesk queries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueries(selectedStatus, page);
  }, [selectedStatus, page]);

  const handleStatusFilterChange = (status) => {
    setSelectedStatus(status);
    setPage(0);
  };

  const handleOpenResponseModal = (query) => {
    setActiveModal({
      show: true,
      query: query,
      response: query.adminResponse || '',
      status: query.status === 'PENDING' ? 'RESOLVED' : query.status,
    });
    setErrorMsg('');
  };

  const handleCloseModal = () => {
    setActiveModal({ show: false, query: null, response: '', status: 'RESOLVED' });
  };

  const handleSaveResponse = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!activeModal.response.trim()) {
      setErrorMsg('Please write an educational response or advice.');
      return;
    }

    setSavingResponse(true);
    try {
      await helpdeskService.respondToQuery(activeModal.query.id, {
        adminResponse: activeModal.response.trim(),
        status: activeModal.status,
      });

      handleCloseModal();
      loadQueries(selectedStatus, page);
    } catch (err) {
      console.error('Error recording response:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit response.');
    } finally {
      setSavingResponse(false);
    }
  };

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
          <HelpCircle size={16} />
          <span>Moderation & Support</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">Community Helpdesk Inquiries</h2>
        <p className="text-secondary small mb-0">
          Review reported scam encounters, provide guidance to community participants, and update resolution states.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={`btn btn-sm rounded-pill px-3.5 ${selectedStatus === '' ? 'btn-dark' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilterChange('')}
        >
          All Inquiries
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3.5 ${selectedStatus === 'PENDING' ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => handleStatusFilterChange('PENDING')}
        >
          Pending Review
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3.5 ${selectedStatus === 'IN_PROGRESS' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
          onClick={() => handleStatusFilterChange('IN_PROGRESS')}
        >
          In Progress
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3.5 ${selectedStatus === 'RESOLVED' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => handleStatusFilterChange('RESOLVED')}
        >
          Resolved
        </button>
      </div>

      {/* Inquiries Table */}
      {loading ? (
        <LoadingSpinner message="Loading community helpdesk tickets..." />
      ) : queries.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <HelpCircle size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Helpdesk Inquiries</h4>
          <p className="text-secondary small mb-0">No tickets matching the selected status filter.</p>
        </div>
      ) : (
        <div className="cyber-card p-4 shadow-sm border bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Subject & Details</th>
                  <th>Member</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q.id}>
                    <td style={{ maxWidth: '300px' }}>
                      <div className="fw-bold text-dark text-truncate">{q.subject}</div>
                      <div className="text-secondary small text-truncate">{q.description}</div>
                      {q.adminResponse && (
                        <div className="text-success small text-truncate mt-1">
                          ↳ <em>{q.adminResponse}</em>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{q.userName}</div>
                      <div className="text-muted small">{q.userEmail}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small">
                        {q.category}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        q.status === 'RESOLVED'
                          ? 'bg-success'
                          : q.status === 'IN_PROGRESS'
                          ? 'bg-warning text-dark'
                          : 'bg-danger'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-pill px-3"
                        onClick={() => handleOpenResponseModal(q)}
                      >
                        {q.adminResponse ? 'Edit Advice' : 'Review & Respond'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      {/* Response Modal */}
      {activeModal.show && activeModal.query && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <MessageSquare size={20} className="text-danger" />
                  <span>Helpdesk Ticket Review #{activeModal.query.id}</span>
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>

              <form onSubmit={handleSaveResponse}>
                <div className="modal-body p-4">
                  {errorMsg && (
                    <div className="alert alert-danger py-2 px-3 mb-3 small">
                      {errorMsg}
                    </div>
                  )}

                  {/* Incident Context */}
                  <div className="p-3 bg-light rounded-3 border mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-info bg-opacity-10 text-info border border-info small">
                        {activeModal.query.category}
                      </span>
                      <small className="text-muted">
                        From: <strong>{activeModal.query.userName}</strong> ({activeModal.query.userEmail})
                      </small>
                    </div>
                    <h6 className="fw-bold text-dark mt-2 mb-1">{activeModal.query.subject}</h6>
                    <p className="text-secondary small mb-0 leading-relaxed">
                      {activeModal.query.description}
                    </p>
                  </div>

                  {/* Expert Response Input */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Moderator Advice & Educational Guidance:
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Explain why this was fraudulent, what steps to take right now, and how to report to 1930 if money was lost."
                      value={activeModal.response}
                      onChange={(e) => setActiveModal({ ...activeModal, response: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  {/* Status Picker */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Update Ticket Status:</label>
                    <select
                      className="form-select"
                      value={activeModal.status}
                      onChange={(e) => setActiveModal({ ...activeModal, status: e.target.value })}
                      required
                    >
                      <option value="IN_PROGRESS">In Progress (Further details requested)</option>
                      <option value="RESOLVED">Resolved (Complete answer provided)</option>
                      <option value="PENDING">Pending (Still awaiting action)</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-light rounded-pill px-3" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2"
                    disabled={savingResponse}
                  >
                    {savingResponse ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Save Response</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpdeskManagePage;
