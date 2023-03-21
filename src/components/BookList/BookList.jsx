import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategory } from '../../api/firebase';
import { useQuery } from '@tanstack/react-query';
import useBooks from '../../hooks/useBooks';
import AdminBookCard from '../AdminBookCard/AdminBookCard';
import BookCard from '../BookCard/BookCard';
import Loading from '../Loading/Loading';
import styles from './BookList.module.css';

export default function BookList() {
  const {
    booksQuery: { isLoading, data: books },
  } = useBooks();
  const { data: categoryList } = useQuery(['category'], () => getCategory());
  const { pathname } = useLocation();
  const page =
    pathname && pathname === '/'
      ? 'main'
      : pathname.replace(/^\/([\w,-]+)\/?(?:[\w,-]+)?/, '$1');
  const [filter, setFilter] = useState('all');
  const [filteredList, setFilteredList] = useState();

  useEffect(() => {
    setFilteredList(books);
  }, [books]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const handleList = () => {
    if (filter === 'all') {
      setFilteredList(filter);
    } else {
      const filtered = books.filter((book) => book.categoryCode === filter);
      setFilteredList(filtered);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && page && (
        <>
          <div className={styles.filterBox}>
            <p className={styles.count}>총 {filteredList && filteredList.length.toLocaleString()} 건</p>
            <select
              onChange={handleFilter}
              name='category'
              id='category'
              className={styles.select}
            >
              <option value='all'>전체 보기</option>
              {Object.keys(categoryList).map((code) => (
                <option value={code} key={code}>
                  {categoryList[code]}
                </option>
              ))}
            </select>
            <button onClick={handleList} className={styles.searchBtn}>
              검색
            </button>
          </div>
          <ul
            className={`${styles.listBox} ${
              page === 'main' ? styles.grid : styles.list
            } ${styles[page]}`}
          >
            {filteredList &&
              Object.values(filteredList).map((book) => {
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
        </>
      )}
    </>
  );
}
