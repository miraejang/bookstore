import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { addCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['cart', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const updateCartItem = useMutation((book) => addCart(uid, book), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid]);
    },
  });

  const removeCartItem = useMutation((bookId) => removeFromCart(uid, bookId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid]);
    },
  });

  return { cartQuery, updateCartItem, removeCartItem };
}
