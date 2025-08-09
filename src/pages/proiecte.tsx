import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import ProjectCard from '@/components/ProjectCard';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';
import { projectService, Project } from '@/lib/services/projectService';

const ProiectePage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
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

    const getProjectHref = (projectId: string): string => {
        switch (projectId) {
            case '1':
                return '/proiecte/sanatate-inainte-de-toate';
            case '2':
                return '/proiecte/educatie-nutritionala-in-scoli';
            case '3':
                return '/proiecte/campanii-de-promovare-online-si-offline';
            default:
                return '#';
        }
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
                                        href={getProjectHref(project.id)}
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
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProiectePage;
