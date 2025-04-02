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
    return `${now
      .toISOString()
      .slice(0, 10)} ${now.toLocaleTimeString()}.${now.getMilliseconds()}`;
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
          'Available commands: \n\n',
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
        setTimeout(() => onStateChange(false), 2500);
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

  // Blinking cursor effect and focus
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const consoleElement = document.querySelector('.console') as HTMLDivElement;

    if (consoleElement) {
      consoleElement.focus(); // Auto-focus on mount
    }
  }, []);
  useEffect(() => {
    const consoleElement = document.querySelector(
      '.console-output'
    ) as HTMLDivElement;
    if (consoleElement) {
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }
  }, []);

  return (
    <div className="win95-window">
      {/* Barra de título */}
      <div className="win95-title-bar">
        <div className="win95-title-icon">☺</div>
        <div className="win95-title-text">Daev Terminal</div>
        <div className="win95-title-controls">
          <button className="win95-btn minimize" aria-label="Minimize"></button>
          <button className="win95-btn maximize" aria-label="Maximize"></button>
          <button
            className="win95-btn close"
            aria-label="Close"
            onClick={() => onStateChange(false)}
          ></button>
        </div>
      </div>

      {/* Barra de menú */}
      <div className="win95-menu-bar">
        <span className="win95-menu-item">File</span>
        <span className="win95-menu-item">Edit</span>
        <span className="win95-menu-item">View</span>
        <span className="win95-menu-item">Help</span>
      </div>

      {/* Barra de herramientas */}
      <div className="win95-tool-bar">
        <button className="win95-tool-btn">📁</button>
        <button className="win95-tool-btn">💾</button>
        <button className="win95-tool-btn">✂️</button>
        <button className="win95-tool-btn">📋</button>
        <div className="win95-tool-separator"></div>
        <button className="win95-tool-btn">🔍</button>
      </div>

      {/* Barra de estado */}
      <div className="win95-status-bar">
        <span>Ready</span>
        <span className="win95-status-spacer"></span>
        <span>Windows 95</span>
      </div>

      {/* Contenido de la consola (tu diseño original) */}
      <div className="console" onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="console-output flex-col">
          {helper.map((line, index) => (
            <div key={index} className="console-output">
              {line}
            </div>
          ))}
          {history.map((line, index) => (
            <div key={index} className="console-output">
              {line}
            </div>
          ))}
          {!loading && (
            <>
              <span className="prompt">┌──(dave㉿Daev)-[~]</span>
              <span className="prompt">
                └─$ <span className="command">{command}</span>
                <span className={`cursor ${blinking ? 'blinking' : ''}`}>
                  _
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Console;
