import React from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useAuthContext } from '../../context/AuthContext';
import { useOrders } from '../../hooks/useOrders';
import styles from './Mypage.module.css';

export default function Mypage() {
  const {
    ordersQuery: { data: orderList },
  } = useOrders();
  const { user } = useAuthContext();

  return (
    <>
      <h2 className='pageTitle'>Mypage</h2>
      <section className={styles.mypageContent}>
        <div className={styles.orders}>
          <h3 className={styles.title}>
            <span>주문 내역</span>
            <span className={styles.count}>
              총 {orderList && Object.keys(orderList).length} 건
            </span>
          </h3>
          <div className={styles.box}>
            <ul>
              {orderList &&
                Object.keys(orderList).map((key) => (
                  <OrderCard order={orderList[key]} key={key} />
                ))}
            </ul>
          </div>
        </div>
        <div className={styles.myInfo}>
          <h3 className={styles.title}>회원정보</h3>
          <div className={styles.box}>
            {user && (
              <>
                <div className={styles.edit}>
                  <button className={styles.editBtn}>수정</button>
                </div>
                <div className={styles.img}>
                  <img
                    src={
                      user.photoURL ||
                      'https://res.cloudinary.com/dd0uxhc2w/image/upload/v1679456444/blank-profile-picture-973460__340_pyh5of.webp'
                    }
                    alt={user.displayName}
                  />
                </div>
                <table className={styles.userInfoTable}>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>{user.displayName}</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>{user.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>{user.address}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
