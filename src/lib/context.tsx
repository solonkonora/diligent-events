"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

type AppContextType = {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (loggedIn: boolean) => void;
};

export const AppContent = createContext<AppContextType>({
  backendUrl: "http://localhost:4000",
  isLoggedin: false,
  setIsLoggedin: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  // Optional: check if logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/check", {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedin(data.loggedIn || false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setIsLoggedin(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl: "http://localhost:4000",
        isLoggedin,
        setIsLoggedin,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
