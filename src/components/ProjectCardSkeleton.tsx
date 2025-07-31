import React from 'react';

const ProjectCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col animate-pulse">
            {/* Image skeleton */}
            <div className="relative overflow-hidden h-64 flex-shrink-0 bg-gray-200"></div>
            
            {/* Content skeleton */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title skeleton */}
                <div className="mb-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
                
                {/* Description skeleton */}
                <div className="flex-grow mb-6">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                </div>
                
                {/* Button skeleton */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;
