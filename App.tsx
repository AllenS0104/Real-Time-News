import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getLatestNews } from './services/geminiService';
import type { NewsArticle, Source } from './types';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';
import Sources from './components/Sources';
import FilterBar from './components/FilterBar';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const categories = ['国内', '国际', '科技', '体育', '财经', '娱乐'];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const fetchNews = useCallback(async (category: string) => {
    setIsLoading(true);
    setError(null);
    setArticles([]);
    setSources([]);
    setSelectedSources([]);

    try {
      const { articles: fetchedArticles, sources: fetchedSources } = await getLatestNews(category);
      setArticles(fetchedArticles);
      setSources(fetchedSources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(activeCategory);
  }, [fetchNews, activeCategory]);

  const availableSources = useMemo(() => {
    if (articles.length === 0) return [];
    const sourcesSet = new Set(articles.map(a => a.source).filter(s => s !== 'Unknown'));
    return Array.from(sourcesSet).sort();
  }, [articles]);

  const handleToggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleClearSources = () => {
    setSelectedSources([]);
  };
  
  const filteredArticles = useMemo(() => {
    if (selectedSources.length === 0) {
      return articles;
    }
    return articles.filter(article => selectedSources.includes(article.source));
  }, [articles, selectedSources]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <main className="container mx-auto p-4 md:p-6">
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-400 text-lg text-center">{error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <Sources sources={sources} />
            <FilterBar 
              sources={availableSources}
              selectedSources={selectedSources}
              onToggleSource={handleToggleSource}
              onClear={handleClearSources}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <NewsCard key={`${article.title}-${index}`} article={article} />
              ))}
            </div>
            {filteredArticles.length === 0 && (
                <p className="text-center text-gray-500 mt-8 col-span-full">
                    {articles.length > 0 ? "No articles match your filter." : "No news articles found for this category."}
                </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
