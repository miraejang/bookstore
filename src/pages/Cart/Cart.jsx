import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import styles from './Cart.module.css';
import Modal from '../../components/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';

const FREE_SHIPPING = 30000;
const SHIPPING = 2500;

export default function Cart() {
  const {
    cartQuery: { isLoading, data: cartItems },
    updateCartItem,
    removeCartItem,
  } = useCart();
  const [checkedState, setCheckedState] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const totalPrice =
    cartItems &&
    Object.values(cartItems) //
      .reduce((total, item) => {
        const { price, discount, quantity } = item;
        if (discount) {
          const p = Math.floor((price * ((100 - discount) / 100)) / 10) * 10;
          return (total += p * quantity);
        } else {
          return (total += price * quantity);
        }
      }, 0);
  const shippingPrice =
    totalPrice && totalPrice >= FREE_SHIPPING ? 0 : SHIPPING;

  useEffect(() => {
    const obj = {};
    if (cartItems) {
      Object.keys(cartItems).map((key) => (obj[key] = false));
    }
    setCheckedState(obj);
  }, [cartItems]);

  const handleQuantity = (e, book) => {
    const quantity = e.target.value;
    if (quantity > 0) {
      updateCartItem.mutate({
        ...book,
        quantity: parseInt(e.target.value, 10),
      });
    }
  };
  const handlePlus = (book) => {
    updateCartItem.mutate({ ...book, quantity: book.quantity + 1 });
  };
  const handleMinus = (book) => {
    if (book.quantity < 2) return;
    updateCartItem.mutate({ ...book, quantity: book.quantity - 1 });
  };
  const handleDelete = (id) => {
    removeCartItem.mutate(id);
  };
  const handleSelected = () => {
    const checked = Object.keys(checkedState).filter(
      (key) => checkedState[key] === true
    );
    const list = [];
    checked.map((id) => list.push(cartItems[id]));
    if (list.length > 0) {
      navigate('/order', { state: { list } });
    } else {
      setShowModal(true);
    }
  };
  const handleAll = () => {
    navigate('/order', { state: { list: Object.values(cartItems) } });
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedState((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className={styles.cart}>
      {!isLoading && !cartItems && (
        <div className={styles.empty}>
          <p>장바구니에 담은 상품이 없습니다.</p>
        </div>
      )}
      {!isLoading && cartItems && (
        <>
          <div className={styles.left}>
            <table className={styles.cartTable}>
              <tbody>
                {Object.values(cartItems).map((book) => {
                  const {
                    id,
                    title,
                    img,
                    author,
                    publish,
                    price,
                    discount,
                    quantity,
                  } = book;
                  return (
                    <tr className={styles.row} key={id}>
                      <td className={styles.checkbox}>
                        {checkedState && (
                          <input
                            onChange={handleChange}
                            type='checkbox'
                            name={id}
                            id={id}
                            checked={checkedState[id]}
                          />
                        )}
                      </td>
                      <td>
                        <Link to={`/books/${id}`} state={{ book }}>
                          <img src={img} alt={title} className={styles.img} />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/books/${id}`} state={{ book }}>
                          <p className={styles.title}>{title}</p>
                        </Link>
                        <p className={styles.author}>
                          <span>{author}</span>
                          {publish && <span> · {publish}</span>}
                        </p>
                      </td>
                      <td>
                        <p className={styles.price}>
                          {!discount && (
                            <>
                              <b>{price.toLocaleString()}</b>원
                            </>
                          )}
                          {discount && (
                            <>
                              <span className={styles.discount}>
                                {discount}%
                              </span>
                              <span>
                                <b>
                                  {(
                                    price *
                                    ((100 - discount) / 100)
                                  ).toLocaleString()}
                                </b>
                                원
                              </span>
                              <span className={styles.origin}>
                                {price.toLocaleString()}원
                              </span>
                            </>
                          )}
                        </p>
                        <div className={styles.quantity}>
                          <button onClick={() => handleMinus(book)}>
                            <span>-</span>
                          </button>
                          <input
                            value={quantity}
                            onChange={(e) => handleQuantity(e, book)}
                            type='number'
                            min='1'
                            step='1'
                          />
                          <button onClick={() => handlePlus(book)}>
                            <span>+</span>
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(id)}
                          className={styles.deleteBtn}
                        >
                          <BiTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.priceBox}>
              <div className={styles.top}>
                <p className={styles.calcPrice}>
                  <span>상품금액</span>
                  <span>
                    <b>{totalPrice && totalPrice.toLocaleString()}</b> 원
                  </span>
                </p>
                <p className={styles.shippingPrice}>
                  <span>배송비</span>
                  <span>
                    + {shippingPrice && shippingPrice.toLocaleString()} 원
                  </span>
                </p>
              </div>
              <div className={styles.bottom}>
                <p className={styles.totalPrice}>
                  <span className={styles.name}>결제 예정 금액</span>
                  <span className={styles.text}>
                    <b>
                      {totalPrice &&
                        shippingPrice &&
                        (totalPrice + shippingPrice).toLocaleString()}
                    </b>{' '}
                    원
                  </span>
                </p>
                <div className={styles.btnBox}>
                  <button onClick={handleSelected} className={styles.btn}>
                    선택 주문하기
                  </button>
                  <button onClick={handleAll} className={styles.btn}>
                    전체 주문하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalContent
            onClose={() => setShowModal(false)}
            message='선택한 상품이 없습니다.'
          />
        </Modal>
      )}
    </div>
  );
}
