import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../service/authService";

interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number; 
}

interface IUserProviderValue {
  user: IUser | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProviderValue | undefined>(undefined);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    try {
      const user = await CurrentUser();
      setUser(user);
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUser();
  }, [setLoading]);

  return (
    <UserContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = ( ) =>{
    const context = useContext(UserContext); 
    if(context == undefined) {
        throw new Error("useUser must be used within a UserProvider");

    }
    return context;
}
