import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Phone, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setProfileLoading(true);

    try {
      const res = await authService.updateProfile(profileForm);
      if (res?.success && res.data) {
        setUser({ ...user, fullName: res.data.fullName, phone: res.data.phone });
        setProfileMsg({ type: 'success', text: 'Profile information updated successfully!' });
      } else {
        setProfileMsg({ type: 'danger', text: res?.message || 'Failed to update profile' });
      }
    } catch (err) {
      setProfileMsg({ type: 'danger', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: 'danger', text: 'New password must be at least 6 characters long' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'danger', text: 'New passwords do not match' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await authService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res?.success) {
        setPasswordMsg({ type: 'success', text: 'Password changed successfully! Keep it confidential.' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMsg({ type: 'danger', text: res?.message || 'Failed to change password' });
      }
    } catch (err) {
      setPasswordMsg({ type: 'danger', text: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-semibold small mb-2">
          <Shield size={16} />
          <span>Account Security Settings</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">My Profile & Password Hygiene</h2>
        <p className="text-secondary small mb-0">
          Manage your contact credentials and maintain strong password protection against credential stuffing.
        </p>
      </div>

      <div className="row g-4">
        {/* Personal Details Form */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 p-md-5 shadow-sm border bg-white h-100">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <User size={20} className="text-info" />
              <span>Personal Information</span>
            </h5>

            {profileMsg.text && (
              <div className={`alert alert-${profileMsg.type} py-2 px-3 mb-3 small d-flex align-items-center gap-2`}>
                {profileMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Email Address (Registered ID)</label>
                <div className="input-group">
                  <span className="input-group-text text-muted">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    value={user?.email || ''}
                    disabled
                  />
                </div>
                <div className="form-text small text-muted">Email address is your unique identifier.</div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text text-muted">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text text-muted">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 XXXXX XXXXX"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-cyber-primary rounded-pill px-4"
                disabled={profileLoading}
              >
                {profileLoading ? 'Saving...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>

        {/* Password Hygiene Form */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 p-md-5 shadow-sm border bg-white h-100">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <Lock size={20} className="text-warning" />
              <span>Change Password</span>
            </h5>

            {passwordMsg.text && (
              <div className={`alert alert-${passwordMsg.type} py-2 px-3 mb-3 small d-flex align-items-center gap-2`}>
                {passwordMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Min 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-type new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning rounded-pill px-4 fw-semibold text-dark"
                disabled={passwordLoading}
              >
                {passwordLoading ? 'Updating Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
