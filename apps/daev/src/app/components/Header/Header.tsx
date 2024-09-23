// components/Header/Header.tsx
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaUser, FaTools, FaProjectDiagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import IconButton from '../IconButton/IconButton';
import TerminalButton from '../TerminalButton/TerminalButton';

interface HeaderProps {
  onStateChange: (newValue: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onStateChange }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={` flex justify-between items-center w-full h-min fixed top-0  ${
        scrolling ? 'bg-gray-800 shadow-lg' : 'bg-gray-800 opacity-40'
      } transition-all duration-300 backdrop-blur-md`}
    >
      <div className="container mx-auto flex justify-between items-center mt-5">
        {/* Nombre centrado en pantallas grandes */}
        <h1 className="text-xl md:text-3xl font-bold text-white text-left md:text-center flex-1">
          David Orlando Miranda
        </h1>

        {/* Menú Hamburguesa */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navegación principal para pantallas grandes */}
        <div className={`hidden md:flex space-x-6 items-center flex-1 justify-center`}>
          <IconButton href="#about" icon={<FaUser />} label="About" />
          <IconButton href="#skills" icon={<FaTools />} label="Skills" />
          <IconButton href="#projects" icon={<FaProjectDiagram />} label="Projects" />
          <IconButton href="#contact" icon={<FaEnvelope />} label="Contact" />
          <IconButton
            href="https://github.com/Davidongo93"
            icon={<FaGithub />}
            label="GitHub"
          />
                    <IconButton
            href="https://www.linkedin.com/in/domirandar/"
            icon={<FaLinkedin />}
            label="LinkedIn"
          />
          <TerminalButton onStateChange={onStateChange} />
        </div>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-start p-4 space-y-4 md:hidden">
          <IconButton href="#about" icon={<FaUser />} label="About" />
          <IconButton href="#skills" icon={<FaTools />} label="Skills" />
          <IconButton href="#projects" icon={<FaProjectDiagram />} label="Projects" />
          <IconButton href="#contact" icon={<FaEnvelope />} label="Contact" />
          <IconButton
            href="https://github.com/Davidongo93"
            icon={<FaGithub />}
            label="GitHub"
          />
          <IconButton
            href="https://www.linkedin.com/in/domirandar/"
            icon={<FaLinkedin />}
            label="LinkedIn"
          />
          <IconButton href="" icon={<TerminalButton onStateChange={onStateChange} />} label="CLI version" />
        </div>
      )}
    </nav>
  );
};

export default Header;
