'use client';
import { useEffect } from 'react';
import ConsoleCLI from '../../views/console/ConsoleCLI';
import { useUI } from '../../context/UIContext';

export default function ConsoleOverlay() {
  const { cliMode, hideCli } = useUI();

  useEffect(() => {
    if (!cliMode) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [cliMode]);

  if (!cliMode) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <ConsoleCLI onExit={hideCli} />
    </div>
  );
}
