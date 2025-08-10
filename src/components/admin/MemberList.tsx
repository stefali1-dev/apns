import React, { useState } from 'react';
import { Member } from '@/lib/types/member';
import Button from '@/components/ui/Button';

interface MemberListProps {
  members: Member[];
  loading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onSearch?: (query: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-3 text-green-600">Se încarcă membrii...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Caută membri după nume, poziție..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          />
        </div>
        <div className="text-sm text-gray-600 ml-4">
          {members.length} {members.length === 1 ? 'membru găsit' : 'membri găsiți'}
        </div>
      </div>

      {/* Members Grid */}
      {members.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Niciun membru găsit</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Încearcă să modifici criteriile de căutare.' : 'Începe prin a crea primul membru.'}
          </p>
        </div>
      ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Member Image */}
              <div className="relative overflow-hidden h-48 bg-gray-200 flex-shrink-0">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
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

              {/* Member Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-green-600 font-medium line-clamp-1">
                      {member.position}
                    </p>
                    {member.secondaryPosition && (
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {member.secondaryPosition}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0 ml-2">
                    #{member.priority}
                  </span>
                </div>

                {/* Description with fixed height */}
                <div className="mb-3 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3 min-h-[3.6rem]">
                    {member.description}
                  </p>
                </div>

                {/* Specializations */}
                {member.specializations && member.specializations.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {member.specializations.slice(0, 2).map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {spec}
                        </span>
                      ))}
                      {member.specializations.length > 2 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{member.specializations.length - 2} mai multe
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="mb-4 space-y-1">
                  {member.email && (
                    <p className="text-xs text-gray-500 flex items-center line-clamp-1">
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <span className="truncate">{member.email}</span>
                    </p>
                  )}
                  {member.phone && (
                    <p className="text-xs text-gray-500 flex items-center line-clamp-1">
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      <span className="truncate">{member.phone}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 mt-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(member)}
                  >
                    Editează
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(member)}
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

export default MemberList;
