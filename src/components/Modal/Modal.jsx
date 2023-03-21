import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return (
    <>
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.top}>
              <button onClick={onClose} className={styles.closeBtn}>
                ×
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
