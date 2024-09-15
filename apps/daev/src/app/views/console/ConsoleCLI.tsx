import { useState, useEffect } from 'react';
import './ConsoleCLI.style.css';

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const Console: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  const [command, setCommand] = useState('');
  const [blinking, setBlinking] = useState(true);
  const [commandCounter, setCommandCounter] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Flag for loading phase
  const [helper, setHelper] = useState<string[]>([]);

  // Helper function to get the current timestamp in a spy-movie format
  const getTimestamp = () => {
    const now = new Date();
    return `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}.${now.getMilliseconds()}`;
  };

  // Simulate OS loading and secret agent-style connection logs
  useEffect(() => {
    const loadMessages = [
      `[${getTimestamp()}] Initializing covert protocols...`,
      `[${getTimestamp()}] Establishing connection with satellite THETA-12...`,
      `[${getTimestamp()}] <SENDING ENCRYPTION KEYS> Status: [OK]`,
      `[${getTimestamp()}] Syncing data streams with secure server [45.76.23.89]...`,
      `[${getTimestamp()}] Latency: 48ms | Uplink Speed: 256 Mbps | Status: [OK]`,
      `[${getTimestamp()}] Attempting handshake with proxy node DELTA-39...`,
      `[${getTimestamp()}] Handshake successful. Proxy node active.`,
      `[${getTimestamp()}] Routing signal through relay AEGIS-1 to conceal source...`,
      `[${getTimestamp()}] Verifying secure channels... Status: [OK]`,
      `[${getTimestamp()}] Gaining access to classified database...`,
      `[${getTimestamp()}] Connection established with satellite OMEGA-7 [192.168.12.48]...`,
      `[${getTimestamp()}] Loading cryptographic modules...`,
      `[${getTimestamp()}] ********** ULTRA-SECURE DATA LINK ONLINE **********`,
      `[${getTimestamp()}] SSH connection established successfully.\n\n`,
      `[Welcome]  To get help, prompt: help or -h.\n\n`,
      `[Hint]  if your prompt doesnt show characters please click on screen\n\n`,
      `[Hint]  To load graphic user interface prompt: gui\n\n`,
    ];

    const timeoutIds: NodeJS.Timeout[] = [];

    loadMessages.forEach((message, index) => {
      const timeoutId = setTimeout(() => {
        setHelper((prevHelper) => [...prevHelper, message]);
        if (index === loadMessages.length - 1) {
          setLoading(false); // Loading complete
        }
      }, (index + 1) * 150);
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  // Command handler function
  const handleCommandExecution = (command: string) => {
    switch (command.toLowerCase()) {
      case 'help':
      case '-h':
        setHistory((prevHistory) => [
          ...prevHistory,
          'Available commands:\n\n',
          'clear - Clear the console',
          'gui  - Load GUI environment',
          'help, -h - Display help message',
        ]);
        break;
      case 'clear':
        setHistory([]);
        setHelper([]);
        break;
      case 'gui':
        setHistory((prevHistory) => [
          ...prevHistory,
          'Loading graphic user interface....',
        ]);
        setTimeout( ()=> onStateChange(false),4000)
      break;

      default:
        setHistory((prevHistory) => [
          ...prevHistory,
          `Command not recognized: ${command}`,
        ]);
        break;
    }
  };

  // Handle key events, including command execution
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      setHistory((prevHistory) => [
        ...prevHistory,
        `┌──(dave㉿Daev)-[~]\n└─$ ${command}`,
      ]);
      handleCommandExecution(command); // Execute the command
      setCommand(''); // Clear the input
      setCommandCounter(0); // Reset command counter
    } else if (e.key === 'Backspace') {
      setCommand((prev) => prev.slice(0, -1)); // Handle backspace
    } else if (e.key.length === 1) {
      setCommand((prev) => prev + e.key); // Append printable characters
    } else if (e.key === 'ArrowUp') {
      // Command history navigation: Move up
      if (history.length > 0 && commandCounter < history.length) {
        setCommandCounter((prevCounter) => prevCounter + 1);
        setCommand(
          history[history.length - commandCounter - 1].replace(
            '┌──(dave㉿Daev)-[~]\n└─$ ',
            ''
          )
        ); // Retrieve command from history
      }
    } else if (e.key === 'ArrowDown') {
      // Command history navigation: Move down
      if (commandCounter > 0) {
        setCommandCounter((prevCounter) => prevCounter - 1);
        setCommand(
          history[history.length - commandCounter + 1]?.replace(
            '┌──(dave㉿Daev)-[~]\n└─$ ',
            ''
          ) || ''
        );
      }
    }
  };

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="console" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="console-output flex-col">
        {helper.map((line, index) => (
          <div key={index} className="console-line">
            {line}
          </div>
        ))}
        {history.map((line, index) => (
          <div key={index} className="console-line">
            {line}
          </div>
        ))}
        {!loading && (
          <>
            <span className="prompt">┌──(dave㉿Daev)-[~]</span>
            <span className="prompt">
              └─$ <span className="command">{command}</span>
              <span className={`cursor ${blinking ? 'blinking' : ''}`}>_</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Console;
