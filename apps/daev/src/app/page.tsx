'use client'
import { useState } from 'react';
import ConsoleCLI from "./views/console/ConsoleCLI";
import Home from './views/FriendlyEnvironment/FriendlyEnvironment';


export default function Index() {
  const [cli, setCli] = useState(false);
  const handleUiChange = (newValue: boolean) => {
    setCli(newValue);
  };

  return (
    <>
      {cli? 
         <ConsoleCLI onStateChange={handleUiChange} />:
         <Home onStateChange={handleUiChange} />}
    </>
  );
}
