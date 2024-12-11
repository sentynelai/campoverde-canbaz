import React, { createContext, useContext, useState } from 'react';

interface SummaryModalsContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const SummaryModalsContext = createContext<SummaryModalsContextType>({
  isVisible: true,
  setIsVisible: () => {},
});

export const SummaryModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SummaryModalsContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </SummaryModalsContext.Provider>
  );
};

export const useSummaryModals = () => useContext(SummaryModalsContext);