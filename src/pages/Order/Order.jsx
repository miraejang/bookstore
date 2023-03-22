import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';
import OrderListRow from '../../components/OrderListRow/OrderListRow';
import { useOrders } from '../../hooks/useOrders';
import styles from './Order.module.css';

const FREE_SHIPPING = 30000;
const SHIPPING = 2500;

export default function Order() {
  const { state } = useLocation();
  const [orderList, setOrderList] = useState();
  const [message, setMessage] = useState(null);
  const { addNewOrder } = useOrders();
  const navigate = useNavigate();
  const totalPrice =
    orderList &&
    orderList //
      .reduce((total, item) => {
        const { price, discount, quantity } = item;
        if (discount) {
          const p = Math.floor((price * ((100 - discount) / 100)) / 10) * 10;
          return (total += p * (quantity || 1));
        } else {
          return (total += price * (quantity || 1));
        }
      }, 0);
  const shippingPrice =
    totalPrice && totalPrice >= FREE_SHIPPING ? 0 : SHIPPING;

  useEffect(() => {
    if (state) {
      setOrderList([state.book]);
    }
    if (state === null) {
      navigate('/');
    }
  }, [state, navigate]);

  const handleOrder = () => {
    addNewOrder.mutate(orderList, {
      onSuccess: () => setMessage('주문이 완료되었습니다.'),
      onError: () => setMessage('에러가 발생했습니다. 다시 시도해 주세요.'),
    });
  };

  return (
    <>
      {orderList && (
        <div className={styles.order}>
          <div className={styles.left}>
            <section className={styles.address}>
              <div className={styles.sectionLeft}>
                <p className={styles.title}>배송지 정보</p>
              </div>
              <div className={styles.sectionContent}>
                <input
                  type='text'
                  placeholder='배송지를 입력해주세요.'
                  className={styles.addressInput}
                />
              </div>
            </section>
            <section className={styles.list}>
              <div className={styles.sectionLeft}>
                <p className={styles.title}>주문 상품</p>
                <p className={styles.totalCount}>
                  총{' '}
                  {orderList.reduce(
                    (sum, book) => (sum += book.quantity || 1),
                    0
                  )}{' '}
                  개
                </p>
              </div>
              <div className={styles.sectionContent}>
                <table className={styles.listTable}>
                  <tbody>
                    {orderList &&
                      orderList.map((book) => <OrderListRow book={book} />)}
                  </tbody>
                </table>
              </div>
            </section>
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
                <button onClick={handleOrder} className={styles.purchaseBtn}>
                  주문하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {message && (
        <Modal onClose={() => setMessage(null)}>
          <ModalContent
            onClose={() => {
              setMessage(null);
              navigate('/');
            }}
            message={message}
          />
        </Modal>
      )}
    </>
  );
}
