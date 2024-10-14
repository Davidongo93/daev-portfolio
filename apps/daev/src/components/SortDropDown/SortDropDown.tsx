// src/components/SortDropdown/SortDropdown.tsx

'use client';
import React from 'react';

interface SortDropdownProps {
  sortOption: 'title' | 'date'; // Tipo para la opción de ordenamiento
  onSortChange: (option: 'title' | 'date') => void; // Callback para manejar el cambio de ordenamiento
}

// Componente que renderiza el dropdown para ordenar los posts
const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, onSortChange }) => {
  return (
    <select 
      value={sortOption} 
      onChange={(e) => onSortChange(e.target.value as 'title' | 'date')}
      className="ml-4 p-2 border border-gray-300 rounded-md bg-white-01 backdrop-blur-lg text-white"
    >
      <option value="title">Ordenar por Título</option>
      <option value="date">Ordenar por Fecha</option>
    </select>
  );
};

export default SortDropdown;
