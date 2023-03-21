import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

export default function Admin() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/admin') {
      navigate('books-management');
    }
  }, [pathname, navigate]);

  return (
    <>
      <ul className={styles.lnb}>
        <li>
          <NavLink
            to='books-management'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <span>도서 관리</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='add-book'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <span>도서 추가</span>
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
