
import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { RepositoryFilters } from '@/types';

interface FilterBarProps {
  languages: string[];
  onFilterChange: (filters: RepositoryFilters) => void;
}

/**
 * FilterBar component for filtering repositories by name and language
 */
const FilterBar = ({ languages, onFilterChange }: FilterBarProps) => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      name: nameFilter,
      language: languageFilter === 'All' ? '' : languageFilter
    });
  }, [nameFilter, languageFilter, onFilterChange]);

  const clearFilters = () => {
    setNameFilter('');
    setLanguageFilter('All');
  };

  const hasActiveFilters = nameFilter || languageFilter !== 'All';

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg
              bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              {nameFilter && (
                <span className="inline-flex items-center bg-secondary px-2 py-1 rounded-md text-xs">
                  Name: {nameFilter}
                </span>
              )}
              
              {languageFilter !== 'All' && (
                <span className="inline-flex items-center bg-secondary px-2 py-1 rounded-md text-xs">
                  Language: {languageFilter}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="p-4 mb-6 rounded-xl bg-white border border-border/50 shadow-elegant animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-filter" className="block text-sm font-medium mb-1">
                Repository Name
              </label>
              <input
                id="name-filter"
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Filter by name..."
                className="w-full p-2 border border-border rounded-lg text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="language-filter" className="block text-sm font-medium mb-1">
                Programming Language
              </label>
              <select
                id="language-filter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full p-2 border border-border rounded-lg text-sm bg-white"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
