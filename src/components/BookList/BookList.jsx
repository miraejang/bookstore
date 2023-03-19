import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { useLocation } from 'react-router-dom';
import styles from './BookList.module.css';

export default function BookList() {
  const [books, setBooks] = useState();
  const { pathname } = useLocation();
  const page =
    pathname && pathname === '/' ? 'main' : pathname.replace(/^\//, '');

  useEffect(() => {
    axios.get('/data/books.json').then((res) => setBooks(res.data.books));
  }, []);

  return (
    <>
      {page && (
        <ul
          className={`${styles.listBox} ${page === 'main' && styles.grid} ${
            styles[page]
          }`}
        >
          {books &&
            books.map((book) => (
              <BookCard
                book={book}
                type={pathname === '/' ? 'grid' : 'list'}
                key={book.id}
              />
            ))}
        </ul>
      )}
    </>
  );
}