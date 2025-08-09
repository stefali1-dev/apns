import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { Article } from '@/lib/services/articleService';

interface ArticleCardProps {
    article: Article;
    href?: string;
    className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
    article, 
    href,
    className = "" 
}) => {
    // Format the date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const content = (
        <div className={`bg-green-50 border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl h-full flex flex-col ${className}`}>
            <div className="relative overflow-hidden h-56 flex-shrink-0">
                <OptimizedImage
                    src={article.imageUrl || '/images/placeholder-article.jpg'}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    objectPosition="center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                {/* Date and author */}
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(article.publishDate)}
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {article.author}
                    </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight min-h-[3.4rem]">
                    {article.title}
                </h3>
                
                {/* Excerpt */}
                {article.excerpt && (
                    <div className="flex-grow mb-4 min-h-[4.5rem]">
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                            {article.excerpt}
                        </p>
                    </div>
                )}
                
                {/* Read more link */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-[#09a252] font-medium text-sm">
                        Citește articolul
                    </span>
                    <svg 
                        className="w-5 h-5 text-[#09a252] transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
};

export default ArticleCard;
