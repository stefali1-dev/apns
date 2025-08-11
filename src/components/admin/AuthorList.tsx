import React, { useState } from 'react';
import { Author } from '@/lib/types/ebook';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AuthorListProps {
  authors: Author[];
  loading: boolean;
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
  onSearch?: (query: string) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({
  authors,
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

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
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
            placeholder="Caută autori..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="text-sm text-gray-600 ml-4">
          {authors.length} {authors.length === 1 ? 'autor găsit' : 'autori găsiți'}
        </div>
      </div>

      {/* Authors Grid */}
      {authors.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Niciun autor găsit</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Încearcă să modifici criteriile de căutare.' : 'Începe prin a crea primul autor.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Author Image */}
              <div className="relative overflow-hidden h-48 bg-gray-200 flex-shrink-0">
                {author.imageUrl ? (
                  <img
                    src={author.imageUrl}
                    alt={author.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: 'center 20%' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">
                    {author.name}
                  </h3>
                  <p className="text-sm text-green-600 font-medium line-clamp-1">
                    {author.title}
                  </p>
                </div>

                {/* Bio with fixed height */}
                <div className="mb-4 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-4 min-h-[5.6rem]">
                    {truncateText(author.bio)}
                  </p>
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 mt-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(author)}
                  >
                    Editează
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(author)}
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

export default AuthorList;
