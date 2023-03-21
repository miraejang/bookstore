import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { addOrder, getOrders } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export function useOrders() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const ordersQuery = useQuery(['orders', uid || ''], () => getOrders(uid), {
    enabled: !!uid,
  });

  const addNewOrder = useMutation((order) => addOrder(uid, order), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', uid]);
    },
  });

  return { ordersQuery, addNewOrder };
}
