
import { GitHubUser } from '@/types';
import { MapPin, Link, Users, GitFork } from 'lucide-react';

interface UserProfileProps {
  user: GitHubUser;
}

/**
 * UserProfile component to display GitHub user information
 */
const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="w-full animate-slide-up">
      <div className="w-full flex flex-col md:flex-row gap-6 items-center md:items-start p-6 rounded-xl bg-white border border-border/50 shadow-elegant">
        <div className="flex-shrink-0">
          <img 
            src={user.avatar_url} 
            alt={`${user.login}'s avatar`}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-border object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold">
            {user.name || user.login}
          </h2>
          
          <a 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 mt-1"
          >
            @{user.login}
          </a>
          
          {user.bio && (
            <p className="mt-3 text-foreground/80">{user.bio}</p>
          )}
          
          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
            {user.location && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.blog && (
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Link className="h-4 w-4" />
                <span>Website</span>
              </a>
            )}
            
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{user.followers} followers</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <GitFork className="h-4 w-4" />
              <span>{user.public_repos} repositories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
