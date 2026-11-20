import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useSessionHook = () => {
    const context = useContext(AuthContext);
    if(!context){
      throw new Error("useAuth must be used within AuthProvider");
    }
  return context;
}

