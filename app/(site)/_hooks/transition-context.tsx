"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextProps {
  isTransitioning: boolean;
  setTransitioning: (isTransitioning: boolean) => void;
}

const TransitionContext = createContext<TransitionContextProps>({
  isTransitioning: false,
  setTransitioning: () => {},
});

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        setTransitioning: setIsTransitioning,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
