'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Icono de búsqueda

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Callback para manejar la búsqueda
  suggestions?: string[]; // Lista opcional de sugerencias para autocompletar
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      // Filtra las sugerencias en función del término de búsqueda
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Dispara la búsqueda en tiempo real o al hacer submit
  };

  return (
    <div className="relative mx-1">
      <div
        className={`flex items-center px-1 py-2 rounded-full transition-all duration-300 ${
          isExpanded ? 'w-72' : 'w-min'
        } h-10 bg-white-01 backdrop-blur-lg`}
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
          className={`ml-2 bg-transparent text-white border-none outline-none w-full transition-opacity duration-800 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="absolute mt-2 bg-white rounded-lg shadow-lg w-full z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSearchTerm(suggestion);
                onSearch(suggestion); // Disparar la búsqueda con la sugerencia seleccionada
                setFilteredSuggestions([]); // Limpiar sugerencias tras seleccionar
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
