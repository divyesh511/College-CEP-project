import React from 'react';

const LoadingSpinner = ({ message = 'Loading CyberSafe data...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center my-4">
      <div className="spinner-border text-info mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-semibold small mb-0">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
