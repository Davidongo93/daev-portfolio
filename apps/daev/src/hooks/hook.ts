import { useState, useEffect } from 'react';

export const useTailwindColors = (): string => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const getRandomShade = () => {
      const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      return shades[Math.floor(Math.random() * shades.length)];
    };
    
    const getRandomColorClass = () => {
      const colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const shade = getRandomShade();
      return `bg-${randomColor}-${shade}`;
    };
    
    const randomColor = getRandomColorClass();
    setColor(randomColor);
  }, []);

  return color;
};
