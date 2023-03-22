import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useCart from '../../hooks/useCart';
import styles from './BookCard.module.css';
import Modal from '../Modal/Modal';
import ModalContent from '../ModalContent/ModalContent';

export default function BookCard({ book, type = 'list', page }) {
  const {
    id,
    title,
    img,
    author,
    publish,
    price,
    discount,
    desc,
    categoryText,
  } = book;
  const [listPage, setlistPage] = useState(false);
  const [wish, setWish] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    cartQuery: { data: cartItems },
    updateCartItem,
  } = useCart();

  useEffect(() => {
    if (type === 'list') setlistPage(true);
  }, [type, page]);

  const handleAddCart = () => {
    const items = cartItems && Object.keys(cartItems);

    if (items && items.includes(id)) {
      setShowModal(true);
    } else {
      updateCartItem.mutate({ ...book, quantity: 1 });
    }
  };
  const handleWish = () => {
    setWish((prev) => !prev);
  };
  const handleOrder = () => {
    navigate('/order', { state: { list: [book] } });
  };

  return (
    <>
      <li className={`${styles.bookBox} ${styles[type]}`}>
        <Link to={`/books/${id}`} state={{ book }} className={styles.link}>
          <div className={styles.img}>
            <img src={img} alt={title} />
          </div>
          <div className={styles.content}>
            {!listPage && <p className={styles.title}>{title}</p>}
            {listPage && (
              <div>
                <p className={styles.category}>{categoryText}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.author}>
                  <span>{author}</span>
                  {publish && <span> · {publish}</span>}
                </p>
                {!discount && (
                  <p className={styles.price}>
                    <b>{price.toLocaleString()}</b>원
                  </p>
                )}
                {discount && (
                  <p className={styles.price}>
                    <span className={styles.discount}>{discount}%</span>
                    <span>
                      <b>
                        {(
                          Math.floor((price * ((100 - discount) / 100)) / 10) *
                          10
                        ).toLocaleString()}
                      </b>
                      원
                    </span>
                    <span className={styles.origin}>
                      {price.toLocaleString()}원
                    </span>
                  </p>
                )}
                <pre className={styles.desc}>{desc}</pre>
              </div>
            )}
          </div>
        </Link>
        {listPage && (
          <div className={styles.btnBox}>
            <button
              onClick={handleWish}
              className={`${styles.wishBtn} ${wish ? styles.wish : ''}`}
            >
              {!wish && <AiOutlineHeart className={styles.icon} />}
              {wish && <AiFillHeart className={styles.icon} />}
            </button>
            <button onClick={handleAddCart} className={styles.cartBtn}>
              장바구니
            </button>
            <button onClick={handleOrder} className={styles.purchaseBtn}>
              바로구매
            </button>
          </div>
        )}
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalContent
            onClose={() => setShowModal(false)}
            message='이미 장바구니에 있는 상품입니다.'
          />
        </Modal>
      )}
    </>
  );
}
