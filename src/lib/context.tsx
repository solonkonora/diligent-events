"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

type AppContextType = {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (loggedIn: boolean) => void;
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const AppContent = createContext<AppContextType>({
  backendUrl,
  isLoggedin: false,
  setIsLoggedin: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/auth/check`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedin(data.loggedIn || false);
      } catch (err) {
        setIsLoggedin(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
