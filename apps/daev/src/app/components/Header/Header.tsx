import { useState, useEffect } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import IconButton from '../IconButton/IconButton';
import TerminalButton from '../TerminalButton/TerminalButton';
import SearchBar from '../SearchBar/SearchBar';

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
      className={`z-10 flex justify-end align-center h-20  w-full sticky top-0 ${
        scrolling ? 'bg-gray-900 shadow-lg' : 'bg-gray-900 opacity-80'
      } transition-all duration-1000 backdrop-blur-md`}
    >
      <div className="flex-grow flex items-center justify-start flex-1 p-4 ml-4 ">
        {/* Menú Hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navegación principal para pantallas grandes */}
        <div className={`hidden md:flex space-x-6 items-center ml-8`}>
          <IconButton size='small' href="#about" icon={<FaUser />} label="About" />
          <IconButton size='small' href="#skills" icon={<FaTools />} label="Skills" />
          <IconButton size='small' href="#projects" icon={<FaProjectDiagram />} label="Projects" />
          <IconButton size='small' href="#contact" icon={<FaEnvelope />} label="Contact" />
          <IconButton
           size='small' 
            href="https://github.com/Davidongo93"
            icon={<FaGithub />}
            label="GitHub"
            target="_blank" // Abre en nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
          />
          <IconButton
           size='small' 
            href="https://www.linkedin.com/in/domirandar/"
            icon={<FaLinkedin />}
            label="LinkedIn"
            target="_blank" // Abre en nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
          />
          <IconButton
           size='small' 
            href=""
            icon={<TerminalButton onStateChange={onStateChange} />}
            label="Term"
          />
         </div>
          
          </div>
        <div className='w-80 mx-8 flex items-center justify-end'><SearchBar/></div>
      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-fit bg-gray-800 flex flex-col items-center p-4 space-y-4 md:hidden">
          <IconButton size='small' href="#about" icon={<FaUser />} label="About" />
          <IconButton size='small' href="#skills" icon={<FaTools />} label="Skills" />
          <IconButton size='small' href="#projects" icon={<FaProjectDiagram />} label="Projects" />
          <IconButton size='small' href="#contact" icon={<FaEnvelope />} label="Contact" />
          <IconButton
           size='small' 
            href="https://github.com/Davidongo93"
            icon={<FaGithub />}
            label="GitHub"
            target="_blank" // Abre en nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
          />
          <IconButton
           size='small' 
            href="https://www.linkedin.com/in/domirandar/"
            icon={<FaLinkedin />}
            label="LinkedIn"
            target="_blank" // Abre en nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
          />
          <IconButton
           size='small' 
            href=""
            icon={<TerminalButton onStateChange={onStateChange} />}
            label="CLI version"
          />
        </div>
      )}
    </nav>
  );
};

export default Header;
