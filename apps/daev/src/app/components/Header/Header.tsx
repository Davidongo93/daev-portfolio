// components/Header/Header.tsx
import { useState, useEffect } from "react";
import TerminalButton from "../TerminalButton/TerminalButton";

interface HeaderProps {
  onStateChange: (newValue: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onStateChange }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex justify-between items-center w-full fixed top-0 p-4 ${
        scrolling ? "bg-gray-800 shadow-lg" : "bg-transparent"
      } transition-all duration-300 backdrop-blur-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">[Tu Nombre]</h1>
        <div className="flex space-x-8">
          <a href="#about" className="hover:text-green-300">About</a>
          <a href="#skills" className="hover:text-green-300">Skills</a>
          <a href="#projects" className="hover:text-green-300">Projects</a>
          <a href="#contact" className="hover:text-green-300">Contact</a>
        </div>
        <TerminalButton onStateChange={onStateChange} />
      </div>
    </nav>
  );
};

export default Header;
