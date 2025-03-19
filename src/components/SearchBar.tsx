
import { useState, FormEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * SearchBar component for searching GitHub usernames
 */
const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() && !isLoading) {
      await onSearch(username.trim());
    }
  };

  const clearSearch = () => {
    setUsername('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="search-input pl-12 pr-10"
            disabled={isLoading}
          />
          
          {username && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!username.trim() || isLoading}
          className="mt-4 w-full bg-accent text-accent-foreground font-medium py-3 px-4 rounded-xl
            transition-all duration-200 hover:bg-accent/90 flex items-center justify-center
            disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            <span>Search Repositories</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
