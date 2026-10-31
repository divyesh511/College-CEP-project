import React from 'react';
import { Shield, Target, Users, BookOpen, CheckSquare, Award, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCepPage = () => {
  return (
    <div className="py-5 bg-page">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-800 mx-auto mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-info bg-opacity-10 text-info fw-bold small mb-2 border border-info border-opacity-25">
            <Shield size={16} />
            <span>Academic Project Specification</span>
          </div>
          <h1 className="display-5 fw-extrabold text-dark">
            Community Engagement Project (CEP)
          </h1>
          <p className="lead text-secondary">
            B.Sc. Information Technology • Semester 5 Community Engagement Project on Cyber Crime Awareness and Digital Safety Education.
          </p>
        </div>

        {/* Project Abstract & Aim */}
        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <div className="cyber-card p-4 h-100">
              <div className="d-flex align-items-center gap-2.5 text-info mb-3">
                <Target size={24} />
                <h4 className="fw-bold mb-0 text-dark">Aim & Purpose</h4>
              </div>
              <p className="text-secondary leading-relaxed">
                The primary aim of the <strong>CyberSafe Community</strong> portal is to bridge the critical digital literacy and fraud awareness gap among local community members—specifically <strong>college students, senior citizens, and first-time digital payment users</strong>.
              </p>
              <p className="text-secondary leading-relaxed mb-0">
                Rather than remaining a theoretical seminar, this initiative provides an interactive, accessible software solution where users can learn scam indicators, practice with realistic simulated quizzes, and ask questions to knowledgeable peer mentors.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="cyber-card p-4 h-100">
              <div className="d-flex align-items-center gap-2.5 text-danger mb-3">
                <Shield size={24} />
                <h4 className="fw-bold mb-0 text-dark">Problem Statement</h4>
              </div>
              <p className="text-secondary leading-relaxed">
                The rapid adoption of Unified Payments Interface (UPI) and smartphone banking in India has been accompanied by a surge in financial fraud. Scammers exploit psychological urgency—such as fake electricity disconnections, fake buyer advance payments, and fraudulent job offers.
              </p>
              <p className="text-secondary leading-relaxed mb-0">
                Most victims fall prey not due to technical computer breaches, but due to <strong>social engineering</strong> and misunderstandings regarding how UPI PINs and remote access apps operate.
              </p>
            </div>
          </div>
        </div>

        {/* Syllabus Alignment Table */}
        <div className="cyber-card p-4 p-md-5 mb-5 shadow-sm">
          <div className="d-flex align-items-center gap-2.5 text-primary mb-3">
            <BookOpen size={24} />
            <h3 className="fw-bold mb-0 text-dark">College CEP Syllabus Topic Mapping</h3>
          </div>
          <p className="text-secondary mb-4">
            How each component in the <strong>CyberSafe Community</strong> web application maps directly to the university CEP topic list:
          </p>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '35%' }}>University CEP Topic</th>
                  <th scope="col">Application Implementation & Module</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-dark">1. Cybercrime Awareness & Prevention Workshops</td>
                  <td className="text-secondary">
                    Structured resource catalog with categorized articles, scam indicators, and downloadable guidance.
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-dark">2. Phishing, Scam and Fraud Detection Program</td>
                  <td className="text-secondary">
                    Dedicated Scam Awareness alerts analyzing deceptive SMS (Smishing), bank KYC warnings, and malicious APK files.
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-dark">3. Password Hygiene & Personal Data Protection</td>
                  <td className="text-secondary">
                    Guidelines for passphrase creation, Two-Factor Authentication (2FA), and secure credential updates.
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-dark">4. Cyber Ethics & Responsible Internet Usage</td>
                  <td className="text-secondary">
                    Educational modules on digital footprints, verifying news before forwarding, and IT Act responsibilities.
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-dark">5. Online Safety for Children and Adolescents</td>
                  <td className="text-secondary">
                    Safe gaming lobbies advice, cyberbullying mitigation, and privacy settings for underage internet users.
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-dark">6. Community Helpdesk for Cyber Safety Queries</td>
                  <td className="text-secondary">
                    Interactive helpdesk ticket system with status tracking (<code>PENDING</code> ➔ <code>IN_PROGRESS</code> ➔ <code>RESOLVED</code>) and expert administrator advice.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Suggested Fieldwork Plan */}
        <div className="cyber-card p-4 p-md-5 mb-5 border-info border-opacity-40">
          <div className="d-flex align-items-center gap-2.5 text-info mb-3">
            <Users size={24} />
            <h3 className="fw-bold mb-0 text-heading">Suggested Student Fieldwork & Survey Methodology</h3>
          </div>
          <p className="text-secondary mb-4">
            For your semester CEP report documentation, follow this structured 4-step fieldwork process:
          </p>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="p-3 rounded-4 h-100 cyber-card">
                <div className="fw-bold text-info mb-1">Step 1: Pre-Survey</div>
                <h6 className="fw-bold text-heading">Baseline Awareness Test</h6>
                <p className="small text-muted mb-0">
                  Ask 20-30 community participants (neighbors, relatives, students) questions about UPI PIN rules and KYC messages. Record baseline knowledge gaps.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 rounded-4 h-100 cyber-card">
                <div className="fw-bold text-info mb-1">Step 2: Demonstration</div>
                <h6 className="fw-bold text-heading">Interactive Portal Workshop</h6>
                <p className="small text-muted mb-0">
                  Demonstrate the CyberSafe Community portal on laptop or projector. Walk through real scam screenshots and the UPI Golden Rule.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 rounded-4 h-100 cyber-card">
                <div className="fw-bold text-info mb-1">Step 3: Hands-On Quiz</div>
                <h6 className="fw-bold text-heading">Server-Scored Assessment</h6>
                <p className="small text-muted mb-0">
                  Have participants take the online quiz on their phones or terminals. The server automatically tallies points and reveals explanations.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 rounded-4 h-100 cyber-card">
                <div className="fw-bold text-info mb-1">Step 4: Report Impact</div>
                <h6 className="fw-bold text-heading">Aggregate Comparison</h6>
                <p className="small text-muted mb-0">
                  Compare pre- and post-scores in your CEP project report. Highlight the percentage increase in participants who can spot QR payment tricks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-top text-center">
            <Link to="/quizzes" className="btn btn-cyber-primary px-4 rounded-pill">
              Explore Demonstration Quizzes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCepPage;
