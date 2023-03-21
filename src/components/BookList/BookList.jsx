import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { useLocation } from 'react-router-dom';
import styles from './BookList.module.css';
import AdminBookCard from '../AdminBookCard/AdminBookCard';

export default function BookList() {
  const [books, setBooks] = useState();
  const { pathname } = useLocation();
  const page =
    pathname && pathname === '/'
      ? 'main'
      : pathname.replace(/^\/([\w,-]+)\/?(?:[\w,-]+)?/, '$1');

  useEffect(() => {
    axios.get('/data/books.json').then((res) => setBooks(res.data.books));
  }, []);

  return (
    <>
      {page && (
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
