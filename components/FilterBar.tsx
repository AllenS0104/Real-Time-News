import React from 'react';

interface FilterBarProps {
  sources: string[];
  selectedSources: string[];
  onToggleSource: (source: string) => void;
  onClear: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ sources, selectedSources, onToggleSource, onClear }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-300 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filter by Source
        </h2>
        {selectedSources.length > 0 && (
           <button 
             onClick={onClear}
             className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
           >
             Clear Filters
           </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => {
           const isSelected = selectedSources.includes(source);
           return (
            <button
              key={source}
              onClick={() => onToggleSource(source)}
              className={`text-sm px-3 py-1 rounded-full transition-all duration-200 border-2
                ${isSelected 
                  ? 'bg-cyan-500 text-white border-cyan-500 font-semibold' 
                  : 'bg-gray-700 text-gray-300 border-gray-700 hover:border-cyan-600 hover:text-cyan-300'
                }`}
            >
              {source}
            </button>
           )
        })}
      </div>
    </div>
  );
};

export default FilterBar;
