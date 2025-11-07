import React from 'react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col">
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-cyan-400 mb-1">
          {article.title?.zh || 'No Chinese Title'}
        </h3>
        <h4 className="text-lg font-semibold text-gray-300 mb-4">
          {article.title?.en || 'No English Title'}
        </h4>
        <div className="text-gray-400 text-base leading-relaxed flex-grow">
           <p>{article.summary?.zh || 'No Chinese summary available.'}</p>
           <p className="mt-2 text-gray-500 italic">{article.summary?.en || 'No English summary available.'}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Source: {article.source}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
