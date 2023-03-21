import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../api/firebase';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import styles from './BooksManagement.module.css';

export default function BooksManagement() {
  const { isLoading, data: books } = useQuery(['books'], () => getBooks());

  const handleDelete = () => {};

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
                <th>아이디</th>
                <th>제목</th>
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
              {books.map((book) => {
                const {
                  id,
                  title,
                  img,
                  author,
                  publish,
                  price,
                  discount,
                  categoryCode,
                  categoryText,
                  createdAt,
                } = book;

                return (
                  <tr className={styles.row} key={id}>
                    <td>
                      <input type='checkbox' name={id} id={id} />
                    </td>
                    <td>
                      <img src={img} alt={title} className={styles.img} />
                    </td>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{publish}</td>
                    <td>{price.toLocaleString()}원</td>
                    <td>
                      {discount && (
                        <>
                          <p>{discount}%</p>
                          <p>
                            {(
                              price *
                              ((100 - book.discount) / 100)
                            ).toLocaleString()}
                            원
                          </p>
                        </>
                      )}
                    </td>
                    <td>
                      {categoryText}({categoryCode})
                    </td>
                    <td>{new Date(createdAt).toLocaleString('ko-KR')}</td>
                    <td className={styles.edit}>
                      <div className={styles.editBox}>
                        <button className={styles.editBtn}>
                          <BiEditAlt />
                        </button>
                        <button
                          onClick={handleDelete}
                          className={styles.deleteBtn}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
