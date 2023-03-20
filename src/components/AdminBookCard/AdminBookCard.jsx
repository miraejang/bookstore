import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import axios from 'axios';
import styles from './AdminBookCard.module.css';

export default function AdminBookCard({ book }) {
  const { id, title, img, author, desc, createdAt, category } = book;
  const [categoryList, setCategoryList] = useState();
  const [descOpen, setDescOpen] = useState(false);

  useEffect(() => {
    axios.get('/data/category.json').then((res) => setCategoryList(res.data));
  }, []);

  const handleDesc = () => {
    setDescOpen((prev) => !prev);
  };
  const dateToString = (date) => {
    const d = new Date(Number(date));
    return d.toLocaleString('ko-KR');
  };

  return (
    <>
      <li className={`${styles.bookBox}`}>
        <input type='checkbox' name='' id='' className={styles.checkbox} />
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
                <td>{dateToString(createdAt)}</td>
              </tr>
              <tr className={styles.desc}>
                <th>설명</th>
                <td>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.editBox}>
          <button className={styles.editBtn}>
            <BiEditAlt />
          </button>
          <button className={styles.deleteBtn}>
            <BiTrash />
          </button>
        </div>
      </li>
    </>
  );
}
