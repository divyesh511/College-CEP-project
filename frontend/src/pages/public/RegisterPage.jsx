import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, Phone, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
      });

      if (res.success && res.data) {
        login(res.data.token, res.data);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || 'Registration failed. Please check your information.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-page min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <div className="cyber-card p-4 p-md-5 shadow-lg border">
              <div className="text-center mb-4">
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                  <Shield size={32} />
                </div>
                <h3 className="fw-bold text-dark">Create Community Account</h3>
                <p className="text-secondary small">
                  Join our cyber safety portal to take interactive quizzes, view score history, and get helpdesk guidance.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2.5 px-3 mb-4 small d-flex align-items-center gap-2">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text text-muted">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="e.g. Priya Patel"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text text-muted">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="priya@community.org"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Mobile Number (Optional)</label>
                  <div className="input-group">
                    <span className="input-group-text text-muted">
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text text-muted">
                        <Lock size={18} />
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Min 6 chars"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text text-muted">
                        <Lock size={18} />
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Re-type password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mb-4 small text-secondary">
                  <input className="form-check-input" type="checkbox" id="termsCheck" required />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I understand this portal is for educational community cyber awareness purposes.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-cyber-primary w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3 rounded-pill shadow"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-3 pt-2 border-top">
                <span className="small text-muted">Already registered? </span>
                <Link to="/login" className="small text-info fw-bold text-decoration-none">
                  Sign In to Your Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
