import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuthContext();
  const {
    editProfile,
    profileQuery: { data: userProfile },
  } = useProfile();
  const [profile, setProfile] = useState();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile === null) {
      setProfile({
        photoURL: user.photoURL || '',
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
    }
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [
    userProfile,
    user.photoURL,
    user.displayName,
    user.email,
    user.phoneNumber,
    user.address,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = () => {
    editProfile.mutate(profile, {
      onSuccess: () => setMessage('회원정보가 수정되었습니다..'),
      onError: () => setMessage('에러가 발생했습니다. 다시 시도해 주세요.'),
    });
  };

  return (
    <>
      {profile && (
        <div className={styles.profile}>
          <h3 className={styles.title}>회원정보</h3>
          <div className={styles.box}>
            <div className={styles.img}>
              <img
                src={
                  profile.photoURL ||
                  'https://res.cloudinary.com/dd0uxhc2w/image/upload/v1679456444/blank-profile-picture-973460__340_pyh5of.webp'
                }
                alt={profile.displayName}
              />
            </div>
            <div className={styles.form}>
              <div>
                <label htmlFor='displayName' className={styles.label}>
                  이름
                </label>
                <input
                  value={profile.displayName}
                  onChange={handleChange}
                  type='text'
                  name='displayName'
                  id='displayName'
                  className={styles.input}
                />
              </div>
              <div>
                <label htmlFor='email' className={styles.label}>
                  이메일
                </label>
                <input
                  value={profile.email}
                  onChange={handleChange}
                  type='email'
                  name='email'
                  id='email'
                  className={styles.input}
                />
              </div>
              <div>
                <label htmlFor='phoneNumber' className={styles.label}>
                  전화번호
                </label>
                <input
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  type='tel'
                  name='phoneNumber'
                  id='phoneNumber'
                  className={styles.input}
                />
              </div>
              <div>
                <label htmlFor='address' className={styles.label}>
                  주소
                </label>
                <input
                  value={profile.address}
                  onChange={handleChange}
                  type='tel'
                  name='address'
                  id='address'
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.edit}>
              <button onClick={handleEdit} className={styles.editBtn}>
                수정
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <Modal onClose={() => setMessage(null)}>
          <ModalContent
            onClose={() => {
              setMessage(null);
              navigate('/mypage');
            }}
            message={message}
            btnText='마이페이지로 이동'
          />
        </Modal>
      )}
    </>
  );
}
