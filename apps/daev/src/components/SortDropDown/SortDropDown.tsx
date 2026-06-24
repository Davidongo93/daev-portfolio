'use client';
import React from 'react';

export type SortOption = 'date-desc' | 'date-asc' | 'title';

interface SortDropdownProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  labels?: { newest: string; oldest: string; title: string };
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  onSortChange,
  labels = { newest: 'Newest first', oldest: 'Oldest first', title: 'Title (A–Z)' },
}) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      aria-label="Sort posts"
      className="px-4 py-2.5 rounded-full bg-surface-el border border-border text-fore text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition cursor-pointer"
    >
      <option value="date-desc">{labels.newest}</option>
      <option value="date-asc">{labels.oldest}</option>
      <option value="title">{labels.title}</option>
    </select>
  );
};

export default SortDropdown;
