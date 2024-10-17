// components/SkillsSection/SkillsSection.tsx
import React from 'react';
import TechPill from '../TechPill/TechPill'; // Importamos el componente de TechPill

const skillsData = {
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  tools: ['Git', 'Docker', 'Webpack', 'REST APIs'],
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="z-10 bg-gray-800 py-16 sticky">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <TechPill key={i} tech={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
