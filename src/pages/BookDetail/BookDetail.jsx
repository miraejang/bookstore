import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import styles from './BookDetail.module.css';
import { getBook } from '../../api/firebase';

export default function BookDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    if (!state) {
      getBook(id).then(setBook);
    }
  }, [id]);

  return (
    <div className={styles.detail}>
      {book && (
        <>
          <div className={styles.top}>
            <div className={styles.right}>
              <img src={book.img} alt={book.title} className={styles.img} />
            </div>
            <div className={styles.left}>
              <h3 className={styles.title}>{book.title}</h3>
              <p className={styles.author}>{book.author}</p>
              <div className={styles.btnBox}>
                <button className={styles.cartBtn}>
                  <AiOutlineShoppingCart className={styles.icon} />
                  장바구니
                </button>
                <button className={styles.wishBtn}>
                  {true && <AiOutlineHeart className={styles.icon} />}
                  {false && <AiFillHeart className={styles.icon} />}
                  관심 도서
                </button>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <section>
              <h4 className={styles.sectionTitle}>책 소개</h4>
              <pre className={styles.desc}>{book.desc}</pre>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
