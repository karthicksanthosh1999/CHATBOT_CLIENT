import { useCallback, useEffect, useState, type ReactNode } from "react";
import { axiosInstants } from "../instant";
import { useNavigate } from "react-router-dom";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children } : { children: ReactNode }) =>{

    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const fetchLoggedUser = useCallback(async()=>{
        try {
            setIsLoading(true)
            const response = await axiosInstants.get(`/auth/me`);
                if(response.data){
                    setIsAuth(true)
                    setUser(response.data.user)
                    console.log(response.data)
                }
            } catch (error) {
                console.log(error)
                setIsAuth(false)
            } finally{
                setIsLoading(false)
            }
    },[]);

  const logout = async () => {
    try {
      // Call your backend logout endpoint if available.
      // await axiosInstants.post("/auth/logout");
      setUser(null);
      setIsAuth(false);

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

    useEffect(()=>{
        fetchLoggedUser()
    },[fetchLoggedUser]);

    return(
    <AuthContext.Provider value={{ isLoading, logout, user, isAuth, fetchLoggedUser }}>
        {children}
    </AuthContext.Provider>
    )
};