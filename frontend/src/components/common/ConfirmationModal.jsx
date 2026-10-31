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
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-4">
          <div className="modal-header border-bottom pb-3">
            <h5 className="modal-title d-flex align-items-center gap-2 fw-bold text-heading">
              <AlertTriangle className={`text-${confirmVariant}`} size={20} />
              <span>{title}</span>
            </h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
          </div>
          <div className="modal-body py-4 text-secondary">
            {message}
          </div>
          <div className="modal-footer border-top pt-3">
            <button type="button" className="btn btn-outline-light rounded-pill px-3.5" onClick={onCancel}>
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant} rounded-pill px-4 fw-semibold shadow-sm`}
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
