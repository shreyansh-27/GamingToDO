import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    if (!user) {
      const { data } = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      });
      setUser(data);
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
