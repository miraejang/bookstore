import React from 'react';
import BookList from '../../components/BookList/BookList';
import styles from './Books.module.css';

export default function Books() {
  return (
    <>
      <h2 className='pageTitle'>Books</h2>
      <div className={styles.books}>
        <BookList />
      </div>
    </>
  );
}
