import React from 'react';

interface VolunteerCardSkeletonProps {
    className?: string;
}

const VolunteerCardSkeleton: React.FC<VolunteerCardSkeletonProps> = ({ 
    className = "" 
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col animate-pulse ${className}`}>
            {/* Image skeleton */}
            <div className="relative overflow-hidden h-64 bg-gray-200 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Name skeleton */}
                <div className="h-5 bg-gray-200 rounded mb-3 w-4/5"></div>
                
                {/* Positions skeleton - maintaining same structure as real card */}
                <div className="mb-4 flex-grow">
                    <div className="space-y-1 min-h-[3rem]">
                        {/* Primary position */}
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2 flex-shrink-0"></span>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        
                        {/* Secondary position */}
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2 flex-shrink-0"></span>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
                
                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded-lg mt-auto"></div>
            </div>
        </div>
    );
};

export default VolunteerCardSkeleton;
