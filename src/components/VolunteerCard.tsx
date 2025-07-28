import React from 'react';
import { Member } from '@/lib/services/membersService';
import OptimizedImage from '@/components/OptimizedImage';

interface VolunteerCardProps {
    member: Member | null | undefined;
    onClick: (member: Member) => void;
    className?: string;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ 
    member, 
    onClick, 
    className = "" 
}) => {
    // Guard clause to handle undefined/null member
    if (!member) {
        return (
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
                <div className="relative overflow-hidden h-80 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading volunteer...</div>
                </div>
                <div className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-3/4 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    const handleClick = () => {
        if (member) {
            onClick(member);
        }
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${className}`}
            onClick={handleClick}
        >
            <div className="relative overflow-hidden h-80">
                <OptimizedImage
                    src={member.imageUrl || '/images/placeholder-avatar.jpg'}
                    alt={member.name || 'Volunteer'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    objectPosition="center 20%"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                />
            </div>
            <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name || 'Unknown Volunteer'}
                </h3>
                <p className="text-gray-700 font-medium mb-6">
                    {member.position || 'Position not specified'}
                </p>
                <button className="cursor-pointer w-full bg-[#09a252] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                    Citește mai mult
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
