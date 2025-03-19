
/**
 * LoadingState component to display during API requests
 */
const LoadingState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="w-24 h-24 relative">
        <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-t-4 border-accent/60 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute inset-6 border-t-4 border-accent/30 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
      <p className="mt-6 text-lg font-medium text-foreground/70">Loading data...</p>
    </div>
  );
};

export default LoadingState;
