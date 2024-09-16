import { useState, useEffect } from "react";
import TerminalButton from "../TerminalButton/TerminalButton";

interface ChildComponentProps {
    onStateChange: (newValue: boolean) => void;
  }

const Header: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="flex justify-end items-center w-full fixed top-1 p-2 bg-transparent backdrop-blur-md">
      <div className="flex justify-center items-center space-x-8">
        <TerminalButton onStateChange={onStateChange} />
      </div>
    </nav>
  );
};

export default Header;
