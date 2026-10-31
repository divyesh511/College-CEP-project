import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 border-top border-secondary mt-auto" style={{ backgroundColor: '#090d16' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand & Purpose */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Shield className="text-info" size={26} />
              <h5 className="mb-0 text-white fw-bold">CyberSafe<span className="text-info">Community</span></h5>
            </div>
            <p className="text-secondary small mb-3">
              A comprehensive digital safety portal built for the <strong>Semester 5 Community Engagement Project (CEP)</strong> in B.Sc. IT. Empowering students, parents, and senior citizens against deceptive online financial and identity scams.
            </p>
            <div className="d-flex align-items-center gap-2 text-warning small">
              <AlertTriangle size={16} />
              <span>Educational Awareness Initiative (Non-Governmental)</span>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Awareness Hub</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/resources" className="text-secondary text-decoration-none hover-info">Articles & Guides</Link></li>
              <li><Link to="/scams" className="text-secondary text-decoration-none hover-info">UPI & QR Fraud</Link></li>
              <li><Link to="/tips" className="text-secondary text-decoration-none hover-info">Password Hygiene</Link></li>
              <li><Link to="/quizzes" className="text-secondary text-decoration-none hover-info">Safety Quizzes</Link></li>
              <li><Link to="/about-cep" className="text-secondary text-decoration-none hover-info">CEP Objectives</Link></li>
            </ul>
          </div>

          {/* Emergency & Official Helplines */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Official Cyber Helplines (India)</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li className="d-flex align-items-center gap-2">
                <PhoneCall size={16} className="text-danger" />
                <span>National Helpline: <strong className="text-white">1930</strong> (Toll-Free)</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <ExternalLink size={16} className="text-info" />
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-none">
                  cybercrime.gov.in
                </a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <ExternalLink size={16} className="text-info" />
                <a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none">
                  sancharsaathi.gov.in (Lost Mobile)
                </a>
              </li>
            </ul>
          </div>

          {/* College Project Disclaimer */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">CEP Fieldwork</h6>
            <div className="p-3 rounded bg-secondary bg-opacity-10 border border-secondary border-opacity-25 small text-secondary">
              This application is designed for conducting pre- and post-awareness surveys and interactive digital safety workshops in local communities.
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <div>
            © {new Date().getFullYear()} CyberSafe Community. Built with React & Spring Boot.
          </div>
          <div className="mt-2 mt-md-0">
            B.Sc. Information Technology – Semester 5 Community Engagement Project
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
