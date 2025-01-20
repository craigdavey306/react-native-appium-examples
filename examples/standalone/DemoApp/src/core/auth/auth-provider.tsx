import React, { useState, createContext, useContext, useCallback } from 'react';
import { AuthInterface } from './model';

interface AuthContextInterface extends AuthInterface {
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {}

export const AuthProvider = ({
  children,
}: React.PropsWithChildren<AuthProviderProps>): React.JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useCallback(() => setIsAuthenticated(true), [isAuthenticated]);
  const logout = useCallback(
    () => setIsAuthenticated(false),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
