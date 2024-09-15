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

const CardGrid = () => {
  const [repos, setRepos] = useState([]);
  const [cardColors, setCardColors] = useState([]);

  useEffect(() => {
    // Fetch repositories from GitHub API
    fetch('https://api.github.com/users/Davidongo93/repos')
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        const colors = data.map(() => getRandomColorClass());
        setCardColors(colors);
      })
      .catch((error) => console.error('Error fetching repositories:', error));
  }, []);

  return (
    <div className="shadow border-4 rounded mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {repos.map((repo, index) => (
          <Link href={repo.url} key={repo.id}>
            <div className={`p-4 rounded shadow border ${cardColors[index]} w-auto h-auto`}>
              <div className="text-center text-black">
                <h2 className="text-bold">
                  {repo.description || 'No description'}
                </h2>
                <p className="text-black text-sm italic">
                  Language: {repo.language || 'Unknown'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
