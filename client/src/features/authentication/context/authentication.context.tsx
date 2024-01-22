import { ReactNode, createContext, useEffect, useState } from "react";
import { UserIdentifier, UserSignupInputs } from "../constants/types";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../services/authentication.service";
import * as authService from "../services/authentication.service";

type AuthContext = {
  login: (username: string, password: string) => Promise<void>;
  signup: (user: UserSignupInputs) => Promise<void>;
  user?: UserIdentifier;
  isLoadingUser: boolean;
};

export const Context = createContext<AuthContext | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserIdentifier>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingUser(true);
    getLoggedInUser()
      .then((res) => {
        setUser({ id: res.id, username: res.username });
      })
      .catch((_) => {
        setUser(undefined);
      })
      .finally(() => setIsLoadingUser(false));
  }, []);

  function signup(user: UserSignupInputs) {
    return authService.signup(user).then((res) => {
      setUser({ id: res.id, username: res.username });
      navigate("/");
    });
  }

  function login(username: string, password: string) {
    return authService.login(username, password).then((res) => {
      setUser({ id: res.id, username: res.username });
      navigate("/");
    });
  }

  return (
    <Context.Provider value={{ login, signup, user, isLoadingUser }}>
      {children}
    </Context.Provider>
  );
}
