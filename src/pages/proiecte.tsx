import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import ProjectCard from '@/components/ProjectCard';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';
import { projectService, Project } from '@/lib/services/projectService';

const ProiectePage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const data = await projectService.getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Eroare la încărcarea proiectelor:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        // Pentru acum, doar log - poți adăuga modal sau redirect către pagină detaliată
        console.log('Proiect selectat:', project);
    };

    return (
        <Layout>
            <Head>
                <title>Proiectele Noastre - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Descoperă proiectele educaționale și campaniile de promovare a nutriției sănătoase derulate de APNS în comunitatea din Iași și nu numai." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Proiectele Noastre
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Inițiative educaționale și campanii de promovare a unui stil de viață sănătos în comunitate
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transition section */}
                <div className="bg-green-50 py-6">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center space-x-4">
                                <span className="h-px w-12 bg-green-300"></span>
                                <span className="text-[#09a252] font-medium">Impact pozitiv în comunitate</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Introducere */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                            <div className="text-center max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Împreună pentru sănătate
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Credem cu tărie că sănătatea nu înseamnă doar absența bolii, ci echilibrul dintre minte, corp și stil de viață. Ne bazăm pe o abordare cu adevărat multidisciplinară, care reunește expertiza mai multor specialități medicale și domenii conexe. Alături de noi se regăsesc medici din diferite specialități, psihologi, dieteticieni, antrenori de fitness și voluntari. Proiectele noastre implică activ instituții – de la grădinițe și școli, până la licee – prin activități de prevenție, educație nutrițională și stil de viață sănătos.
                                </p>
                            </div>
                        </div>

                        {/* Projects grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {isLoading ? (
                                // Display 3 skeleton cards to match the expected number of projects
                                Array.from({ length: 3 }, (_, index) => (
                                    <ProjectCardSkeleton key={`skeleton-${index}`} />
                                ))
                            ) : (
                                projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onClick={handleProjectClick}
                                    />
                                ))
                            )}
                        </div>

                        {/* Call to action */}
                        <div className="bg-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Vrei să te implici în proiectele noastre?</h2>
                            <p className="text-lg mb-6 max-w-2xl mx-auto text-green-100">
                                Susține misiunea noastră prin voluntariat sau donații și contribuie la promovarea 
                                nutriției sănătoase în comunitatea din Iași și din întreaga țară.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a 
                                    href="/enroll" 
                                    className="bg-white text-[#09a252] hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                >
                                    Devino voluntar
                                </a>
                                <a 
                                    href="/donate" 
                                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#09a252] font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                >
                                    Donează
                                </a>
                            </div>
                        </div>

                        {/* Partnerships section */}
                        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Parteneri în educație</h3>
                                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                                    Colaborăm cu instituții de învățământ din municipiul Iași și din alte orașe pentru 
                                    a implementa programe educaționale de nutriție și promovare a sănătății.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="text-center p-4">
                                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Școli primare</h4>
                                        <p className="text-sm text-gray-600">Programe de educație nutrițională pentru copii</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Gimnazii</h4>
                                        <p className="text-sm text-gray-600">Workshop-uri interactive pentru adolescenți</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Comunitatea</h4>
                                        <p className="text-sm text-gray-600">Campanii de conștientizare pentru familii</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProiectePage;
