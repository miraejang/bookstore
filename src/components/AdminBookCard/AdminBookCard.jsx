import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { getCategory, removeBook } from '../../api/firebase';
import { useQuery } from '@tanstack/react-query';
import styles from './AdminBookCard.module.css';

export default function AdminBookCard({ book }) {
  const { id, title, img, author, desc, createdAt, category } = book;
  const { data: categoryList } = useQuery(['category'], () => getCategory());
  const [descOpen, setDescOpen] = useState(false);

  const handleDesc = () => {
    setDescOpen((prev) => !prev);
  };
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
                <th>분류</th>
                <td>{categoryList && categoryList[category]}</td>
              </tr>
              <tr>
                <th>등록일</th>
                <td>{new Date(createdAt).toLocaleString('ko-KR')}</td>
              </tr>
              <tr className={styles.desc}>
                <th>소개글</th>
                <td>
                  {desc && (
                    <>
                      <pre
                        className={`${styles.pre} ${
                          descOpen ? styles.open : styles.fold
                        }`}
                      >
                        {desc}
                      </pre>
                      <button className={styles.descBtn} onClick={handleDesc}>
                        {descOpen ? (
                          <>
                            <BsChevronUp className={styles.icon} /> 접기
                          </>
                        ) : (
                          <>
                            <BsChevronDown className={styles.icon} /> 전체 보기
                          </>
                        )}
                      </button>
                    </>
                  )}
                </td>
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
