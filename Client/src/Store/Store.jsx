import { createContext, useState } from "react";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false); // Tracks authentication state
  const [user, setUser] = useState(null); // Stores user details

  return (
    <storeContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </storeContext.Provider>
  );
};