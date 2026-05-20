'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-el border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition text-sm"
      />
    </div>
  );
};

export default SearchBar;
