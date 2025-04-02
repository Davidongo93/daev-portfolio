'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  suggestions?: string[];
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  suggestions = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Usamos el debounce hook correctamente
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Efecto principal que maneja la búsqueda con debounce
  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  // Actualización de sugerencias
  const updateSuggestions = useCallback((term: string) => {
    if (term.length > 1) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  // Actualiza sugerencias cuando cambia searchTerm
  useEffect(() => {
    updateSuggestions(searchTerm);
  }, [searchTerm, updateSuggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    // Llamamos directamente a onSearch sin debounce para selección inmediata
    onSearch(suggestion);
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

      {showSuggestions && (
        <ul className="absolute mt-2 bg-white rounded-lg shadow-lg w-full z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
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
