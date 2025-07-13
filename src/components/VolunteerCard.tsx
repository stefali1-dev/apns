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
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
        onClick={handleCardClick}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-80">
          <img
            src={volunteer.imageUrl}
            alt={volunteer.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {volunteer.name}
          </h3>
          <p className="text-gray-900 font-medium mb-4">
            {volunteer.position}
          </p>
          <button className="w-full bg-[#09a252] text-white py-2 px-4 rounded-lg hover:bg-[#09a252] transition duration-300 font-medium">
            Citește mai mult
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;