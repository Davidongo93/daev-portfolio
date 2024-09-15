'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getRandomShade = () => {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return shades[Math.floor(Math.random() * shades.length)];
};

const getRandomColorClass = () => {
  const colors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const shade = getRandomShade();
  return `bg-${randomColor}-${shade}`;
};

// Define the Repo interface
interface Repo {
  id: number;
  description: string | null;
  html_url: string;
  language: string | null;
}

const CardGrid = () => {
  const [repos, setRepos] = useState<Repo[]>([]); // Use Repo[] type for the repos array
  const [cardColors, setCardColors] = useState<string[]>([]); // Colors for the cards

  useEffect(() => {
    // Fetch repositories from GitHub API
    fetch('https://api.github.com/users/Davidongo93/repos')
      .then((response) => response.json())
      .then((data: Repo[]) => {
        setRepos(data); // Use the Repo type to ensure correct structure
        const colors = data.map(() => getRandomColorClass());
        setCardColors(colors);
      })
      .catch((error) => console.error('Error fetching repositories:', error));
  }, []);

  return (
    <div className="shadow border-4 rounded mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {repos.map((repo, index) => (
          <Link href={repo.html_url} key={repo.id}>
            <div className={`list-item-link p-4 rounded shadow border ${cardColors[index]} w-auto h-auto`}>
              <span className="text-center text-black">
                <h2 className="text-bold">
                  {repo.description || 'No description'}
                </h2>
                <p className="text-black text-sm italic">
                  Language: {repo.language || 'Unknown'}
                </p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
