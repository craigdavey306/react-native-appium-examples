import React, { useState, createContext, useContext, useCallback } from 'react';
import { AuthInterface } from './model';

interface AuthContextInterface extends AuthInterface {
  login: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {}

export const AuthProvider = ({
  children,
}: React.PropsWithChildren<AuthProviderProps>): React.JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useCallback(
    () => setIsAuthenticated(prev => !prev),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn: isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
