import React, { useState } from 'react';
import { Article } from '@/lib/types/article';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
  onSearch?: (query: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading,
  onEdit,
  onDelete,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#09a252]"></div>
        <span className="ml-2 text-gray-600">Se încarcă articolele...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <Input
          name="search"
          placeholder="Caută articole după titlu, autor sau categorie..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nu există articole</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Nu s-au găsit articole pentru căutarea specificată.' : 'Încă nu ați adăugat niciun articol.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(article.publishDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3">
                      {article.excerpt ? truncateText(article.excerpt) : truncateText(article.content.replace(/<[^>]*>/g, ''))}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👤 {article.author}</span>
                      <span>🔗 /{article.slug}</span>
                    </div>
                  </div>
                  
                  {/* Article Image */}
                  {article.imageUrl && (
                    <div className="ml-6 flex-shrink-0">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(article)}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editează
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(article)}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Șterge
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
