'use client';
import ConsoleCLI from '../views/console/ConsoleCLI';
import Home from '../views/Home/Home';
import { useUI } from '../context/UIContext';

export default function Index() {
  const { cliMode, hideCli } = useUI();

  return cliMode ? <ConsoleCLI onExit={hideCli} /> : <Home />;
}
