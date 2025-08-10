import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { Member } from '@/lib/types/member';

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
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${className}`}>
                <div className="relative overflow-hidden h-64 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <div className="text-gray-500 text-sm">Loading volunteer...</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="h-5 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    <div className="flex-grow mb-4">
                        <div className="space-y-2 min-h-[3rem]">
                            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse mt-auto"></div>
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
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl h-full flex flex-col ${className}`}
            onClick={handleClick}
        >
            <div className="relative overflow-hidden h-64 flex-shrink-0">
                <OptimizedImage
                    src={member.imageUrl || '/images/placeholder-avatar.jpg'}
                    alt={member.name || 'Volunteer'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    objectPosition="center 20%"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {member.name || 'Unknown Volunteer'}
                </h3>
                
                {/* Poziții - Primary și Secondary - cu înălțime fixă */}
                <div className="mb-4 flex-grow">
                    <div className="space-y-1 min-h-[3rem]">
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-[#09a252] rounded-full mr-2 flex-shrink-0"></span>
                            <p className="text-gray-900 font-medium text-sm line-clamp-1">
                                {member.position || 'Position not specified'}
                            </p>
                        </div>
                        
                        {member.secondaryPosition ? (
                            <div className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-[#09a252] rounded-full mr-2 flex-shrink-0"></span>
                                <p className="text-gray-900 font-medium text-sm line-clamp-1">
                                    {member.secondaryPosition}
                                </p>
                            </div>
                        ) : (
                            // Placeholder pentru a menține înălțimea consistentă
                            <div className="h-[1.25rem]"></div>
                        )}
                    </div>
                </div>
                
                <button className="cursor-pointer w-full bg-[#09a252] text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm mt-auto">
                    Citește mai mult
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
