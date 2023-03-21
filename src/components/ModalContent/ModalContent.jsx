import React from 'react';
import styles from './ModalContent.module.css';

export default function ModalContent({ onClose, message, btnText = '확인' }) {
  return (
    <div className={styles.modalContent}>
      <p>{message}</p>
      <button onClick={onClose}>{btnText}</button>
    </div>
  );
}
