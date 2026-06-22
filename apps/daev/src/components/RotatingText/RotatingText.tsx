'use client';
import { useEffect, useState } from 'react';

interface RotatingTextProps {
  words: readonly string[];
  /** ms between words */
  interval?: number;
  className?: string;
}

/**
 * Cycles through a list of words with a subtle entrance animation.
 * Accessible: stops cycling when the user prefers reduced motion, and the
 * first word is server-rendered so it stays meaningful without JS / for SEO.
 */
const RotatingText: React.FC<RotatingTextProps> = ({ words, interval = 2400, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      key={reduced ? 'static' : index}
      className={`rotating-word text-accent ${className}`}
      aria-live="polite"
    >
      {words[index]}
    </span>
  );
};

export default RotatingText;
