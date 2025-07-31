import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { Project } from '@/lib/services/projectService';

interface ProjectCardProps {
    project: Project;
    onClick?: (project: Project) => void;
    className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
    project, 
    onClick, 
    className = "" 
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(project);
        }
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl h-full flex flex-col ${className}`}
            onClick={handleClick}
        >
            <div className="relative overflow-hidden h-64 flex-shrink-0">
                <OptimizedImage
                    src={project.imageUrl || '/images/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    objectPosition="center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                    {project.title}
                </h3>
                
                <div className="flex-grow mb-6">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                        {project.description}
                    </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#09a252] font-medium text-sm">
                        Citește mai mult
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
};

export default ProjectCard;
