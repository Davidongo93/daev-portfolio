'use client'
import { useState, useEffect } from 'react';
import ConsoleCLI from "./views/console/ConsoleCLI";
import GUI from './views/friendlyEnvironment/FriendlyEnvironment';


export default function Index() {
  const [cli, setCli] = useState(true);
  const handleUiChange = (newValue: boolean) => {
    setCli(newValue);
  };

  return (
    <>
      {cli? 
         <ConsoleCLI onStateChange={handleUiChange} />:
         <GUI onStateChange={handleUiChange} />}
    </>
  );
}
