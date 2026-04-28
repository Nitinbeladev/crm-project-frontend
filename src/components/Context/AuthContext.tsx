import { createContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children } ) => {
  const role = "Admin";
  const isAuthorized = true;

  return (
    <AuthContext.Provider value={{ role, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
