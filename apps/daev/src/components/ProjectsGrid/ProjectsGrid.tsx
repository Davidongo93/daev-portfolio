import React from 'react';
import Link from 'next/link';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  license: { name: string } | null;
  updated_at: string;
}

interface CardGridProps {
  currentPage: number;
  projectsPerPage: number;
}

const CardGrid: React.FC<CardGridProps> = ({ currentPage, projectsPerPage }) => {
  const [repos, setRepos] = React.useState<Repo[]>([]);

  React.useEffect(() => {
    fetch('/api/github')
      .then((response) => response.json())
      .then((data: Repo[]) => {
        setRepos(data);
      })
      .catch((error) => console.error('Error fetching repositories:', error));
  }, []);

  // Calcular los índices de los proyectos a mostrar
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = repos.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="shadow border-4 rounded mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((repo) => (
          <Link key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <div className="p-4 rounded shadow-lg border bg-gray-800 w-full h-64 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold truncate">{repo.name}</h2>
                <p className="text-sm mb-2">{repo.description || 'No description available.'}</p>
                <p className="text-xs italic">Language: {repo.language || 'Unknown'}</p>
              </div>
              <p className="text-xs italic text-right mt-2">Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
