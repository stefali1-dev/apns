import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import { membersService, Member } from '@/lib/services/membersService';

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
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
        document.body.style.overflow = 'unset';
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
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
                .gradient-bg {
                    background: linear-gradient(135deg, #10b968 0%, #059646 100%);
                }
                
                .member-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .member-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }

                .member-image {
                    width: 100%;
                    height: 280px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .member-card:hover .member-image {
                    transform: scale(1.05);
                }

                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                    padding: 20px;
                }

                .modal-content {
                    background: white;
                    border-radius: 16px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { 
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

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
                <section className="gradient-bg relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
                    </div>

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
                                <span className="text-green-700 font-medium">Oamenii din spatele misiunii</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-6xl mx-auto">
                        {loading ? (
                            // Loading state
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="member-card">
                                        <div className="loading-shimmer h-280px"></div>
                                        <div className="p-6">
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
                                    <div
                                        key={member.id}
                                        className="member-card"
                                        onClick={() => openModal(member)}
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="member-image"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-green-800 mb-2">
                                                {member.name}
                                            </h3>
                                            <p className="text-green-600 font-medium mb-4">
                                                {member.position}
                                            </p>
                                            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
                                                Citește mai mult
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Call to action */}
                        <div className="mt-12 bg-gradient-to-r from-green-700 to-green-600 rounded-lg shadow-lg p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Vrei să te alături echipei?</h2>
                            <p className="text-lg mb-6 max-w-2xl mx-auto">
                                Căutăm mereu profesioniști pasionați de nutriție și sănătate pentru a ne extinde echipa și impactul pozitiv în comunitate.
                            </p>
                            <a href="/contact" className="bg-white text-green-700 hover:bg-green-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-block">
                                Contactează-ne
                            </a>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && selectedMember && (
                    <div className="modal-backdrop" onClick={handleBackdropClick}>
                        <div className="modal-content">
                            <div className="relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                                <div className="overflow-hidden rounded-t-16">
                                    <img
                                        src={selectedMember.imageUrl}
                                        alt={selectedMember.name}
                                        className="w-full h-80 object-cover"
                                    />
                                </div>
                                
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-green-800 mb-2">
                                        {selectedMember.name}
                                    </h2>
                                    <p className="text-xl text-green-600 font-medium mb-6">
                                        {selectedMember.position}
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-700 mb-2">Despre</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                {selectedMember.description}
                                            </p>
                                        </div>
                                        
                                        {selectedMember.specializations && selectedMember.specializations.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-700 mb-3">Specializări</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedMember.specializations.map((spec, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {selectedMember.education && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-700 mb-2">Educație</h3>
                                                <p className="text-gray-700">{selectedMember.education}</p>
                                            </div>
                                        )}
                                        
                                        {selectedMember.experience && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-700 mb-2">Experiență</h3>
                                                <p className="text-gray-700">{selectedMember.experience}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TeamPage;