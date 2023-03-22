import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>유효하지 않은 주소입니다. 😥</p>
      <Link to='/' className={styles.btn}>
        홈페이지로 이동하기
      </Link>
    </div>
  );
}
