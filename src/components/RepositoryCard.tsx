
import { GitHubRepository } from '@/types';
import { Star, GitFork, Circle, ExternalLink } from 'lucide-react';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

/**
 * RepositoryCard component to display a single repository
 */
const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get language-specific color
  const getLanguageColor = (language: string | null): string => {
    if (!language) return 'bg-gray-300';
    
    const colors: Record<string, string> = {
      TypeScript: 'bg-blue-400',
      JavaScript: 'bg-yellow-400',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C#': 'bg-purple-500',
      PHP: 'bg-indigo-400',
      Ruby: 'bg-red-600',
      Go: 'bg-blue-500',
      Swift: 'bg-orange-500',
      Kotlin: 'bg-purple-400',
      Rust: 'bg-orange-600',
      Dart: 'bg-blue-300',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-600',
      Shell: 'bg-gray-500',
    };
    
    return colors[language] || 'bg-gray-400';
  };

  console.log('Rendering repository:', repository.name);

  return (
    <div className="bg-white border border-border/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium truncate">
          <a 
            href={repository.html_url} 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
          >
            {repository.name}
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>
        
        {repository.fork && (
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
            Fork
          </span>
        )}
      </div>
      
      {repository.description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {repository.description}
        </p>
      )}
      
      <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {repository.language && (
          <div className="flex items-center gap-1.5">
            <Circle className={`h-2.5 w-2.5 ${getLanguageColor(repository.language)}`} />
            <span>{repository.language}</span>
          </div>
        )}
        
        {repository.stargazers_count > 0 && (
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            <span>{repository.stargazers_count.toLocaleString()}</span>
          </div>
        )}
        
        {repository.forks_count > 0 && (
          <div className="flex items-center gap-1.5">
            <GitFork className="h-3.5 w-3.5" />
            <span>{repository.forks_count.toLocaleString()}</span>
          </div>
        )}
        
        <div className="ml-auto text-xs">
          Updated {formatDate(repository.updated_at)}
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
