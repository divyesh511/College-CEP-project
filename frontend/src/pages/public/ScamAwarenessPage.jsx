import React from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, CheckCircle, XCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScamAwarenessPage = () => {
  const scams = [
    {
      id: 'upi-qr',
      title: '1. The Fake Buyer "Scan QR Code to Receive Money" Scam',
      badge: 'CRITICAL FINANCIAL THREAT',
      badgeColor: 'danger',
      description: 'Fraudsters browse second-hand portals (OLX, Quikr, Facebook Marketplace). They pretend to be military personnel or distant buyers eager to purchase your item without bargaining.',
      script: '"I am sending you ₹5,000 advance on Google Pay. Please scan this QR code and input your 4-digit PIN to receive the funds in your bank."',
      reality: 'Scanning a QR code and entering your UPI PIN authorizes a DEBIT (deduction) from your bank account. Receiving money NEVER requires entering your PIN.',
      action: 'Immediately cancel the transaction. Block the buyer. Never enter your UPI PIN unless you intend to pay money.'
    },
    {
      id: 'electricity-bill',
      title: '2. Urgent Electricity & SIM Card Suspension Smishing',
      badge: 'HIGH PSYCHOLOGICAL PANIC TRAP',
      badgeColor: 'warning',
      description: 'Victims receive an SMS in the evening threatening that power or telecom services will be disconnected within hours due to "unpaid bills" or "pending KYC".',
      script: '"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from electricity office because previous month bill was not updated. Please immediately contact electricity officer 98XXXXXX."',
      reality: 'Utility companies and telecom providers send official bills with consumer numbers, not emergency suspension warnings with personal mobile numbers.',
      action: 'Never call numbers listed in unsolicited SMS messages. Verify your bill status strictly through the official utility app or physical counter.'
    },
    {
      id: 'remote-access',
      title: '3. Remote Screen-Sharing App Fraud (AnyDesk / TeamViewer)',
      badge: 'CRITICAL DEVICE TAKEOVER',
      badgeColor: 'danger',
      description: 'Scammers pretend to be bank executives, courier customer care, or technical support offering a "quick refund" or "KYC fix".',
      script: '"Sir, please download AnyDesk or RustDesk from the Play Store so our technical team can help verify your pending refund."',
      reality: 'Screen-sharing software gives the scammer full remote visibility and control of your mobile screen, allowing them to read OTPs and access banking apps.',
      action: 'Never install remote desktop apps at the request of callers. Legitimate bank representatives will never ask you to install third-party screen apps.'
    },
    {
      id: 'task-fraud',
      title: '4. The "Work From Home" YouTube Like & Hotel Review Scam',
      badge: 'HIGH EXTORTION RISK',
      badgeColor: 'warning',
      description: 'Unsolicited WhatsApp or Telegram messages offering ₹2,000 - ₹5,000 per day for liking YouTube videos, rating Google Maps locations, or reviewing hotels.',
      script: '"Complete task 1 and earn ₹150 instantly in your UPI account. Join our VIP Telegram channel for higher payouts."',
      reality: 'Scammers pay small initial amounts to build trust, then demand "deposits" of ₹10,000 to ₹1,00,000 to unlock fake earnings that can never be withdrawn.',
      action: 'Legitimate corporate jobs never demand upfront security deposits or operate exclusively via anonymous Telegram groups.'
    }
  ];

  return (
    <div className="py-5 bg-page min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-10 text-danger fw-bold small mb-2 border border-danger border-opacity-25">
            <ShieldAlert size={16} />
            <span>Community Scam Defense Advisory</span>
          </div>
          <h1 className="display-5 fw-extrabold text-dark mt-1">Recognizing Digital Scams in India</h1>
          <p className="text-secondary">
            A comprehensive breakdown of the most prevalent social engineering attacks targeting students and families today.
          </p>
        </div>

        {/* Emergency Alert Box */}
        <div className="cyber-card p-4 mb-5 border-2 border-danger border-opacity-50 shadow-sm">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <h5 className="fw-bold text-danger mb-1 d-flex align-items-center gap-2">
                <AlertTriangle size={20} />
                <span>Financial Fraud Golden Hour Rule</span>
              </h5>
              <p className="text-secondary small mb-0">
                If you have accidentally transferred money or entered your UPI PIN to a scammer, <strong>report within the first 2-3 hours</strong>. The National Cyber Crime Reporting Portal can coordinate with banks to freeze the scammer's beneficiary account before withdrawal.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a href="tel:1930" className="btn btn-danger btn-lg rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-2 shadow">
                <PhoneCall size={20} />
                <span>Dial 1930 Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scams Detailed Breakdown */}
        <div className="row g-4 mb-5">
          {scams.map((scam) => (
            <div key={scam.id} className="col-12">
              <div className="cyber-card p-4 p-md-5 shadow-sm">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <h4 className="fw-bold text-heading mb-0">{scam.title}</h4>
                  <span className={`badge bg-${scam.badgeColor} bg-opacity-10 text-${scam.badgeColor} border border-${scam.badgeColor} px-3 py-1.5 rounded-pill fw-bold small`}>
                    {scam.badge}
                  </span>
                </div>

                <p className="text-secondary mb-4">{scam.description}</p>

                <div className="row g-4">
                  {/* The Bait Script */}
                  <div className="col-md-4">
                    <div className="p-3 rounded-4 h-100 cyber-card">
                      <h6 className="fw-bold text-danger d-flex align-items-center gap-1.5 mb-2">
                        <XCircle size={16} />
                        <span>The Fraudster's Script</span>
                      </h6>
                      <p className="small text-secondary fst-italic mb-0">{scam.script}</p>
                    </div>
                  </div>

                  {/* The Reality */}
                  <div className="col-md-4">
                    <div className="p-3 rounded-4 h-100 cyber-card">
                      <h6 className="fw-bold text-heading d-flex align-items-center gap-1.5 mb-2">
                        <AlertTriangle size={16} className="text-warning" />
                        <span>The Underlying Reality</span>
                      </h6>
                      <p className="small text-secondary mb-0">{scam.reality}</p>
                    </div>
                  </div>

                  {/* Defense Action */}
                  <div className="col-md-4">
                    <div className="p-3 bg-success bg-opacity-10 rounded-4 h-100 border border-success border-opacity-30">
                      <h6 className="fw-bold text-success d-flex align-items-center gap-1.5 mb-2">
                        <CheckCircle size={16} />
                        <span>Safe Action To Take</span>
                      </h6>
                      <p className="small text-heading mb-0">{scam.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Quiz */}
        <div className="cyber-card p-5 text-center bg-dark text-white border-secondary">
          <h3 className="fw-bold mb-3 text-white">Think You Can Spot Every Scam?</h3>
          <p className="text-light opacity-75 max-w-600 mx-auto mb-4">
            Test your real-world instincts in our interactive simulation. Our quizzes evaluate realistic scenarios without revealing answers until server submission.
          </p>
          <Link to="/quizzes" className="btn btn-info btn-lg fw-bold text-dark px-4 rounded-pill">
            Take the Cyber Safety Quiz Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScamAwarenessPage;
