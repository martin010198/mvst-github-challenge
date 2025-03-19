
interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * ErrorState component to display error messages
 */
const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-destructive/10 mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-10 h-10 text-destructive"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      
      <h2 className="text-xl font-medium text-foreground mb-2">Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
