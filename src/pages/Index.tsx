
import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';
import RepositoryList from '@/components/RepositoryList';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useGitHubApi } from '@/hooks/useGitHubApi';

/**
 * Main application page
 * Integrates all components and manages application state
 */
const Index = () => {
  const { 
    user, 
    repositories, 
    isLoading, 
    error, 
    fetchGitHubData, 
    resetData,
    getUniqueLanguages 
  } = useGitHubApi();
  
  const [searchedUsername, setSearchedUsername] = useState<string>('');

  /**
   * Handle search submit
   * @param username - GitHub username to search
   */
  const handleSearch = useCallback(async (username: string) => {
    setSearchedUsername(username);
    await fetchGitHubData(username);
  }, [fetchGitHubData]);

  /**
   * Handle retry action after error
   */
  const handleRetry = useCallback(() => {
    if (searchedUsername) {
      fetchGitHubData(searchedUsername);
    } else {
      resetData();
    }
  }, [fetchGitHubData, resetData, searchedUsername]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8 md:py-12 space-y-8">
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold tracking-tight mb-3">
                Explore GitHub Repositories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enter a GitHub username to view their repositories and filter them by name or programming language.
              </p>
            </div>
            
            <SearchBar 
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </section>
          
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={handleRetry} />
          ) : user ? (
            <section className="space-y-8 animate-fade-in">
              <UserProfile user={user} />
              
              <div>
                <h3 className="text-xl font-medium mb-4">
                  Repositories ({repositories.length})
                </h3>
                <RepositoryList 
                  repositories={repositories}
                  languages={getUniqueLanguages()}
                />
              </div>
            </section>
          ) : null}
        </div>
      </main>
      
      <footer className="bg-background border-t border-border/40 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>GitHub Repository Explorer - Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
