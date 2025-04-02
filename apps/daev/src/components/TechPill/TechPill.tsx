import React from 'react';

const TechPill: React.FC<{ tech: string }> = ({ tech }) => {
  return (
    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
      {tech}
    </span>
  );
};

export default TechPill;
