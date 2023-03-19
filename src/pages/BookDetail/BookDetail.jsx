import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import styles from './BookDetail.module.css';

export default function BookDetail() {
  const {
    state: {
      book: { title, img, author, desc },
    },
  } = useLocation();

  return (
    <div className={styles.detail}>
      <div className={styles.top}>
        <div className={styles.right}>
          <img src={img} alt={title} className={styles.img} />
        </div>
        <div className={styles.left}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
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
          <pre className={styles.desc}>{desc}</pre>
        </section>
      </div>
    </div>
  );
}
