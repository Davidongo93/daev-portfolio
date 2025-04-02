'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type AppContextType = {
  cliMode: boolean;
  toggleCliMode: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Estado inicial neutral hasta que se determine en el cliente
  const [cliMode, setCliMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Solo acceder a localStorage después de montar el componente
    const saved = localStorage.getItem('cliMode');
    setCliMode(saved === 'true');
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cliMode', cliMode.toString());
    }
  }, [cliMode, isMounted]);

  const toggleCliMode = () => {
    setCliMode((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ cliMode, toggleCliMode }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
