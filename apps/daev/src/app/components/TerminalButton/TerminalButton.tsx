'use client';
import { FaTerminal } from 'react-icons/fa'; 

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

// El componente maneja el estado de cli
const TerminalButton: React.FC<ChildComponentProps> = ({ onStateChange }) => {


  return (

      <FaTerminal 
        size={32} 
        onClick={()=>onStateChange(true)}
      />
  );
}
export default TerminalButton;
