import React from 'react';
import ProjectCard from '../Projects/ProjectCard';
import CodeButton from '../CodeButton/CodeButton';

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      name: "Interactive Population and Roads Ukraine",
      repoUrl: "https://github.com/Davidongo93/pop-ukraine-map",
      liveUrl: "https://pop-ukraine-map.vercel.app/",
      technologies: ["NextJs", "Tailwind", "Typescript", "Leaflet", "GeoJson"],
      date: "September 2024",
      type: "Tech Challenge",
      collaboration: null,
      thumbnail:"/ukraine.png"
    },
    {
      name: "Rescuer branding and gallery page",
      repoUrl: "https://github.com/Davidongo93/rescatista",
      liveUrl: "https://rescatista.vercel.app",
      technologies: ["Vue", "Express", "MySQL"],
      date: "October 2023",
      type: "Freelance",
      collaboration: "rescatista",
      thumbnail:"/rescatista.png"
    },
    {
      name: "Project C",
      repoUrl: "https://github.com/user/projectC",
      liveUrl: "https://projectC.com",
      technologies: ["Angular", "Firebase"],
      date: "May 2023",
      type: "Personal",
      collaboration: null,
      thumbnail:"/rescatista.png"
    }
  ];

  return (
    <section id="featured-projects" className="text-white py-16 bg-black flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div className="flex flex-row  justify-between mt-12 items-center gap-8">
        <p className="text-lg">Ready to bring your project to life?</p>
        <CodeButton textButton="Let's Discuss Your Project" />
      </div>
    </section>
  );
};

export default FeaturedProjects;
