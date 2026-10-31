import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your registered email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ email: email.trim(), password });
      if (res.success && res.data) {
        login(res.data.token, res.data);
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Login failed. Please verify your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="py-5 bg-page min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="cyber-card p-4 p-md-5 shadow-lg border">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                  <Shield size={32} />
                </div>
                <h3 className="fw-bold text-dark">Portal Login</h3>
                <p className="text-secondary small">
                  Sign in to access quizzes, community helpdesk, and personal dashboard.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-muted">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@community.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">Password</label>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-muted">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-cyber-primary w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials Helper for Examiners */}
              <div className="p-3 bg-light rounded-3 border mt-3 small">
                <div className="fw-bold text-dark mb-1">Quick Demo Accounts for Evaluation:</div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-info btn-sm py-1 px-2.5"
                    onClick={() => setDemoCredentials('admin@cybersafe.org', 'Admin@123')}
                  >
                    Admin: admin@cybersafe.org
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm py-1 px-2.5"
                    onClick={() => setDemoCredentials('aarav@community.org', 'User@123')}
                  >
                    User: aarav@community.org
                  </button>
                </div>
              </div>

              {/* Switch to Register */}
              <div className="text-center mt-4 pt-2 border-top">
                <span className="small text-muted">Don't have an account yet? </span>
                <Link to="/register" className="small text-info fw-bold text-decoration-none">
                  Register for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
