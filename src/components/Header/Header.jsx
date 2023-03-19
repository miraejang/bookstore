import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBookCover } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleClick = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <GiBookCover className={styles.icon} />
        <span>Bookstore</span>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to='books'>Books</NavLink>
          </li>
        </ul>
      </nav>
      <ul className={styles.userMenu}>
        <li className={styles.cart}>
          <NavLink to='cart'>
            <AiOutlineShoppingCart />
          </NavLink>
        </li>
        <li>
          <NavLink to='admin'>관리자</NavLink>
        </li>
        <li>
          <button>로그인</button>
        </li>
        <li className={styles.account}>
          <button onClick={handleClick}>j</button>
          {accountMenuOpen && (
            <ul>
              <li className={styles.info}>mirae jang</li>
              <li>
                <Link to='mypage'>마이페이지</Link>
              </li>
              <li className={styles.logout}>
                <button>
                  <FiLogOut className={styles.icon} />
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </header>
  );
}
