import React from 'react';

interface ArticleCardSkeletonProps {
    className?: string;
}

const ArticleCardSkeleton: React.FC<ArticleCardSkeletonProps> = ({ className = "" }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${className}`}>
            {/* Image skeleton */}
            <div className="h-56 bg-gray-200 animate-pulse"></div>
            
            <div className="p-6 flex flex-col flex-grow">
                {/* Date and author skeleton */}
                <div className="flex items-center justify-between mb-3">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                
                {/* Title skeleton */}
                <div className="mb-3">
                    <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                
                {/* Excerpt skeleton */}
                <div className="flex-grow mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
                
                {/* Read more skeleton */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
