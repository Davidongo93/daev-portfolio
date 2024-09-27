import { ReactNode } from 'react';

interface IconButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  rel?: string;
  target?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ href, icon, label, rel, target }) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center text-white transition transform hover:scale-110 hover:text-green-300"
      rel={rel}
      target={target}
    >
      <div className="text-3xl">{icon}</div>
      <span className="text-sm md:text-base mt-1 relative">
        {label}
        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100">hello</span>
      </span>
    </a>
  );
};

export default IconButton;
