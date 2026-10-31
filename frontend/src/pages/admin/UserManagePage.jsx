import React, { useState, useEffect } from 'react';
import { Users, Shield, User, Mail, Calendar, Phone, CheckCircle } from 'lucide-react';
import { authService } from '../../services/authService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';

const UserManagePage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadUsers = async (pageNum) => {
    setLoading(true);
    try {
      const res = await authService.getAllUsers(pageNum, 10);
      if (res?.success && res.data) {
        setUsers(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-semibold small mb-2">
          <Users size={16} />
          <span>User Directory</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">Community Member Accounts</h2>
        <p className="text-secondary small mb-0">
          Directory of registered community participants, students, and system moderators. Passwords remain encrypted on the database and are never accessible.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading user directory from MySQL..." />
      ) : users.length === 0 ? (
        <div className="cyber-card p-5 text-center shadow-sm border bg-white">
          <Users size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Registered Users</h4>
        </div>
      ) : (
        <div className="cyber-card p-4 shadow-sm border bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Member Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Assigned Roles</th>
                  <th>Status</th>
                  <th>Registered On</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="fw-bold text-dark d-flex align-items-center gap-2">
                        <div className="bg-light p-1.5 rounded-circle border">
                          <User size={16} className="text-secondary" />
                        </div>
                        <span>{u.fullName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-secondary small">{u.email}</span>
                    </td>
                    <td className="small text-muted">{u.phone || '—'}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {u.roles?.map((r, rIdx) => (
                          <span
                            key={rIdx}
                            className={`badge ${r === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-info text-dark'}`}
                          >
                            {r.replace('ROLE_', '')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success border border-success px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
                        <CheckCircle size={12} />
                        <span>Active</span>
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(u.createdAt).toLocaleDateString()}
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
    </div>
  );
};

export default UserManagePage;
