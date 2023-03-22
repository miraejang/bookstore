import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useAuthContext } from '../../context/AuthContext';
import { useOrders } from '../../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import useProfile from '../../hooks/useProfile';

export default function Mypage() {
  const {
    ordersQuery: { data: orderList },
  } = useOrders();
  const { user } = useAuthContext();
  const {
    profileQuery: { data: userProfile },
  } = useProfile();
  const naivgate = useNavigate();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (userProfile === null) {
      setProfile({
        photoURL: user.photoURL || '',
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: '',
      });
    }
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  const handleProfile = () => {
    naivgate('/profile');
  };

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
            {profile && (
              <>
                <div className={styles.edit}>
                  <button onClick={handleProfile} className={styles.editBtn}>
                    수정
                  </button>
                </div>
                <div className={styles.img}>
                  <img
                    src={
                      profile.photoURL ||
                      'https://res.cloudinary.com/dd0uxhc2w/image/upload/v1679456444/blank-profile-picture-973460__340_pyh5of.webp'
                    }
                    alt={profile.displayName}
                  />
                </div>
                <table className={styles.userInfoTable}>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>{profile.displayName}</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>{profile.email}</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>{profile.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>{profile.address}</td>
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
