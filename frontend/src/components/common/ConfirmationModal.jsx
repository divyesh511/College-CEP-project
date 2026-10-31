import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({
  show,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title d-flex align-items-center gap-2 fw-bold text-dark">
              <AlertTriangle className={`text-${confirmVariant}`} size={20} />
              <span>{title}</span>
            </h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body py-3 text-secondary">
            {message}
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-light rounded-pill px-3" onClick={onCancel}>
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant} rounded-pill px-4 fw-semibold`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
