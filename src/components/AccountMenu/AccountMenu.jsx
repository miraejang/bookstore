import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import styles from './AccountMenu.module.css';

export default function AccountMenu() {
  return (
    <ul>
      <li className={styles.info}>mirae jang</li>
      <li>
        <Link to='mypage'>마이페이지</Link>
      </li>
      <li>
        <FiLogOut />
        로그아웃
      </li>
    </ul>
  );
}
