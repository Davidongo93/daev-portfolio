'use client';
import { useState, useEffect, useRef } from 'react';
import './ConsoleCLI.style.css';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const Console: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  const { lang, t } = useLang();
  const [command, setCommand] = useState('');
  const [blinking, setBlinking] = useState(true);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [helper, setHelper] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}`;
  };

  useEffect(() => {
    const loadMessages = [
      `[${getTimestamp()}] Initializing covert protocols...`,
      `[${getTimestamp()}] Establishing connection with satellite THETA-12...`,
      `[${getTimestamp()}] <SENDING ENCRYPTION KEYS> Status: [OK]`,
      `[${getTimestamp()}] Latency: 48ms | Uplink: 256 Mbps | Status: [OK]`,
      `[${getTimestamp()}] Handshake successful. Proxy node active.`,
      `[${getTimestamp()}] Routing signal through relay AEGIS-1...`,
      `[${getTimestamp()}] ********** ULTRA-SECURE DATA LINK ONLINE **********`,
      `[${getTimestamp()}] SSH connection established successfully.`,
      ``,
      `Welcome to ${siteConfig.alias} terminal.`,
      `Type 'help' or '-h' to see available commands.`,
      `Type 'gui' to load the graphic user interface.`,
      ``,
    ];

    const timeoutIds: NodeJS.Timeout[] = [];
    loadMessages.forEach((message, index) => {
      const id = setTimeout(() => {
        setHelper((prev) => [...prev, message]);
        if (index === loadMessages.length - 1) setLoading(false);
      }, (index + 1) * 120);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history, helper]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlinking((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleCommandExecution = (cmd: string) => {
    const trimmed = cmd.toLowerCase().trim();
    switch (trimmed) {
      case 'help':
      case '-h':
        setHistory((prev) => [
          ...prev,
          'Available commands:',
          '  about     — Who is Dave',
          '  skills    — Tech stack',
          '  projects  — Featured projects',
          '  contact   — Get in touch',
          '  experience — Work history',
          '  social    — Social media links',
          '  whoami    — Quick intro',
          '  gui       — Load graphic interface',
          '  clear     — Clear console',
          '  help, -h  — Show this message',
          '',
        ]);
        break;
      case 'about':
        setHistory((prev) => [
          ...prev,
          `${siteConfig.name} — ${siteConfig.role[lang]}`,
          siteConfig.bio[lang],
          `Location: ${siteConfig.location} ${siteConfig.locationFlag}`,
          siteConfig.available
            ? `Status: Available for work ✓`
            : `Status: Not available`,
          '',
        ]);
        break;
      case 'whoami':
        setHistory((prev) => [
          ...prev,
          `dave@daev:~$ ${siteConfig.name}`,
          `Role: ${siteConfig.role[lang]}`,
          '',
        ]);
        break;
      case 'skills':
        setHistory((prev) => [
          ...prev,
          'Frontend : ' + siteConfig.skills.frontend.join(' · '),
          'Backend  : ' + siteConfig.skills.backend.join(' · '),
          'Tools    : ' + siteConfig.skills.tools.join(' · '),
          '',
        ]);
        break;
      case 'projects':
        setHistory((prev) => [
          ...prev,
          'Featured projects:',
          ...siteConfig.featuredProjects.map(
            (p, i) => `  ${i + 1}. ${p.name} — ${p.liveUrl}`
          ),
          '',
          `More: ${siteConfig.links.github}`,
          '',
        ]);
        break;
      case 'experience':
        setHistory((prev) => [
          ...prev,
          'Work history:',
          ...siteConfig.experience.map(
            (e) => `  ${e.period} | ${e.company} — ${e.role[lang]}`
          ),
          '',
        ]);
        break;
      case 'contact':
        setHistory((prev) => [
          ...prev,
          `Email    : ${siteConfig.email}`,
          `WhatsApp : ${siteConfig.whatsapp}`,
          `LinkedIn : ${siteConfig.links.linkedin}`,
          `GitHub   : ${siteConfig.links.github}`,
          '',
        ]);
        break;
      case 'social':
        setHistory((prev) => [
          ...prev,
          `GitHub    : ${siteConfig.links.github}`,
          `LinkedIn  : ${siteConfig.links.linkedin}`,
          `Twitter/X : ${siteConfig.links.twitter}`,
          `Instagram : ${siteConfig.links.instagram}`,
          `Discord   : ${siteConfig.links.discord}`,
          '',
        ]);
        break;
      case 'clear':
        setHistory([]);
        setHelper([]);
        break;
      case 'gui':
        setHistory((prev) => [...prev, 'Loading graphic user interface...']);
        setTimeout(() => onStateChange(false), 1500);
        break;
      case '':
        break;
      default:
        setHistory((prev) => [
          ...prev,
          `Command not recognized: ${cmd}. Type 'help' for available commands.`,
          '',
        ]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (loading) return;

    if (e.key === 'Enter') {
      setHistory((prev) => [...prev, `┌──(dave㉿Daev)-[~]\n└─$ ${command}`]);
      if (command.trim()) {
        setCommandHistory((prev) => [...prev, command]);
      }
      handleCommandExecution(command);
      setCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIdx);
      setCommand(commandHistory[commandHistory.length - 1 - newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setCommand('');
      } else {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setCommand(commandHistory[commandHistory.length - 1 - newIdx]);
      }
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="console" onClick={focusInput} tabIndex={0}>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="console-hidden-input"
        aria-label="Console command input"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />

      <div ref={outputRef} className="console-output">
        {helper.map((line, index) => (
          <div key={`h-${index}`}>{line}</div>
        ))}
        {history.map((line, index) => (
          <div key={`c-${index}`}>{line}</div>
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

      <div className="console-tap-hint md:hidden">{t.console.tapHint} ↓</div>
    </div>
  );
};

export default Console;
