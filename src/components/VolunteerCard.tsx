import React from 'react';
import { Member } from '@/lib/services/membersService';

interface VolunteerCardProps {
  volunteer: Member;
  isMobile?: boolean;
  onCardClick: (volunteer: Member) => void;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer, isMobile = false, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(volunteer);
  };

  return (
    <div
      className={`flex-shrink-0 ${isMobile ? 'w-full px-4' : 'w-1/3 px-3'}`}
    >
      <div
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-80">
          <img
            src={volunteer.imageUrl}
            alt={volunteer.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {volunteer.name}
          </h3>
          <p className="text-gray-700 font-medium mb-6">
            {volunteer.position}
          </p>
          <button className="w-full bg-[#09a252] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
            Citește mai mult
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;