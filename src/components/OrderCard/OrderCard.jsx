import React, { useState } from 'react';
import OrderListRow from '../OrderListRow/OrderListRow';
import styles from './OrderCard.module.css';

export default function OrderCard({ order: { date, list } }) {
  const [showDetails, setShowDetails] = useState();

  const handleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <li className={styles.orderDetail}>
      <div className={styles.orderInfo}>
        <div className={styles.info}>
          <div className={styles.row}>
            <p className={styles.title}>주문일</p>
            <p className={styles.text}>
              {new Date(date).toLocaleString('ko-KR')}
            </p>
          </div>
          <div className={styles.row}>
            <p className={styles.title}>내용</p>
            <p className={styles.text}>
              {list[0].title} 외 {list.length - 1} 건
            </p>
          </div>
        </div>
        <button onClick={handleDetails} className={styles.displayBtn}>
          {showDetails ? '접기' : '자세히 보기'}
        </button>
      </div>
      {showDetails && (
        <div className={styles.details}>
          <table className={styles.listTable}>
            <tbody>
              {list &&
                list.map((book) => <OrderListRow book={book} key={book.id} />)}
            </tbody>
          </table>
        </div>
      )}
    </li>
  );
}
