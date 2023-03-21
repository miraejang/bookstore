import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getBook } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext';
import styles from './BookDetail.module.css';

export default function BookDetail() {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const { id } = useParams();
  const [book, setBook] = useState();
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (state) {
      setBook(state.book);
    } else {
      getBook(id).then(setBook);
    }
  }, [state, id]);
  const handleWish = () => {
    setWish((prev) => !prev);
  };

  return (
    <div className={styles.detail}>
      {book && (
        <>
          <div className={styles.top}>
            <div className={styles.right}>
              <img src={book.img} alt={book.title} className={styles.img} />
            </div>
            <div className={styles.left}>
              <p className={styles.category}>{book.categoryText}</p>
              <h3 className={styles.title}>{book.title}</h3>
              <p className={styles.author}>{book.author} 저자(글)</p>
              <p className={styles.publish}>출판사 {book.publish}</p>
              {!book.discount && (
                <p className={styles.price}>
                  <b>{book.price.toLocaleString()}</b>원
                </p>
              )}
              {book.discount && (
                <p className={styles.price}>
                  <span className={styles.discount}>{book.discount}%</span>
                  <span>
                    <b>
                      {(
                        book.price *
                        ((100 - book.discount) / 100)
                      ).toLocaleString()}
                    </b>
                    원
                  </span>
                  <span className={styles.origin}>
                    {book.price.toLocaleString()}원
                  </span>
                </p>
              )}
              <div className={styles.btnBox}>
                <button className={styles.cartBtn}>장바구니</button>
                <button className={styles.purchaseBtn}>바로구매</button>
                {user && (
                  <button
                    onClick={handleWish}
                    className={`${styles.wishBtn} ${wish ? styles.wish : ''}`}
                  >
                    {!wish && <AiOutlineHeart className={styles.icon} />}
                    {wish && <AiFillHeart className={styles.icon} />}
                  </button>
                )}
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
