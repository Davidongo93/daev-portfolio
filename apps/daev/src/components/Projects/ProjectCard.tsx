import React from 'react';
import TechPill from '../TechPill/TechPill'; // Componente para las tecnologías (creado en el paso 3)

interface Project {
  name: string;
  repoUrl: string;
  liveUrl: string;
  technologies: string[];
  date: string;
  type: string;
  collaboration: string | null;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{project.date}</p>

      <div className="mb-4">
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          View Repo
        </a>
        <span className="mx-2">|</span>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          Live Demo
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <TechPill key={index} tech={tech} />
        ))}
      </div>

      {project.collaboration && (
        <div className="flex items-center mt-4">
          <img src={`/icons/${project.collaboration}.png`} alt={project.collaboration} className="w-8 h-8 mr-2" />
          <span className="text-gray-300">Collaboration with {project.collaboration}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
