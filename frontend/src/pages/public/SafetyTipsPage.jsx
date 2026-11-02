import React from 'react';
import { Key, Lock, Wifi, Smartphone, Users, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SafetyTipsPage = () => {
  const tipCategories = [
    {
      icon: <Key className="text-info" size={28} />,
      title: 'Password Hygiene & Passphrases',
      tips: [
        'Use 4-5 random words instead of complex short characters (e.g. "Coffee#Rainbow*Tiger77")',
        'Never reuse your banking or email password for college forums or gaming platforms.',
        'Avoid predictable words like your name, pet name, birthdate, or "Password@123".',
        'Use an open-source or trusted password manager (e.g., Bitwarden) instead of saving passwords in browser auto-fill on shared college computers.'
      ]
    },
    {
      icon: <Lock className="text-warning" size={28} />,
      title: 'Two-Factor Authentication (2FA)',
      tips: [
        'Always enable 2FA on Google, Instagram, WhatsApp, and financial accounts.',
        'Prefer App-based authenticators (Google Authenticator, Microsoft Authenticator) over SMS OTPs when possible.',
        'Never share OTPs with anyone over the phone, even if they claim to be a bank manager or courier delivery agent.',
        'Set up a WhatsApp Two-Step Verification PIN to protect against SIM-swap account takeovers.'
      ]
    },
    {
      icon: <Wifi className="text-primary" size={28} />,
      title: 'Public Wi-Fi & Charging Safety',
      tips: [
        'Avoid performing net banking, UPI payments, or checking sensitive emails on free public Wi-Fi networks (railway stations, cafes).',
        'Turn off "Auto-connect to open Wi-Fi" on your mobile device.',
        'Beware of "Juice Jacking" at public USB charging kiosks in airports or malls. Use your own wall adapter or a USB data blocker.',
        'Verify HTTPS padlock in browser address bars before submitting personal information.'
      ]
    },
    {
      icon: <Smartphone className="text-success" size={28} />,
      title: 'Smartphone & App Permissions',
      tips: [
        'Never install Android applications via unsolicited `.apk` files received over WhatsApp, Telegram, or SMS.',
        'Review application permissions: A calculator or flashlight app does not need access to Contacts, SMS, or Microphone.',
        'Keep your smartphone operating system and banking applications updated to latest security patches.',
        'Enable remote device finding and wiping (Google Find My Device / Apple Find My) in case of theft.'
      ]
    }
  ];

  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-success bg-opacity-10 text-success fw-bold small mb-2 border border-success border-opacity-25">
            <ShieldCheck size={16} />
            <span>Digital Self-Defense Checklist</span>
          </div>
          <h1 className="display-5 fw-extrabold text-dark mt-1">Essential Online Safety Rules</h1>
          <p className="text-secondary">
            Practical everyday cyber hygiene practices that reduce your risk of falling victim to financial and identity cybercrimes by over 90%.
          </p>
        </div>

        {/* Tips Categories */}
        <div className="row g-4 mb-5">
          {tipCategories.map((cat, idx) => (
            <div key={idx} className="col-lg-6">
              <div className="cyber-card p-4 p-md-5 h-100 shadow-sm">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-3 rounded-4 cyber-card border border-secondary border-opacity-25 shadow-sm">
                    {cat.icon}
                  </div>
                  <h4 className="fw-bold text-heading mb-0">{cat.title}</h4>
                </div>

                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {cat.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="d-flex align-items-start gap-2.5">
                      <div className="bg-success bg-opacity-10 text-success p-1 rounded-circle mt-0.5 flex-shrink-0 border border-success border-opacity-25">
                        <Check size={14} />
                      </div>
                      <span className="text-secondary small leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rule Summary Card */}
        <div className="cyber-card-dark p-4 p-md-5 shadow-lg">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h4 className="fw-bold text-info mb-2">The Golden Rule of Cyber Safety</h4>
              <p className="text-secondary mb-0">
                <strong>Stop, Question, and Verify:</strong> Fraudsters rely on manufactured panic, artificial urgency, or unbelievable rewards. Whenever a digital message demands immediate action, take 5 minutes to verify through official physical channels or telephone numbers printed on official documents.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/quizzes" className="btn btn-info btn-lg rounded-pill px-4 fw-bold text-dark shadow">
                Take Safety Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTipsPage;
