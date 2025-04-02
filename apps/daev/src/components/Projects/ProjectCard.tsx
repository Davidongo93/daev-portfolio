import React from 'react';
import Image from "next/legacy/image"; // Importamos el componente Image de Next.js
import TechPill from '../TechPill/TechPill';

interface Project {
  name: string;
  repoUrl: string;
  liveUrl: string;
  technologies: string[];
  date: string;
  type: string;
  collaboration: string | null;
  thumbnail: string; // Nueva propiedad para el snapshot
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
      {/* Imagen de Snapshot */}
      <div className="relative w-full h-48">
  <Image
    src={`/thumbnails${project.thumbnail}`}
    alt={`${project.name} thumbnail`}
    fill // Se usa fill para hacer que la imagen ocupe todo el contenedor
    className="object-cover opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100" // CSS `object-cover` se usa en la clase
  />
</div>


      {/* Detalles del proyecto */}
      <div className="p-4">
        <h3 className="text-l font-semibold mb-2">{project.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{project.date}</p>

        {/* Enlaces */}
        <div className="mb-4">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            View Repo
          </a>
          <span className="mx-2">|</span>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Live Demo
          </a>
        </div>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <TechPill key={index} tech={tech} />
          ))}
        </div>

        {/* Colaboración */}
        {project.collaboration && (
          <div className="flex items-center mt-4">
            <Image
              src={`/icons/${project.collaboration}.png`}
              alt={project.collaboration}
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-gray-300">Collaboration with {project.collaboration}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
