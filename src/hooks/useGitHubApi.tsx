
import { useState, useCallback } from 'react';
import { GitHubUser, GitHubRepository } from '@/types';
import { toast } from 'sonner';

/**
 * Custom hook to interact with GitHub API
 * Provides functions to fetch user data and repositories
 */
export const useGitHubApi = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Reset all data and states
   */
  const resetData = useCallback(() => {
    setUser(null);
    setRepositories([]);
    setError(null);
  }, []);

  /**
   * Fetch GitHub user data and repositories
   * @param username - GitHub username to fetch
   * @returns Promise<boolean> - Success state
   */
  const fetchGitHubData = useCallback(async (username: string): Promise<boolean> => {
    if (!username.trim()) {
      toast.error('Please enter a GitHub username');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error(`User "${username}" not found`);
        }
        throw new Error(`Error fetching user data: ${userResponse.statusText}`);
      }
      
      const userData: GitHubUser = await userResponse.json();
      setUser(userData);
      
      // Fetch repositories with sorting by last updated
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=1&sort=updated`
      );
      
      if (!reposResponse.ok) {
        throw new Error(`Error fetching repositories: ${reposResponse.statusText}`);
      }
      
      const reposData: GitHubRepository[] = await reposResponse.json();
      setRepositories(reposData);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get all unique languages from repositories
   * @returns Array of unique languages
   */
  const getUniqueLanguages = useCallback((): string[] => {
    const languages = repositories
      .map(repo => repo.language)
      .filter((language): language is string => language !== null);
    
    return ['All', ...new Set(languages)];
  }, [repositories]);

  return {
    user,
    repositories,
    isLoading,
    error,
    fetchGitHubData,
    resetData,
    getUniqueLanguages
  };
};
