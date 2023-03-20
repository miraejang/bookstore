import React from 'react';
import BookList from '../BookList/BookList';
import styles from './BooksManagement.module.css';

export default function BooksManagement() {
  return (
    <>
      <div className={styles.box}>
        <button className={styles.all}>전체 선택</button>
        <button className={styles.delete}>선택 삭제</button>
      </div>
      <BookList />
    </>
  );
}
