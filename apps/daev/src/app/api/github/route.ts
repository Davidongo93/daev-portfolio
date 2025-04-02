// pages/api/github.ts

import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Davidongo93';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Definir el cache en memoria
let cachedRepos: any = null; // Donde se almacenan los repositorios
let cacheTimestamp = 0; // Momento en que se cachearon los datos
const CACHE_DURATION = 24 *  60 * 60 * 1000; // Duración del cache (un dia)

export async function GET(request: Request) {
  const now = Date.now();

  // Verificar si los datos están en cache y si son válidos
  if (cachedRepos && (now - cacheTimestamp) < CACHE_DURATION) {
    // Devolver los datos cacheados si el cache aún es válido
    return NextResponse.json(cachedRepos);
  }

  // Si el cache no es válido o no hay datos cacheados, hacer el fetch a GitHub
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        // Puedes añadir tu token de GitHub aquí para evitar límites
        // 'Authorization': `token YOUR_GITHUB_TOKEN`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Error fetching repositories' },
        { status: response.status }
      );
    }

    const repos = await response.json();

    // Guardar los datos en cache y actualizar el timestamp
    cachedRepos = repos;
    cacheTimestamp = now;

    // Devolver los datos frescos desde GitHub
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching GitHub repositories', error },
      { status: 500 }
    );
  }
}
