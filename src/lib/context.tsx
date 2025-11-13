// this code listen for Auth State Changes in Context

"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

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
    // Check initial session
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedin(!!data.session);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedin(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AppContent.Provider value={{ isLoggedin, setIsLoggedin }}>
      {children}
    </AppContent.Provider>
  );
};
