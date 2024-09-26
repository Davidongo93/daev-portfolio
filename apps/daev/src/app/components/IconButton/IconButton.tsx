// components/IconButton/IconButton.tsx
import { ReactNode } from 'react';

interface IconButtonProps {
  href: string;
  icon: ReactNode; // Icono que será pasado como prop
  label: string; // Texto del botón
  rel: string;
  target: string;
}
interface ChildComponentProps {
    onStateChange: (newValue: boolean) => void;
  }

const IconButton: React.FC<IconButtonProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center text-white hover:text-green-300 transition text-center"
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-sm md:text-base">{label}</span>
    </a>
  );
};

export default IconButton;
