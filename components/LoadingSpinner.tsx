
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <p className="text-cyan-400 mt-4 text-lg">Fetching latest news...</p>
    </div>
  );
};

export default LoadingSpinner;
