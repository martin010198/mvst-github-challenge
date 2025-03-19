
import { Github } from 'lucide-react';

/**
 * Header component displays the application title and GitHub icon
 */
const Header = () => {
  return (
    <header className="w-full bg-background py-5 border-b border-border/40">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github className="h-7 w-7 text-github-dark" />
          <h1 className="text-xl font-semibold tracking-tight">GitHub Repository Explorer</h1>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Powered by GitHub API
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
