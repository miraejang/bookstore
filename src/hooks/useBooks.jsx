import { addBook, getBooks, removeBook } from '../api/firebase';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery(['books'], () => getBooks(), {
    stateTime: 1000 * 60 * 5,
  });

  const updateBook = useMutation((book) => addBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const deleteBook = useMutation((book) => removeBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  return { booksQuery, updateBook, deleteBook };
}
