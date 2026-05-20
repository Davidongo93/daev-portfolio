import React from 'react';
import ProjectCard from '../Projects/ProjectCard';
import CodeButton from '../CodeButton/CodeButton';

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      name: "Interactive Population and Roads Ukraine",
      repoUrl: "https://github.com/Davidongo93/pop-ukraine-map",
      liveUrl: "https://pop-ukraine-map.vercel.app/",
      technologies: ["Next.js", "Tailwind", "TypeScript", "Leaflet", "GeoJSON"],
      date: "September 2024",
      type: "Tech Challenge",
      collaboration: null,
      thumbnail: "/thumbnails/ukraine.png",
    },
    {
      name: "Rescuer Branding & Gallery",
      repoUrl: "https://github.com/Davidongo93/rescatista",
      liveUrl: "https://rescatista.vercel.app",
      technologies: ["Vue", "Express", "MySQL"],
      date: "October 2023",
      type: "Freelance",
      collaboration: "rescatista",
      thumbnail: "/thumbnails/rescatista.png",
    },
    {
      name: "GitPulse — Repo Comparison Tool",
      repoUrl: "https://github.com/Davidongo93/git-pulse-web",
      liveUrl: "https://github.com/Davidongo93/git-pulse-web",
      technologies: ["TypeScript", "React", "GitHub API"],
      date: "February 2024",
      type: "Personal",
      collaboration: null,
      thumbnail: "/cityDrawImp.jpg",
    },
    {
      name: "VideoApp API Challenge",
      repoUrl: "https://github.com/Davidongo93/videoapp-API-challenge",
      liveUrl: "https://github.com/Davidongo93/videoapp-API-challenge",
      technologies: ["TypeScript", "NestJS", "PostgreSQL"],
      date: "January 2024",
      type: "Tech Challenge",
      collaboration: null,
      thumbnail: "/bwCity.jpg",
    },
    {
      name: "Disruptive Media — Full Stack MERN",
      repoUrl: "https://github.com/Davidongo93/disruptive-media",
      liveUrl: "https://github.com/Davidongo93/disruptive-media",
      technologies: ["TypeScript", "React", "Node.js", "MongoDB"],
      date: "September 2024",
      type: "Tech Challenge",
      collaboration: null,
      thumbnail: "/citydraw.png",
    },
    {
      name: "PI Videogames — Henry Full Stack",
      repoUrl: "https://github.com/Davidongo93/PI-Videogames-main",
      liveUrl: "https://github.com/Davidongo93/PI-Videogames-main",
      technologies: ["JavaScript", "React", "Redux", "Express", "PostgreSQL"],
      date: "December 2023",
      type: "Academic",
      collaboration: null,
      thumbnail: "/daveEmployee.png",
    },
  ];

  return (
    <section id="featured-projects" className="text-white py-16 bg-black flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-8">Featured Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">Ready to bring your project to life?</p>
        <CodeButton textButton="Let's Discuss Your Project" />
      </div>
    </section>
  );
};

export default FeaturedProjects;
