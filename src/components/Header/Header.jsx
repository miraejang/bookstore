import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBookCover } from 'react-icons/gi';
import { FiUser, FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';
import { login, logout, onAuthStateChange } from '../../api/firebase';

export default function Header() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  const handleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };
  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout();
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
        {!user && (
          <li>
            <button onClick={handleLogin}>로그인</button>
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
                  <button onClick={handleLogout}>
                    <FiLogOut className={styles.icon} />
                    로그아웃
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </header>
  );
}
