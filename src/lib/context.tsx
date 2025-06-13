"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "./supabaseClient";

type AppContextType = {
  isLoggedin: boolean;
  setIsLoggedin: (loggedIn: boolean) => void;
};

export const AppContent = createContext<AppContextType>({
  isLoggedin: false,
  setIsLoggedin: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedin(!!data.user);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedin(!!session?.user);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AppContent.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
