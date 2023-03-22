import React from 'react';
import styles from './OrderListRow.module.css'

export default function OrderListRow({
  book: { id, title, img, price, discount, quantity },
}) {
  return (
    <tr key={id}>
      <td>
        <img src={img} alt={title} className={styles.img} />
      </td>
      <td>{title}</td>
      <td>{quantity || 1} 개</td>
      <td>
        <b>
          {!discount && (price * (quantity || 1)).toLocaleString()}
          {discount &&
            (
              Math.floor((price * ((100 - discount) / 100)) / 10) *
              10 *
              (quantity || 1)
            ).toLocaleString()}
        </b>
        원
      </td>
    </tr>
  );
}
