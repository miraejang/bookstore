import React, { createContext, useContext, useEffect, useState } from 'react';
import useCart from '../hooks/useCart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const {
    cartQuery: { isLoading, data },
  } = useCart();
  const [cartList, setCartList] = useState();

  useEffect(() => {
    setCartList(Object.keys(data));
  }, [data]);

  return (
    <CartContext.Provider value={{ isLoading, cartList }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
