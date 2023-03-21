import React from 'react';

import useBooks from '../../hooks/useBooks';
import BookRow from '../BookRow/BookRow';

import styles from './BooksManagement.module.css';

export default function BooksManagement() {
  const {
    booksQuery: { isLoading, data: books },
  } = useBooks();

  return (
    <>
      {!isLoading && (
        <>
          <div className={styles.box}>
            <button className={styles.all}>전체 선택</button>
            <button className={styles.delete}>선택 삭제</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>선택</th>
                <th>이미지</th>
                <th>
                  <p>아이디</p>
                  <p>제목</p>
                </th>
                <th>작가</th>
                <th>출판사</th>
                <th>가격</th>
                <th>할인</th>
                <th>분류</th>
                <th>등록일</th>
                <th>편집</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookRow book={book} key={book.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
