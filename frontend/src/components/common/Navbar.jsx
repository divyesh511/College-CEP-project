import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, User, LogOut, LayoutDashboard, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 border-bottom border-secondary shadow-sm sticky-top" style={{ backgroundColor: '#0b1120' }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-4" to="/">
          <div className="bg-info bg-opacity-10 p-2 rounded-circle border border-info border-opacity-25 d-flex align-items-center justify-content-center">
            <Shield className="text-info" size={24} />
          </div>
          <span>CyberSafe<span className="text-info">Community</span></span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active text-info fw-bold' : 'text-light'}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/resources') ? 'active text-info fw-bold' : 'text-light'}`} to="/resources">
                Articles & Guides
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/scams') ? 'active text-info fw-bold' : 'text-light'}`} to="/scams">
                Scam Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/tips') ? 'active text-info fw-bold' : 'text-light'}`} to="/tips">
                Safety Tips
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about-cep') ? 'active text-info fw-bold' : 'text-light'}`} to="/about-cep">
                About CEP
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
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
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border border-secondary mt-2" aria-labelledby="userDropdown">
                  <li>
                    <h6 className="dropdown-header text-truncate" style={{ maxWidth: '220px' }}>
                      {user?.email}
                    </h6>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/dashboard">
                      <LayoutDashboard size={16} />
                      <span>{isAdmin() ? 'Admin Dashboard' : 'User Dashboard'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/quizzes">
                      <CheckCircle2 size={16} />
                      <span>Take Quizzes</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/helpdesk/my">
                      <HelpCircle size={16} />
                      <span>My Helpdesk Queries</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                      <User size={16} />
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
                <Link to="/login" className="btn btn-outline-light btn-sm px-3 py-1">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info btn-sm px-3 py-1 fw-bold text-dark">
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
