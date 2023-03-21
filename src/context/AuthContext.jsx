import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChange, login, logout } from '../api/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ isLoading, user, uid: user && user.uid, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
