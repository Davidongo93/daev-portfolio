'use client';
import { useState } from 'react';
import ConsoleCLI from './views/console/ConsoleCLI';
import Home from './views/Home/Home';

export default function Index() {

  const [cliMode, setCliMode] = useState(null);

  const handleUiChange = (newValue: boolean) => {
    setCliMode(!cliMode);
  };

  return (
    <>
      {cliMode ? (
        <ConsoleCLI onStateChange={handleUiChange} />
      ) : (
        <Home onStateChange={handleUiChange} />
      )}
    </>
  );
}
