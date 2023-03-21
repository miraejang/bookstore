import { addBook, getBooks, removeBook } from '../api/firebase';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery(['books'], () => getBooks(), {
    stateTime: 1000 * 60 * 5,
  });

  const addNewBook = useMutation((product) => addBook(product), {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const deleteBook = useMutation((product) => removeBook(product), {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  return { booksQuery, addNewBook, deleteBook };
}
