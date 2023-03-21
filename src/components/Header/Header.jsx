import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBookCover } from 'react-icons/gi';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { isLoading, user, login, logout } = useAuthContext();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to='/' className={styles.logo}>
          <GiBookCover className={styles.icon} />
          <span>Bookstore</span>
        </Link>
      </div>
      <div className={styles.center}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink
                to='books'
                className={`${styles.link} ${({ isActive }) =>
                  isActive ? styles.active : ''}`}
              >
                Books
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.right}>
        {!isLoading && (
          <ul className={styles.userMenu}>
            <li className={styles.cart}>
              <NavLink
                to='cart'
                className={`${styles.link} ${({ isActive }) =>
                  isActive ? styles.active : ''}`}
              >
                <AiOutlineShoppingCart />
              </NavLink>
            </li>
            <li>
              <NavLink
                to='admin'
                className={`${styles.link} ${({ isActive }) =>
                  isActive ? styles.active : ''}`}
              >
                관리자
              </NavLink>
            </li>
            {!user && (
              <li>
                <button onClick={login}>로그인</button>
              </li>
            )}
            {user && (
              <li className={styles.account}>
                <button onClick={handleAccountMenu} className={styles.userImg}>
                  <img src={user.photoURL} alt={user.displayName} />
                </button>
                {accountMenuOpen && (
                  <ul className={styles.accountMenu}>
                    <li className={styles.info}>
                      <div className={styles.userImg}>
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                      {user.displayName}
                    </li>
                    <li className={styles.mypage}>
                      <Link to='mypage'>
                        <FiUser className={styles.icon} />
                        마이페이지
                      </Link>
                    </li>
                    <li className={styles.logout}>
                      <button onClick={logout}>
                        <FiLogOut className={styles.icon} />
                        로그아웃
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
