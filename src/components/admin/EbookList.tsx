import React, { useState } from 'react';
import { EBook } from '@/lib/types/ebook';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface EbookListProps {
  ebooks: EBook[];
  loading: boolean;
  onEdit: (ebook: EBook) => void;
  onDelete: (ebook: EBook) => void;
  onSearch?: (query: string) => void;
}

const EbookList: React.FC<EbookListProps> = ({
  ebooks,
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

  const formatPrice = (price?: number, isFree?: boolean) => {
    if (isFree) return 'Gratuit';
    if (price) return `${price} RON`;
    return 'N/A';
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-28 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            name="search"
            placeholder="Caută ebook-uri..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="text-sm text-gray-600 ml-4">
          {ebooks.length} {ebooks.length === 1 ? 'ebook găsit' : 'ebook-uri găsite'}
        </div>
      </div>

      {/* Ebooks Grid */}
      {ebooks.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Niciun ebook găsit</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Încearcă să modifici criteriile de căutare.' : 'Începe prin a crea primul ebook.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Ebook Cover */}
              <div className="relative overflow-hidden h-64 bg-gray-200 flex-shrink-0">
                {ebook.imageUrl ? (
                  <img
                    src={ebook.imageUrl}
                    alt={ebook.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                )}
                {/* Price badge */}
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    ebook.isFree 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {formatPrice(ebook.price, ebook.isFree)}
                  </span>
                </div>
              </div>

              {/* Ebook Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-green-600 font-medium">
                      {ebook.category}
                    </p>
                  </div>
                </div>

                {/* Authors */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {ebook.authors.slice(0, 2).map((author, index) => (
                      <span
                        key={author.id}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {author.name}
                      </span>
                    ))}
                    {ebook.authors.length > 2 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{ebook.authors.length - 2} mai mulți
                      </span>
                    )}
                  </div>
                </div>

                {/* Description with fixed height */}
                <div className="mb-3 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3 min-h-[3.6rem]">
                    {truncateText(ebook.shortDescription)}
                  </p>
                </div>

                {/* Meta info */}
                <div className="mb-4 space-y-1">
                  <p className="text-xs text-gray-500 flex items-center">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="truncate">{ebook.pageCount} pagini</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="truncate">{formatDate(ebook.publishedDate)}</span>
                  </p>
                  {ebook.fileUrl && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      <span className="truncate">PDF disponibil</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 mt-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(ebook)}
                  >
                    Editează
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(ebook)}
                  >
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

export default EbookList;
