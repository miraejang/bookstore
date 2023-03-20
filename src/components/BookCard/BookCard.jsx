import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

export default function BookCard({ book, type = 'list', page }) {
  const { id, title, img, author, desc } = book;
  const [listPage, setlistPage] = useState(false);

  useEffect(() => {
    if (type === 'list') setlistPage(true);
  }, [type, page]);

  return (
    <>
      <li className={`${styles.bookBox} ${styles[type]}`}>
        {listPage && <input type='checkbox' name='' id='' />}
        <Link to={`/books/${id}`} state={{ book }} className={styles.link}>
          <div className={styles.img}>
            <img src={img} alt={title} />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.title}>{title}</p>
              <p className={styles.author}>{author}</p>
            </div>
            {listPage && <pre className={styles.desc}>{desc}</pre>}
          </div>
        </Link>
      </li>
    </>
  );
}
