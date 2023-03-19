import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

export default function BookCard({ book, type = 'list' }) {
  const { id, title, img, author, desc } = book;

  return (
    <>
      <li className={`${styles.bookBox} ${type === 'grid' && styles.grid}`}>
        {type === 'list' && <input type='checkbox' name='' id='' />}
        <Link to={`/books/${id}`} className={styles.link}>
          <div className={styles.img}>
            <img src={img} alt={title} />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.title}>{title}</p>
              <p className={styles.author}>{author}</p>
            </div>
            {type === 'list' && <pre className={styles.desc}>{desc}</pre>}
          </div>
        </Link>
      </li>
    </>
  );
}
