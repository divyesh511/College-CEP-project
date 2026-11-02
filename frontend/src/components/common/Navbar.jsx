import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, User, LogOut, LayoutDashboard, HelpCircle, FileText, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg py-3 sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2.5 fw-bold fs-4 text-decoration-none" to="/">
          <div className="p-1 rounded-circle d-flex align-items-center justify-content-center shadow-sm">
            <img src="/favicon.svg" alt="CyberSafe Logo" width="34" height="34" className="rounded-circle" />
          </div>
          <span><span className="text-white">CyberSafe</span><span className="text-info">Community</span></span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cybersafeNavbar"
          aria-controls="cybersafeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links & Auth Actions */}
        <div className="collapse navbar-collapse" id="cybersafeNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/resources') ? 'active' : ''}`} to="/resources">
                Articles & Guides
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/scams') ? 'active' : ''}`} to="/scams">
                Scam Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/tips') ? 'active' : ''}`} to="/tips">
                Safety Tips
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about-cep') ? 'active' : ''}`} to="/about-cep">
                About CEP
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              className="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center rounded-circle p-2"
              style={{ width: '38px', height: '38px' }}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light Glass' : 'Dark Glass'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-warning" />
              ) : (
                <Moon size={18} className="text-info" />
              )}
            </button>

            {isAuthenticated() ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={16} className="text-info" />
                  <span className="small fw-semibold">{user?.fullName || 'My Account'}</span>
                  {isAdmin() && <span className="badge bg-danger rounded-pill ms-1" style={{ fontSize: '0.65rem' }}>ADMIN</span>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg mt-2" aria-labelledby="userDropdown">
                  <li>
                    <h6 className="dropdown-header text-truncate" style={{ maxWidth: '220px' }}>
                      {user?.email}
                    </h6>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/dashboard">
                      <LayoutDashboard size={16} className="text-info" />
                      <span>{isAdmin() ? 'Admin Dashboard' : 'User Dashboard'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/quizzes">
                      <CheckCircle2 size={16} className="text-success" />
                      <span>Take Quizzes</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/helpdesk/my">
                      <HelpCircle size={16} className="text-warning" />
                      <span>My Helpdesk Queries</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                      <User size={16} className="text-primary" />
                      <span>Profile & Password</span>
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light btn-sm px-3 py-1.5 rounded-pill">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info btn-sm px-3 py-1.5 fw-bold rounded-pill text-dark">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

