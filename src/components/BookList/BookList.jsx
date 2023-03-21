import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../api/firebase';
import AdminBookCard from '../AdminBookCard/AdminBookCard';
import BookCard from '../BookCard/BookCard';
import Loading from '../Loading/Loading';
import styles from './BookList.module.css';

export default function BookList() {
  const { isLoading, data: books } = useQuery(['books'], () => getBooks());
  const { pathname } = useLocation();
  const page =
    pathname && pathname === '/'
      ? 'main'
      : pathname.replace(/^\/([\w,-]+)\/?(?:[\w,-]+)?/, '$1');

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && page && (
        <ul
          className={`${styles.listBox} ${
            page === 'main' ? styles.grid : styles.list
          } ${styles[page]}`}
        >
          {books &&
            Object.values(books).map((book) => {
              if (page === 'admin') {
                return <AdminBookCard book={book} key={book.id} />;
              } else {
                return (
                  <BookCard
                    book={book}
                    type={pathname === '/' ? 'grid' : 'list'}
                    page={page}
                    key={book.id}
                  />
                );
              }
            })}
        </ul>
      )}
    </>
  );
}
