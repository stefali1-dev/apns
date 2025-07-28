import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import { membersService, Member } from '@/lib/services/membersService';
import VolunteerModal from '@/components/VolunteerModal';
import VolunteerCard from '@/components/VolunteerCard';

const TeamPage: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await membersService.getMembers();
                setMembers(data);
            } catch (error) {
                console.error('Eroare la încărcarea membrilor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const openModal = (member: Member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <Layout>
            <Head>
                <title>Echipa Noastră - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Cunoaște echipa APNS: nutriționiști, medici și specialiști dedicați promovării unui stil de viață sănătos prin educație nutrițională." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <style jsx>{`
                .loading-shimmer {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Echipa Noastră
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Cunoaște specialiștii dedicați care fac posibilă misiunea noastră de promovare a nutriției sănătoase
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
                                <span className="text-[#09a252] font-medium">Oamenii din spatele misiunii</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        {loading ? (
                            // Loading state
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="loading-shimmer h-80"></div>
                                        <div className="p-8">
                                            <div className="loading-shimmer h-6 mb-3 rounded"></div>
                                            <div className="loading-shimmer h-4 mb-4 rounded w-3/4"></div>
                                            <div className="loading-shimmer h-10 rounded w-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Members grid
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {members.map((member) => (
                                    <VolunteerCard
                                        key={member.id}
                                        member={member}
                                        onClick={openModal}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Call to action */}
                        <div className="mt-12 bg-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Vrei să te alături echipei?</h2>
                            <p className="text-lg mb-6 max-w-2xl mx-auto text-green-100">
                                Căutăm mereu profesioniști pasionați de nutriție și sănătate pentru a ne extinde echipa și impactul pozitiv în comunitate.
                            </p>
                            <a 
                                href="/contact" 
                                className="bg-white text-[#09a252] hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                            >
                                Contactează-ne
                            </a>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <VolunteerModal
                    volunteer={selectedMember}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        </Layout>
    );
};

export default TeamPage;