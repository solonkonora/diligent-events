// React context for storing user info;
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{
  const backendUrl = import.meta.env.BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setuserData] = useState(false);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
