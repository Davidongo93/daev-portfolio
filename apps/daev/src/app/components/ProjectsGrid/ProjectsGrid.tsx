'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const getRandomShade = () => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return shades[Math.floor(Math.random() * shades.length)];
};

const getRandomColorClass = () => {
  const colors = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime', 
    'green', 'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple', 'fuchsia', 
    'pink', 'rose',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const shade = getRandomShade();
  return `bg-${randomColor}-${shade}`;
};

// Definir la interfaz de los repos
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  license: {
    name: string;
  } | null;
  updated_at: string;
}

const CardGrid = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [cardColors, setCardColors] = useState<string[]>([]);

  useEffect(() => {
    // Fetch a tu API para obtener los datos de GitHub
    fetch('/api/github')
      .then((response) => response.json())
      .then((data: Repo[]) => {
        setRepos(data);
        const colors = data.map(() => getRandomColorClass());
        setCardColors(colors);
      })
      .catch((error) => console.error('Error fetching repositories:', error));
  }, []);

  return (
    <div className="shadow border-4 rounded mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <Link
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`list-item-link p-4 rounded shadow-lg border ${cardColors[index]} w-full h-64 flex flex-col justify-between`}
          >
            <div className="flex flex-col">
              {/* Nombre del repositorio */}
              <h2 className="text-xl font-bold truncate">
                {repo.name}
              </h2>
              
              {/* Descripción */}
              <p className="text-sm mb-2">
                {repo.description || 'No description available.'}
              </p>

              {/* Lenguaje y Licencia */}
              <div className="flex flex-row justify-between items-center mb-2">
                <p className="text-xs italic">
                  <strong>Language:   </strong>   {repo.language || '  Unknown'}
                </p>
                <p className="text-xs italic">
                  <strong>License:  </strong>   {repo.license ? repo.license.name : '  No license'}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between items-center">
              {/* Información de Estrellas y Forks */}
              <div>
                <p className="text-xs">
                  <strong>Stars:</strong> {repo.stargazers_count}
                </p>
                <p className="text-xs">
                  <strong>Forks:</strong> {repo.forks_count}
                </p>
              </div>

              {/* Tamaño del Proyecto */}
              <div>
                <p className="text-xs">
                  <strong>Size:</strong> {repo.size} KB
                </p>
              </div>
            </div>

            {/* Última Actualización */}
            <p className="text-xs italic text-right mt-2">
              Last updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
