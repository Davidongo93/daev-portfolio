import { useState, useEffect } from 'react';
import './ConsoleCLI.style.css'; // Import the custom CSS

const Console = () => {
  const [command, setCommand] = useState('');
  const [blinking, setBlinking] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Command handling logic here
      setCommand(''); // Clear the command after pressing Enter
    } else if (e.key === 'Backspace') {
      setCommand((prev) => prev.slice(0, -1)); // Handle backspace to delete last character
    } else if (e.key.length === 1) {
      // Ensure only printable characters are appended
      setCommand((prev) => prev + e.key);
    }
  };

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 500); // Blinking every 500ms

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="console" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="console-output  flex-col">
        <span className="prompt">┌──(dave㉿Daev)-[~]</span>
        <span className="prompt">
          └─$ <span className="command">{command}</span>
          <span className={`cursor ${blinking ? 'blinking' : ''}`}>_</span>
        </span>
      </div>
    </div>
  );
};

export default Console;
