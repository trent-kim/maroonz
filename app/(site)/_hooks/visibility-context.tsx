"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface VisibilityContextType {
  visibleContainers: Record<string, boolean | boolean[]>;
  setVisibleContainers: React.Dispatch<React.SetStateAction<Record<string, boolean | boolean[]>>>;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return context;
};

export const VisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visibleContainers, setVisibleContainers] = useState<Record<string, boolean | boolean[]>>({});

  return (
    <VisibilityContext.Provider value={{ visibleContainers, setVisibleContainers }}>
      {children}
    </VisibilityContext.Provider>
  );
};