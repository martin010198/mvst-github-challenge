
import { useState, useMemo } from 'react';
import { GitHubRepository, RepositoryFilters } from '@/types';
import RepositoryCard from './RepositoryCard';
import FilterBar from './FilterBar';

interface RepositoryListProps {
  repositories: GitHubRepository[];
  languages: string[];
}

/**
 * RepositoryList component to display and filter repositories
 */
const RepositoryList = ({ repositories, languages }: RepositoryListProps) => {
  const [filters, setFilters] = useState<RepositoryFilters>({ name: '', language: '' });

  // Apply filters to repositories
  const filteredRepositories = useMemo(() => {
    return repositories.filter(repo => {
      // Filter by name
      const nameMatch = !filters.name || 
        repo.name.toLowerCase().includes(filters.name.toLowerCase());
      
      // Filter by language
      const languageMatch = !filters.language || 
        repo.language === filters.language;
      
      return nameMatch && languageMatch;
    });
  }, [repositories, filters]);

  console.log('Repositories count:', repositories.length);
  console.log('Filtered repositories count:', filteredRepositories.length);

  return (
    <div className="w-full">
      <FilterBar 
        languages={languages} 
        onFilterChange={setFilters} 
      />
      
      {filteredRepositories.length === 0 ? (
        <div className="mt-8 text-center p-8 bg-white rounded-xl border border-border/50 shadow-elegant">
          <p className="text-muted-foreground">No repositories found matching your filters.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRepositories.map(repo => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoryList;
