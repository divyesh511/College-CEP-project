import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {
  LayoutDashboard,
  FileText,
  Tag,
  HelpCircle,
  Users,
  CheckSquare,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column min-vh-100 bg-page position-relative">
      <div className="ambient-glow-orb-1" aria-hidden="true"></div>
      <div className="ambient-glow-orb-2" aria-hidden="true"></div>
      <Navbar />
      <div className="container-fluid py-4 flex-grow-1 px-lg-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4">
          {/* Admin Sidebar */}
          <div className="col-lg-3 col-xl-2">
            <div className="cyber-card p-3 shadow-sm sticky-top" style={{ top: '80px' }}>
              <div className="d-flex align-items-center gap-2 p-2.5 bg-danger bg-opacity-10 text-danger rounded-4 mb-3 border border-danger border-opacity-30 shadow-sm">
                <ShieldAlert size={20} />
                <span className="fw-bold small">ADMINISTRATION PANEL</span>
              </div>

              <div className="nav flex-column nav-pills gap-1">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/dashboard') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span>Overview & Stats</span>
                </Link>

                <Link
                  to="/admin/articles"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/articles') || location.pathname.startsWith('/admin/articles/') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <FileText size={18} />
                  <span>Articles & Alerts</span>
                </Link>

                <Link
                  to="/admin/categories"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/categories') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <Tag size={18} />
                  <span>Threat Categories</span>
                </Link>

                <Link
                  to="/admin/quizzes"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/quizzes') || location.pathname.startsWith('/admin/quizzes/') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <CheckSquare size={18} />
                  <span>Quizzes & Banks</span>
                </Link>

                <Link
                  to="/admin/helpdesk"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/helpdesk') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <HelpCircle size={18} />
                  <span>Helpdesk Tickets</span>
                </Link>

                <Link
                  to="/admin/users"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/admin/users') ? 'bg-danger text-white fw-bold' : 'text-secondary'
                  }`}
                >
                  <Users size={18} />
                  <span>User Directory</span>
                </Link>

                <hr className="my-2" />

                <Link
                  to="/dashboard"
                  className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-muted small"
                >
                  <ArrowLeft size={16} />
                  <span>Return to User View</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Main Content */}
          <div className="col-lg-9 col-xl-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
