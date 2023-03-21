import React from 'react';
import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { removeBook } from '../../api/firebase';
import styles from './AdminBookCard.module.css';

export default function AdminBookCard({ book }) {
  const {
    id,
    title,
    img,
    author,
    publish,
    price,
    discount,
    createdAt,
    categoryText,
  } = book;

  const handleDelete = () => {
    removeBook(id);
  };

  return (
    <>
      <li className={styles.bookBox}>
        <div className={styles.checkbox}>
          <input type='checkbox' name={id} id={id} />
        </div>
        <div className={styles.img}>
          <div className={styles.viewBox}>
            <img src={img} alt={title} />
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <Link
              to={`/books/${id}`}
              state={{ book }}
              className={styles.link}
              target='_blank'
            >
              상세페이지 보기
            </Link>
          </div>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>제목</th>
                <td>{title}</td>
              </tr>
              <tr>
                <th>작가</th>
                <td>{author}</td>
              </tr>
              <tr>
                <th>출판사</th>
                <td>{publish}</td>
              </tr>
              <tr>
                <th>가격</th>
                <td>{price.toLocaleString()}원</td>
              </tr>
              <tr>
                <th>할인</th>
                <td>
                  <p>
                    <b>할인율 : </b>
                    {discount}%
                  </p>

                  <p>
                    <b>할인가 : </b>
                    {(price * ((100 - book.discount) / 100)).toLocaleString()}원
                  </p>
                </td>
              </tr>
              <tr>
                <th>분류</th>
                <td>{categoryText}</td>
              </tr>
              <tr>
                <th>등록일</th>
                <td>{new Date(createdAt).toLocaleString('ko-KR')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.editBox}>
          <button className={styles.editBtn}>
            <BiEditAlt />
          </button>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            <BiTrash />
          </button>
        </div>
      </li>
    </>
  );
}
