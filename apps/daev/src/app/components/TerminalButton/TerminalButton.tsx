'use client';
import { useState } from 'react';
import { FaTerminal } from 'react-icons/fa'; 

interface ChildComponentProps {
    onStateChange: (newValue: boolean) => void;
  }

// El componente maneja el estado de cli
const TerminalButton: React.FC<ChildComponentProps> = ({ onStateChange }) => {


  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <FaTerminal 
        size={32} 
        color='green'
        onClick={()=>onStateChange(true)}
      />
    </div>
  );
}
export default TerminalButton;
