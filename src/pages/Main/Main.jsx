import React from 'react';
import { GiBookCover } from 'react-icons/gi';
import BookList from '../../components/BookList/BookList';
import styles from './Main.module.css';

export default function Main() {
  return (
    <>
      <h1 className={styles.siteTitle}>
        <GiBookCover className={styles.icon} />
        <span>Bookstore</span>
      </h1>
      <BookList />
    </>
  );
}
