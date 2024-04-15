import React from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

export const Modal = React.memo(({ children, visible, onClose }) => {
  const handleOnCloseModal = React.useCallback(() => {
    return onClose();
  }, [onClose]);

  if (!visible) return null;
  const portal = document.getElementById('portal');
  return createPortal((
    <div className="modal-background">
      <div className="modal-content">
        <span
          className='material-symbols-outlined btn-close-modal'
          onClick={handleOnCloseModal}
        >
          close
        </span>
        {children}
      </div>
    </div>
  ), portal);
}, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children && prevProps.visible === nextProps.visible;
});