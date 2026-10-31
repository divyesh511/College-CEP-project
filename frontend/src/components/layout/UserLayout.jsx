import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { LayoutDashboard, BookOpen, CheckCircle, HelpCircle, History, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column min-vh-100 bg-page position-relative">
      <div className="ambient-glow-orb-1" aria-hidden="true"></div>
      <div className="ambient-glow-orb-2" aria-hidden="true"></div>
      <Navbar />
      <div className="container py-4 flex-grow-1 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4">
          {/* User Sidebar */}
          <div className="col-lg-3">
            <div className="cyber-card p-3 shadow-sm sticky-top" style={{ top: '80px' }}>
              <div className="d-flex align-items-center gap-3 p-3 rounded-4 mb-3 border border-secondary border-opacity-25 bg-secondary bg-opacity-10 shadow-sm">
                <div className="bg-info bg-opacity-20 text-info p-2.5 rounded-circle fw-bold fs-5 border border-info border-opacity-30">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                  <div className="fw-bold text-heading text-truncate">{user?.fullName}</div>
                  <div className="small text-muted text-truncate">{user?.email}</div>
                </div>
              </div>

              <div className="nav flex-column nav-pills gap-1">
                <Link
                  to="/dashboard"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/dashboard') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span>My Dashboard</span>
                </Link>

                <Link
                  to="/resources"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/resources') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Safety Catalog</span>
                </Link>

                <Link
                  to="/quizzes"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/quizzes') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <CheckCircle size={18} />
                  <span>Take Quizzes</span>
                </Link>

                <Link
                  to="/quizzes/history"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/quizzes/history') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <History size={18} />
                  <span>My Quiz History</span>
                </Link>

                <Link
                  to="/helpdesk/submit"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/helpdesk/submit') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <HelpCircle size={18} />
                  <span>Ask Helpdesk</span>
                </Link>

                <Link
                  to="/helpdesk/my"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/helpdesk/my') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <HelpCircle size={18} />
                  <span>My Queries</span>
                </Link>

                <Link
                  to="/profile"
                  className={`nav-link d-flex align-items-center gap-2.5 px-3 py-2.5 rounded-3 ${
                    isActive('/profile') ? 'bg-info text-dark fw-bold' : 'text-secondary'
                  }`}
                >
                  <User size={18} />
                  <span>Profile & Security</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main User Content */}
          <div className="col-lg-9">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
