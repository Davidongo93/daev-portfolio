import { ReactNode } from 'react';

interface IconButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  size?: 'small' | 'medium' | 'large'; // Tamaños opcionales
  rel?: string;
  target?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ href, icon, label, size = 'medium', rel, target }) => {
  // Definir tamaños basados en la prop `size`
  const sizeClasses = {
    small: 'text-xl text-xs',     // Pequeño: ícono y texto pequeños
    medium: 'text-3xl text-base', // Mediano: ícono y texto medianos
    large: 'text-5xl text-lg',    // Grande: ícono y texto grandes
  };

  return (
    <a
      href={href}
      className="flex flex-col items-center text-white transition transform hover:scale-110 hover:text-green-300"
      rel={rel}
      target={target}
    >
      {/* Tamaño dinámico aplicado */}
      <div className={`${sizeClasses[size].split(' ')[0]}`}>{icon}</div>
      <span className={`${sizeClasses[size].split(' ')[1]} mt-1 relative`}>
        {label}
        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100">hello</span>
      </span>
    </a>
  );
};

export default IconButton;
