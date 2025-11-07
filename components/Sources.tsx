
import React from 'react';
import type { Source } from '../types';

interface SourcesProps {
  sources: Source[];
}

const Sources: React.FC<SourcesProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
        Sources
      </h2>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.web.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-gray-700 text-cyan-300 px-3 py-1 rounded-full hover:bg-cyan-800 hover:text-white transition-colors duration-200"
          >
            {source.web.title || new URL(source.web.uri).hostname}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sources;
