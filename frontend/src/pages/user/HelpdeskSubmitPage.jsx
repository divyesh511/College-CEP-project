import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Send, AlertTriangle, ShieldCheck, ArrowLeft, PhoneCall } from 'lucide-react';
import { helpdeskService } from '../../services/helpdeskService';

const HelpdeskSubmitPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: '',
    category: 'UPI & Payment Scam',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.subject.trim() || !formData.description.trim()) {
      setError('Please provide both a subject and a detailed description of the incident or query.');
      return;
    }

    setLoading(true);
    try {
      const res = await helpdeskService.submitQuery(formData);
      if (res?.success) {
        navigate('/helpdesk/my');
      } else {
        setError(res?.message || 'Failed to submit query');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit helpdesk query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="cyber-card p-4 p-md-5 mb-4 shadow-sm border bg-white">
        <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-semibold small mb-2">
          <HelpCircle size={16} />
          <span>Community Assistance Portal</span>
        </div>
        <h2 className="fw-bold text-dark mb-1">Submit a Cyber Safety Query</h2>
        <p className="text-secondary small mb-0">
          Received a suspicious phone call, unusual SMS, or an unbelievable job offer? Describe the incident below to receive advice from trained community moderators.
        </p>
      </div>

      {/* Crucial Legal/Educational Disclaimer */}
      <div className="alert alert-warning p-3.5 mb-4 rounded-3 border-warning d-flex align-items-start gap-3 small">
        <AlertTriangle size={24} className="text-warning flex-shrink-0 mt-0.5" />
        <div>
          <strong>Important Community Disclaimer:</strong> This portal is an educational project providing safety hygiene guidance and fraud analysis. It is <strong>NOT an official police or emergency reporting system</strong>. If you are an active victim of financial fraud, dial <strong className="text-danger">1930</strong> immediately and register an official complaint at <strong>cybercrime.gov.in</strong>.
        </div>
      </div>

      <div className="cyber-card p-4 p-md-5 shadow-sm border bg-white">
        {error && (
          <div className="alert alert-danger py-2.5 px-3 mb-4 small">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Query Subject / Incident Headline</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              placeholder="e.g. Received WhatsApp message offering ₹2000/day for rating hotels"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Incident Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="UPI & Payment Scam">UPI & Payment Scam (Fake buyer, QR trick)</option>
              <option value="Phishing & Smishing">Phishing & Smishing (Fake SMS, KYC, Electricity bill)</option>
              <option value="Online Job Fraud">Online Job Fraud (Part-time task, Telegram investment)</option>
              <option value="Social Media & Identity Theft">Social Media & Identity Theft (Account clone, Impersonation)</option>
              <option value="Child Online Safety & Gaming">Child Online Safety & Gaming (Cyberbullying, Lobby threats)</option>
              <option value="General Cyber Safety Question">General Cyber Safety Question</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Detailed Incident Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="6"
              placeholder="Provide context: What did the message or caller say? Did they ask you to install an app (AnyDesk) or scan a QR code? Do not include your real passwords or financial PINs."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <div className="form-text small text-muted">
              Never share your actual OTP, PIN, or passwords in helpdesk inquiries.
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-3 border-top">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-cyber-primary rounded-pill px-4 d-inline-flex align-items-center gap-2 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpdeskSubmitPage;
