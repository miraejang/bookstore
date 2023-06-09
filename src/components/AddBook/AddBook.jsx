import React, { useState } from 'react';
import { BsHourglassSplit } from 'react-icons/bs';
import { CiImageOff } from 'react-icons/ci';
import { imageUploader } from '../../api/imageUploader';
import { getCategory } from '../../api/firebase';
import { useQuery } from '@tanstack/react-query';
import styles from './AddBook.module.css';
import useBooks from '../../hooks/useBooks';

export default function AddBook() {
  const [book, setBook] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: categoryList } = useQuery(['category'], () => getCategory());
  const { updateBook } = useBooks();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    imageUploader(file)
      .then((url) => {
        updateBook.mutate(
          {
            ...book,
            img: url,
          },
          {
            onSuccess: () => {
              setSuccess(true);
              setTimeout(() => setSuccess(false), 2000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
    setBook({});
    setFile();
    e.target.reset();
  };
  const handleCahnge = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFile(files[0]);
      return;
    }
    if (name === 'category') {
      setBook((prev) => ({
        ...prev,
        categoryCode: value,
        categoryText: categoryList[value],
      }));
      return;
    }
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.addForm}>
      <div className={styles.img}>
        {file && <img src={URL.createObjectURL(file)} alt='도서 이미지' />}
        {!file && (
          <div className={styles.empty}>
            <CiImageOff className={styles.icon} />
            <p>No Image</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.required}>
          <label className={styles.title} htmlFor='image'>
            이미지
          </label>
          <input
            onChange={handleCahnge}
            type='file'
            accept='.png, .jpg, .jpeg'
            name='image'
            id='image'
            required
          />
        </div>
        <div className={styles.required}>
          <label className={styles.title} htmlFor='title'>
            제목
          </label>
          <input
            onChange={handleCahnge}
            type='text'
            name='title'
            id='title'
            required
          />
        </div>
        <div className={styles.required}>
          <label className={styles.title} htmlFor='author'>
            작가
          </label>
          <input
            onChange={handleCahnge}
            type='text'
            name='author'
            id='author'
            required
          />
        </div>
        <div className={styles.required}>
          <label className={styles.title} htmlFor='publish'>
            출판사
          </label>
          <input
            onChange={handleCahnge}
            type='text'
            name='publish'
            id='publish'
            required
          />
        </div>
        <div className={styles.required}>
          <label className={styles.title} htmlFor='price'>
            가격
          </label>
          <input
            onChange={handleCahnge}
            type='text'
            name='price'
            id='price'
            required
          />
        </div>
        <div>
          <label className={styles.title} htmlFor='discount'>
            할인율(%)
          </label>
          <input
            onChange={handleCahnge}
            type='text'
            name='discount'
            id='discount'
          />
        </div>
        <div>
          <label className={styles.title} htmlFor='desc'>
            소개글
          </label>
          <textarea onChange={handleCahnge} type='text' name='desc' id='desc' />
        </div>
        <div className={styles.required}>
          <p className={styles.title}>카테고리</p>
          {categoryList && (
            <select
              name='category'
              id='category'
              onChange={handleCahnge}
              required
            >
              <option value=''>-- 분류 선택 --</option>
              {Object.keys(categoryList).map((key) => (
                <option value={key} key={key}>
                  {categoryList[key]}
                </option>
              ))}
            </select>
          )}
        </div>
        {success && <p>✅ 도서가 등록되었습니다.</p>}
        <button className={styles.addBtn} disabled={isUploading}>
          {isUploading ? (
            <>
              <BsHourglassSplit /> 등록중
            </>
          ) : (
            '도서 등록'
          )}
        </button>
      </form>
    </div>
  );
}
