import { createContext } from "react";

export interface User {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  logout: () => Promise<void>;
  fetchLoggedUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);