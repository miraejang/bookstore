import React, { useState } from 'react';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import useBooks from '../../hooks/useBooks';
import EditBook from '../EditBook/EditBook';
import Modal from '../Modal/Modal';
import styles from './BookRow.module.css';

export default function BookRow({
  book,
  book: {
    id,
    title,
    img,
    author,
    publish,
    price,
    discount,
    categoryCode,
    categoryText,
    createdAt,
  },
}) {
  const { deleteBook } = useBooks();
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = () => {
    setOpenEdit((prev) => !prev);
  };
  const handleDelete = (id) => {
    deleteBook.mutate(id);
  };

  return (
    <>
      <tr className={styles.row} key={id}>
        <td>
          <img src={img} alt={title} className={styles.img} />
        </td>
        <td>
          <p className={styles.id}>{id}</p>
          <a
            href={`/books/${id}`}
            className={styles.link}
            target='_blank'
            rel='noreferrer'
          >
            새 창으로 보기
          </a>
          <p>{title}</p>
        </td>
        <td>{author}</td>
        <td>{publish}</td>
        <td>{price.toLocaleString()}원</td>
        <td>
          {discount && (
            <>
              <p>{discount}%</p>
              <p>
                {(
                  Math.floor((price * ((100 - discount) / 100)) / 10) * 10
                ).toLocaleString()}
                원
              </p>
            </>
          )}
        </td>
        <td>
          {categoryText}({categoryCode})
        </td>
        <td>{new Date(createdAt).toLocaleString('ko-KR')}</td>
        <td className={styles.edit}>
          <div className={styles.editBox}>
            <button onClick={handleEdit} className={styles.editBtn}>
              <BiEditAlt />
            </button>

            <button
              onClick={() => handleDelete(id)}
              className={styles.deleteBtn}
            >
              <BiTrash />
            </button>
          </div>
        </td>
      </tr>
      {openEdit && (
        <Modal onClose={() => setOpenEdit(false)}>
          <EditBook book={book} />
        </Modal>
      )}
    </>
  );
}
