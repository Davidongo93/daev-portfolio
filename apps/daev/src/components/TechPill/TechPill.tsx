import React from 'react';

const TechPill: React.FC<{ tech: string }> = ({ tech }) => {
  return (
    <span className="bg-accent/10 text-accent border border-accent/20 text-xs font-medium px-3 py-1 rounded-full hover:bg-accent/20 transition">
      {tech}
    </span>
  );
};

export default TechPill;
