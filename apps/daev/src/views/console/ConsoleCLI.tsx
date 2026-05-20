'use client';
import { useState, useEffect, useRef } from 'react';
import './ConsoleCLI.style.css';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

interface ConsoleCLIProps {
  onExit: () => void;
}

const Console: React.FC<ConsoleCLIProps> = ({ onExit }) => {
  const { lang, t, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
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
      `Type 'exit' to return to the graphic user interface.`,
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

  const sudoEgg = (raw: string) => {
    const target = raw.replace(/^sudo\s+/, '').trim();
    if (!target) return ['usage: sudo <command>'];
    return [
      `[sudo] password for dave: ********`,
      `dave is not in the sudoers file. This incident will be reported. 😄`,
      `Just kidding — try running '${target}' without sudo.`,
    ];
  };

  const handleCommandExecution = (cmd: string) => {
    const raw = cmd.trim();
    const trimmed = raw.toLowerCase();

    // Handle prefixed commands first
    if (trimmed.startsWith('echo ')) {
      const text = raw.slice(5).trim();
      setHistory((prev) => [...prev, text || '', '']);
      return;
    }

    if (trimmed.startsWith('sudo ')) {
      setHistory((prev) => [...prev, ...sudoEgg(trimmed), '']);
      return;
    }

    if (trimmed.startsWith('cat ')) {
      const file = trimmed.slice(4).trim();
      setHistory((prev) => [
        ...prev,
        `cat: ${file}: Permission denied (nice try 😉). Try 'ls' to see what's public.`,
        '',
      ]);
      return;
    }

    switch (trimmed) {
      case 'help':
      case '-h':
        setHistory((prev) => [
          ...prev,
          '📚 Available commands:',
          '  about       — Who is Dave',
          '  whoami      — Quick identity dump',
          '  skills      — Tech stack',
          '  projects    — Featured projects',
          '  experience  — Work history',
          '  contact     — Get in touch',
          '  social      — Social media links',
          '  ls          — List sections',
          '  pwd         — Print working directory',
          '  echo <text> — Echo back text',
          '  date        — Show current date',
          '  time        — Show current time',
          '  theme       — Toggle dark/light theme',
          '  lang        — Toggle EN/ES language',
          '  banner      — Show ASCII banner',
          '  clear       — Clear console',
          '  exit        — Return to graphic interface',
          '  help, -h    — Show this message',
          '',
          '🎮 Easter eggs: try "hack", "matrix", "spotify", "coffee", "sudo", "rm -rf /"',
          '',
        ]);
        break;
      case 'about':
        setHistory((prev) => [
          ...prev,
          `${siteConfig.name} — ${siteConfig.role[lang]}`,
          siteConfig.bio[lang],
          `Location: ${siteConfig.location} ${siteConfig.locationFlag ?? ''}`.trim(),
          siteConfig.available
            ? `Status: ${t.about.available} ✓`
            : `Status: ${t.about.unavailable}`,
          '',
        ]);
        break;
      case 'whoami':
        setHistory((prev) => [
          ...prev,
          `dave@daev:~$ ${siteConfig.name} (${siteConfig.alias})`,
          `Role: ${siteConfig.role[lang]}`,
          `Location: ${siteConfig.location}`,
          `Email: ${siteConfig.email}`,
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
      case 'ls':
        setHistory((prev) => [
          ...prev,
          '📁 home/',
          '   ├── about/',
          '   ├── experience/',
          '   ├── skills/',
          '   ├── projects/',
          '   └── contact/',
          '📰 blog/',
          '🎨 theme.config',
          '🌍 lang.config',
          '🔐 secrets/  (access denied)',
          '',
        ]);
        break;
      case 'pwd':
        setHistory((prev) => [...prev, '/home/dave', '']);
        break;
      case 'date':
        setHistory((prev) => [...prev, new Date().toString(), '']);
        break;
      case 'time': {
        const now = new Date();
        setHistory((prev) => [
          ...prev,
          `🕐 ${now.toLocaleTimeString()}`,
          `It's always a great time to hire me 😉`,
          '',
        ]);
        break;
      }
      case 'theme':
        toggleTheme();
        setHistory((prev) => [
          ...prev,
          `🎨 Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode.`,
          '',
        ]);
        break;
      case 'lang':
        toggleLang();
        setHistory((prev) => [
          ...prev,
          `🌍 Language switched to ${lang === 'en' ? 'ES' : 'EN'}.`,
          '',
        ]);
        break;
      case 'banner':
        setHistory((prev) => [
          ...prev,
          '  ____    _    _____     __',
          ' |  _ \\  / \\  | ____|\\   / /',
          ' | | | |/ _ \\ |  _|   \\ / / ',
          ' | |_| / ___ \\| |___   V /  ',
          ' |____/_/   \\_\\_____|  \\_/  ',
          '',
          `   ${siteConfig.role[lang]} — ${siteConfig.location}`,
          '',
        ]);
        break;
      case 'clear':
      case 'cls':
        setHistory([]);
        setHelper([]);
        break;
      case 'exit':
      case 'gui':
      case 'quit':
      case 'logout':
        setHistory((prev) => [...prev, 'Loading graphic user interface...']);
        setTimeout(() => onExit(), 1200);
        break;

      // Easter eggs
      case 'hack':
        setHistory((prev) => [
          ...prev,
          '🔓 Accessing secret vault...',
          '   ████████████░░░░░░░░  60%',
          '   ████████████████░░░░  80%',
          '   ████████████████████ 100%',
          '   Decrypting files...',
          '   ...you found nothing. Sorry! 😄',
          '',
        ]);
        break;
      case 'matrix':
        setHistory((prev) => [
          ...prev,
          '01001000 01100101 01101100 01101100 01101111',
          '   ⠀⠀⠀⠐⠂⠂⠠⠀⠀⠀⠀⠂⠀⠈⠀⠂⠐',
          '   ⠁⠐⠂⠀⠈⠂⠀⠈⠀⠐⠀⠀⠂⠁⠀⠂⠂',
          '   ⠐⠀⠈⠀⠂⠐⠁⠀⠐⠂⠁⠐⠀⠁⠐⠂⠁',
          'Wake up, Neo... 🐰',
          'The Matrix has you. Follow the white rabbit.',
          '',
        ]);
        break;
      case 'spotify':
        setHistory((prev) => [
          ...prev,
          '🎵 Now playing: "Chasing Code Dreams"',
          '   by Dave & The Frontend Orchestra',
          '🎧 ▶ 2:43 ────●──────── 3:21',
          '',
        ]);
        break;
      case 'coffee':
        setHistory((prev) => [
          ...prev,
          '   ( (',
          '    ) )',
          '  ........',
          '  |      |]',
          '  \\      /',
          '   `----\'',
          '☕ Brewing your favorite coffee...',
          '   ...this is where the magic happens. *sips* 😋',
          '',
        ]);
        break;
      case 'rm -rf /':
      case 'rm -rf /*':
        setHistory((prev) => [
          ...prev,
          '⚠️  Permission denied: nice try.',
          'I respect your courage, but my filesystem is sandboxed. 😄',
          '',
        ]);
        break;
      case 'vim':
      case 'nano':
      case 'emacs':
        setHistory((prev) => [
          ...prev,
          `${trimmed}: editor not available in this sandbox.`,
          `(But yes, I use ${trimmed} in real life.)`,
          '',
        ]);
        break;
      case 'ping':
        setHistory((prev) => [
          ...prev,
          'PING dave.tech (127.0.0.1): 56 data bytes',
          '64 bytes from 127.0.0.1: time=0.042 ms',
          '64 bytes from 127.0.0.1: time=0.039 ms',
          '64 bytes from 127.0.0.1: time=0.041 ms',
          '✓ I’m alive and ready to ship code.',
          '',
        ]);
        break;
      case '42':
        setHistory((prev) => [
          ...prev,
          'The Answer to the Ultimate Question of Life, the Universe, and Everything.',
          '— Douglas Adams',
          '',
        ]);
        break;
      case 'hire':
      case 'hire me':
        setHistory((prev) => [
          ...prev,
          '🚀 Great choice! Reach me here:',
          `   Email    : ${siteConfig.email}`,
          `   WhatsApp : ${siteConfig.whatsapp}`,
          `   LinkedIn : ${siteConfig.links.linkedin}`,
          '',
          "Type 'exit' to head back to the GUI and open the contact form.",
          '',
        ]);
        break;
      case '':
        break;
      default:
        setHistory((prev) => [
          ...prev,
          `command not found: ${cmd}`,
          `Type 'help' to see available commands.`,
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
    <div className="console animate-fade-in" onClick={focusInput} tabIndex={0}>
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
