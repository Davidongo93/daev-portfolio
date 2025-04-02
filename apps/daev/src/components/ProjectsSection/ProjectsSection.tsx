import React, { useState } from 'react';
import CardGrid from '../ProjectsGrid/ProjectsGrid';

const ProjectsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // Control del paginado
  const projectsPerPage = 3; // Proyectos por página

  // Aquí puedes agregar más lógica para manejar el número total de proyectos.
  const totalProjects = 12; // Número total de proyectos simulados (esto lo puedes modificar)
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Cambio de página
  };

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        {/* Aquí pasamos las props necesarias */}
        <CardGrid currentPage={currentPage} projectsPerPage={projectsPerPage} />

        {/* Paginación */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
