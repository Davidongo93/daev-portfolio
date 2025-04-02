'use client';
import { FaTerminal } from 'react-icons/fa'; 

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

// El componente maneja el estado de cli
const TerminalButton: React.FC<ChildComponentProps> = ({ onStateChange }) => {


  return (

      <FaTerminal 
      className="flex flex-col items-center text-white hover:text-green-300 transition text-center"
        onClick={()=>onStateChange(true)}
      />
  );
}
export default TerminalButton;
