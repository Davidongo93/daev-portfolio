'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Icono de búsqueda

const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]); // Simulación de predicción de resultados

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simulación de predicciones (puedes implementar la lógica real)
    if (value.length > 1) {
      setSuggestions(['Result 1', 'Result 2', 'Result 3'].filter((item) => item.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative mb-6 mx-1">
      <div
        className={`flex items-center px-1 py-2 rounded-full transition-all duration-300 ${isExpanded ? 'w-72' : 'w-min'} h-10 bg-white-01 backdrop-blur-lg`}
      >
        <FaSearch
        className="text-white relative flex items-start w-16 h-6 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
         />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={`ml-2 bg-transparent text-white border-none outline-none w-full transition-opacity duration-800 ${isExpanded ? 'opacity-100' : 'opacity-0'} `}
        />
      </div>
      
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 bg-white rounded-lg shadow-lg w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
