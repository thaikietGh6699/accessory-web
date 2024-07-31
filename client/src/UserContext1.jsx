import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [users, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!users) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
