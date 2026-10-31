import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';

const ThreatBadge = ({ level = 'MEDIUM', className = '' }) => {
  const norm = (level || 'MEDIUM').toUpperCase();

  switch (norm) {
    case 'CRITICAL':
      return (
        <span className={`badge threat-badge-critical d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill ${className}`}>
          <ShieldAlert size={14} />
          <span>CRITICAL THREAT</span>
        </span>
      );
    case 'HIGH':
      return (
        <span className={`badge threat-badge-high d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill ${className}`}>
          <AlertTriangle size={14} />
          <span>HIGH RISK</span>
        </span>
      );
    case 'LOW':
      return (
        <span className={`badge threat-badge-low d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill ${className}`}>
          <ShieldCheck size={14} />
          <span>LOW RISK</span>
        </span>
      );
    case 'MEDIUM':
    default:
      return (
        <span className={`badge threat-badge-medium d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill ${className}`}>
          <AlertCircle size={14} />
          <span>MODERATE RISK</span>
        </span>
      );
  }
};

export default ThreatBadge;
