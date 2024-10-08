import React from 'react';
import ProjectCard from '../Projects/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      name: "Project A",
      repoUrl: "https://github.com/user/projectA",
      liveUrl: "https://projectA.com",
      technologies: ["React", "Node.js", "MongoDB"],
      date: "January 2024",
      type: "Personal",
      collaboration: null,
    },
    {
      name: "Project B",
      repoUrl: "https://github.com/user/projectB",
      liveUrl: "https://projectB.com",
      technologies: ["Vue", "Express", "MySQL"],
      date: "March 2024",
      type: "Collaboration",
      collaboration: "Company X",
    },
    {
      name: "Project C",
      repoUrl: "https://github.com/user/projectC",
      liveUrl: "https://projectC.com",
      technologies: ["Angular", "Firebase"],
      date: "May 2023",
      type: "Personal",
      collaboration: null,
    },
  ];

  return (
    <section id="featured-projects" className="text-white py-16 bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg">Ready to bring your project to life?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 transition-transform transform hover:scale-105">
            Let's Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
