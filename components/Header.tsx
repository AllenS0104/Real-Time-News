
import React from 'react';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
              <path d="M12.293 7.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293z" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-wider">
              Real-Time News
            </h1>
          </div>
          <nav className="flex space-x-2 md:space-x-4 bg-gray-700 p-1 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ease-in-out
                  ${activeCategory === category 
                    ? 'bg-cyan-500 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-600/50'
                  }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
