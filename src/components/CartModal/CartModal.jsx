import React from 'react';
import styles from './CartModal.module.css'

export default function CartModal({ onClose }) {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>이미 장바구니에 있는 상품입니다.</p>
      <button onClick={onClose} className={styles.checkBtn}>확인</button>
    </div>
  );
}
