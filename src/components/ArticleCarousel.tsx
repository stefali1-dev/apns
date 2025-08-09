import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { articleService, Article } from '@/lib/services/articleService';
import ArticleCard from './ArticleCard';

const ArticleCarousel: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleService.getArticles();
        // Afișăm primele 6 articole în carousel pentru a avea suficiente pentru mai multe pagini
        setArticles(data.slice(0, 6));
      } catch (error) {
        console.error('Eroare la încărcarea articolelor:', error);
      }
    };

    fetchArticles();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const articlesPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const maxArticleIndex = Math.max(totalPages - 1, 0);

  const nextArticle = () => {
    setCurrentArticleIndex(Math.min(currentArticleIndex + 1, maxArticleIndex));
  };

  const prevArticle = () => {
    setCurrentArticleIndex(Math.max(currentArticleIndex - 1, 0));
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Articole Recente
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-4">
              <span className="h-px w-12 bg-green-300"></span>
              <span className="text-[#09a252] font-medium">Informații valoroase pentru sănătatea ta</span>
              <span className="h-px w-12 bg-green-300"></span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden -mx-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentArticleIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 flex">
                  {articles
                    .slice(pageIndex * articlesPerPage, (pageIndex + 1) * articlesPerPage)
                    .map((article) => (
                      <div
                        key={article.id}
                        className={`flex-shrink-0 ${isMobile ? 'w-full px-3' : 'w-1/3 px-3'}`}
                        style={{ height: '590px' }}
                      >
                        <ArticleCard
                          article={article}
                          href={`/article/${article.slug}`}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {articles.length > articlesPerPage && (
            <>
              <button
                onClick={prevArticle}
                className={`absolute top-1/2 -left-6 transform -translate-y-1/2 bg-[#09a252] p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20 ${
                  currentArticleIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                disabled={currentArticleIndex === 0}
                style={{ marginTop: '-60px' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextArticle}
                className={`absolute top-1/2 -right-6 transform -translate-y-1/2 bg-[#09a252] p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20 ${
                  currentArticleIndex >= maxArticleIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                disabled={currentArticleIndex >= maxArticleIndex}
                style={{ marginTop: '-60px' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {articles.length > articlesPerPage && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentArticleIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentArticleIndex
                      ? 'bg-[#09a252] w-6'
                      : 'bg-green-200 hover:bg-green-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* View All Articles Button */}
          <div className="text-center mt-12">
            <Link
              href="/articole"
              className="bg-[#09a252] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
            >
              Vezi toate articolele
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleCarousel;
