import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, PhoneCall, Award, Users, Lock } from 'lucide-react';
import { articleService } from '../../services/articleService';
import ThreatBadge from '../../components/common/ThreatBadge';

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await articleService.getPublishedArticles(null, '', 0, 3);
        if (res.success && res.data?.content) {
          setFeaturedArticles(res.data.content);
        }
      } catch (err) {
        console.error('Error fetching featured articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5 position-relative overflow-hidden">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-dark bg-opacity-60 border border-info border-opacity-40 text-info mb-3">
                <Shield size={16} />
                <span className="small fw-semibold">Semester 5 Community Engagement Project (CEP) • B.Sc. IT</span>
              </div>
              <h1 className="display-4 fw-extrabold mb-3 text-white">
                Defend Your Community Against <span className="text-info">Digital Frauds & Cyber Scams</span>
              </h1>
              <p className="lead text-light mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
                A proactive community learning platform helping students, senior citizens, and families recognize deceptive UPI payment tricks, phishing traps, and social engineering attacks before financial loss occurs.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/quizzes" className="btn btn-cyber-primary btn-lg d-flex align-items-center gap-2 px-4 shadow">
                  <CheckCircle size={20} />
                  <span>Test Your Scam Instincts</span>
                </Link>
                <Link to="/resources" className="btn btn-cyber-outline btn-lg d-flex align-items-center gap-2 px-4 text-white border-light">
                  <BookOpen size={20} />
                  <span>Browse Safety Guides</span>
                </Link>
              </div>

              {/* Awareness Stat Badges */}
              <div className="row g-3 mt-4 pt-2">
                <div className="col-4">
                  <div className="border-start border-2 border-info ps-3">
                    <h3 className="fw-bold mb-0 text-white">100%</h3>
                    <small className="text-light opacity-75">Free Community Education</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-start border-2 border-info ps-3">
                    <h3 className="fw-bold mb-0 text-white">1930</h3>
                    <small className="text-light opacity-75">National Cyber Helpline</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-start border-2 border-info ps-3">
                    <h3 className="fw-bold mb-0 text-white">6 Modules</h3>
                    <small className="text-light opacity-75">Aligned to CEP Topics</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Urgent Alert Card */}
            <div className="col-lg-5">
              <div className="cyber-card p-4 shadow-lg border-2 border-danger border-opacity-50">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 py-1.5 rounded-pill fw-bold d-flex align-items-center gap-1.5">
                    <AlertTriangle size={15} />
                    <span>CRITICAL SCAM WARNING</span>
                  </span>
                  <span className="small text-muted">Daily Advisory</span>
                </div>

                <h5 className="fw-bold text-dark mb-2">The Golden Rule of UPI Transactions</h5>
                <p className="text-secondary small mb-3">
                  Scammers pose as eager buyers on OLX, WhatsApp, or Facebook Marketplace and claim you must scan a QR code and type your UPI PIN to claim money.
                </p>

                <div className="alert alert-danger py-2.5 px-3 mb-3 small d-flex align-items-start gap-2">
                  <Lock size={18} className="flex-shrink-0 mt-0.5 text-danger" />
                  <div>
                    <strong>Remember:</strong> Entering your UPI PIN is <em>strictly</em> for <strong>debiting (sending) money</strong>. Receiving money never requires a PIN or scanning QR codes.
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light border">
                  <div>
                    <div className="small text-muted fw-semibold">Victim of financial cybercrime?</div>
                    <div className="fs-5 fw-bold text-danger d-flex align-items-center gap-2">
                      <PhoneCall size={18} />
                      <span>Call 1930 Immediately</span>
                    </div>
                  </div>
                  <span className="badge bg-danger rounded-pill px-3 py-1.5">Toll-Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 CEP Core Pillars Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-info fw-bold small text-uppercase tracking-wide">Community Engagement Modules</span>
            <h2 className="fw-bold mt-1">Our Core Cyber Awareness Programs</h2>
            <p className="text-muted">
              Built systematically according to the syllabus requirements of the B.Sc. IT Semester 5 Community Engagement Project.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <AlertTriangle size={28} />
                </div>
                <h5 className="fw-bold mb-2">Phishing & Fraud Detection</h5>
                <p className="text-muted small flex-grow-1">
                  Techniques to spot fake bank KYC messages, electricity bill suspension threats, and suspicious lottery links.
                </p>
                <Link to="/scams" className="text-info fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Learn detection methods</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <Shield size={28} />
                </div>
                <h5 className="fw-bold mb-2">UPI & Payment Hygiene</h5>
                <p className="text-muted small flex-grow-1">
                  Practical guidelines to safeguard digital wallets, Google Pay, PhonePe, and protect against fake refund scams.
                </p>
                <Link to="/resources" className="text-warning fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Explore payment safety</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <Lock size={28} />
                </div>
                <h5 className="fw-bold mb-2">Password & Data Privacy</h5>
                <p className="text-muted small flex-grow-1">
                  Why simple passwords fail, how to construct memorable passphrases, and enabling Two-Factor Authentication (2FA).
                </p>
                <Link to="/tips" className="text-success fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Review password habits</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <CheckCircle size={28} />
                </div>
                <h5 className="fw-bold mb-2">Interactive Cyber Quizzes</h5>
                <p className="text-muted small flex-grow-1">
                  Real scenario-based multiple-choice quizzes evaluated on the server with immediate score reports and educational guidance.
                </p>
                <Link to="/quizzes" className="text-primary fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Take a free quiz</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <Users size={28} />
                </div>
                <h5 className="fw-bold mb-2">Child & Adolescent Safety</h5>
                <p className="text-muted small flex-grow-1">
                  Guiding students on cyberbullying, gaming lobbies, privacy settings, and responsible internet citizenship.
                </p>
                <Link to="/resources" className="text-danger fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Read youth guidance</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="cyber-card p-4 h-100 d-flex flex-column">
                <div className="bg-info bg-opacity-10 text-info p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
                  <HelpCircle size={28} />
                </div>
                <h5 className="fw-bold mb-2">Community Helpdesk</h5>
                <p className="text-muted small flex-grow-1">
                  Got a suspicious text or offer? Submit your question to community moderators and track expert advice securely.
                </p>
                <Link to="/helpdesk/submit" className="text-info fw-bold small text-decoration-none d-flex align-items-center gap-1 mt-2">
                  <span>Submit an inquiry</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Educational Articles */}
      <section className="py-5 bg-page border-top border-bottom">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
              <span className="text-info fw-bold small text-uppercase">Educational Resources</span>
              <h2 className="fw-bold mt-1">Featured Safety Guides & Scam Alerts</h2>
            </div>
            <Link to="/resources" className="btn btn-outline-dark btn-sm rounded-pill px-3 mt-3 mt-md-0 d-inline-flex align-items-center gap-1">
              <span>View All Articles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {featuredArticles.map((article) => (
              <div key={article.id} className="col-lg-4 col-md-6">
                <div className="cyber-card p-4 h-100 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small">
                      {article.categoryName}
                    </span>
                    <ThreatBadge level={article.threatLevel} />
                  </div>
                  <h5 className="fw-bold mb-2 text-dark line-clamp-2">
                    <Link to={`/articles/${article.slug}`} className="text-dark text-decoration-none hover-info">
                      {article.title}
                    </Link>
                  </h5>
                  <p className="text-secondary small flex-grow-1 line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto small text-muted">
                    <span>By {article.authorName}</span>
                    <Link to={`/articles/${article.slug}`} className="text-info fw-bold text-decoration-none d-flex align-items-center gap-1">
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Engagement Workshop Banner */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-2 text-white">Conducting an Awareness Workshop in Your Community?</h3>
              <p className="text-light opacity-75 mb-0">
                Use our interactive quizzes to conduct baseline surveys before your demonstration, and follow-up surveys after your session to measure genuine awareness improvements.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/about-cep" className="btn btn-info btn-lg fw-bold text-dark px-4 shadow">
                Explore Fieldwork Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
