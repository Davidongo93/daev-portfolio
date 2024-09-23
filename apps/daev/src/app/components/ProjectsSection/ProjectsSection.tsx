// components/ProjectsSection/ProjectsSection.tsx
import CardGrid from '../ProjectsGrid/ProjectsGrid';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <CardGrid />
      </div>
    </section>
  );
};

export default ProjectsSection;
