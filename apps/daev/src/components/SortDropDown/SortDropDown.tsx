'use client';
import React from 'react';

interface SortDropdownProps {
  sortOption: 'title' | 'date';
  onSortChange: (option: 'title' | 'date') => void;
  labels?: { title: string; date: string };
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  onSortChange,
  labels = { title: 'Sort by title', date: 'Sort by date' },
}) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value as 'title' | 'date')}
      aria-label="Sort posts"
      className="px-4 py-2.5 rounded-full bg-surface-el border border-border text-fore text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition cursor-pointer"
    >
      <option value="title">{labels.title}</option>
      <option value="date">{labels.date}</option>
    </select>
  );
};

export default SortDropdown;
