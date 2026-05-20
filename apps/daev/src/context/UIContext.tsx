'use client';
import { createContext, useContext, useState } from 'react';

interface UIContextValue {
  cliMode: boolean;
  showCli: () => void;
  hideCli: () => void;
  toggleCli: () => void;
}

const noop = () => undefined;

const UIContext = createContext<UIContextValue>({
  cliMode: false,
  showCli: noop,
  hideCli: noop,
  toggleCli: noop,
});

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cliMode, setCliMode] = useState(false);

  const showCli = () => setCliMode(true);
  const hideCli = () => setCliMode(false);
  const toggleCli = () => setCliMode((v) => !v);

  return (
    <UIContext.Provider value={{ cliMode, showCli, hideCli, toggleCli }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
