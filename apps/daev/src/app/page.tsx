'use client';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Home from '../views/Home/Home';
import ConsoleCLI from '../views/console/ConsoleCLI';

export default function Index() {
  const { cliMode, toggleCliMode } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Renderizar un estado neutral durante SSR
    return <div className="loading-placeholder" />;
  }

  return (
    <>
      {cliMode ? (
        <ConsoleCLI onStateChange={toggleCliMode} />
      ) : (
        <Home onStateChange={toggleCliMode} />
      )}
    </>
  );
}
