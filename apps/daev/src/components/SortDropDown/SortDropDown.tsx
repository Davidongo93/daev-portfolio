'use client';
import React from 'react';

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title'
  | 'read-desc'
  | 'read-asc';

interface SortDropdownProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  labels?: {
    newest: string;
    oldest: string;
    title: string;
    readLong: string;
    readShort: string;
  };
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  onSortChange,
  labels = {
    newest: 'Newest first',
    oldest: 'Oldest first',
    title: 'Title (A–Z)',
    readLong: 'Longest read',
    readShort: 'Shortest read',
  },
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
      <option value="read-desc">{labels.readLong}</option>
      <option value="read-asc">{labels.readShort}</option>
    </select>
  );
};

export default SortDropdown;
