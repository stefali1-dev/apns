import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import Image from 'next/image';

const CampaniiDePromovareOnlineOfflinePage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Campanii de promovare online și offline - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Proiectul 'Campanii de promovare online și offline' - educație nutrițională prin materiale vizuale, campanii pe rețele sociale și conținut adaptat pentru părinți și profesori." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Campanii de promovare online și offline
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Educație nutrițională prin toate canalele de comunicare
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
                                <span className="text-[#09a252] font-medium">Informare și educare</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Conștientizarea unui stil de viață sănătos începe cu accesul la informație corectă. De aceea, APNS derulează constant campanii de educație nutrițională în mediul online și offline, pentru a ajunge cât mai aproape de oameni – în școli, dar și în casele lor.
                                </p>
                            </div>
                        </div>

                        {/* Campaign overview */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Campanii tematice adaptate</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Pentru susținerea demersurilor educaționale, APNS a derulat campanii tematice în mediul online și offline, adaptate diferitelor categorii de vârstă:
                                </p>
                            </div>
                        </div>

                        {/* Campaign types */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Tipurile de campanii</h2>
                            <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                <li><strong>Materiale vizuale offline:</strong> broșuri, flyere și afișe informative distribuite în școli și cabinete medicale, conținând recomandări nutriționale validate științific;</li>
                                <li><strong>Campanii online pe rețele sociale:</strong> prezență activă pe Facebook, Instagram și TikTok cu mesaje educaționale, video-uri scurte, rețete sănătoase și mituri în nutriție explicate simplu;</li>
                                <li><strong>Conținut pentru părinți și profesori:</strong> crearea de conținut specializat privind organizarea meselor și ghiduri pentru un stil de viață echilibrat în familie.</li>
                            </ul>
                        </div>

                        {/* Multi-channel approach */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Abordare multi-canal</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 text-xl">Offline</h3>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                                        <li>Distribuție în <strong>școli</strong></li>
                                        <li>Prezență în <strong>cabinete medicale</strong></li>
                                        <li>Materiale <strong>validate științific</strong></li>
                                        <li>Design <strong>atractiv și educativ</strong></li>
                                    </ul>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 text-xl">Online</h3>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                                        <li>Prezență pe <strong>Facebook, Instagram, TikTok</strong></li>
                                        <li><strong>Video-uri educaționale</strong> scurte</li>
                                        <li><strong>Rețete sănătoase</strong> accesibile</li>
                                        <li>Demontarea <strong>miturilor</strong> în nutriție</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Target audiences */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Grupuri țintă</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-gray-50 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Copii și adolescenți</h3>
                                    <p className="text-gray-600 text-sm">Conținut adaptat vârstei pentru formarea obiceiurilor sănătoase</p>
                                </div>
                                
                                <div className="text-center p-6 bg-gray-50 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Părinți</h3>
                                    <p className="text-gray-600 text-sm">Ghiduri practice pentru alimentația în familie</p>
                                </div>
                                
                                <div className="text-center p-6 bg-gray-50 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Profesori</h3>
                                    <p className="text-gray-600 text-sm">Resurse educaționale pentru integrarea în curriculum</p>
                                </div>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="text-center mb-6">
                                <Image
                                    src="/images/projects/5.jpg"
                                    alt="Campanii de promovare APNS"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mx-auto"
                                />
                                <p className="text-sm text-gray-600 mt-2 italic">Materiale educaționale și campanii de promovare</p>
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center mt-12">
                            <div className="bg-[#09a252] text-white rounded-lg p-8">
                                <h3 className="text-2xl font-bold mb-4">Urmărește campaniile noastre educaționale</h3>
                                <p className="text-green-100 mb-6 text-lg">
                                    Rămâi la curent cu cele mai noi informații despre nutriție și stil de viață sănătos
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="/contact"
                                        className="bg-white text-[#09a252] font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                    >
                                        Contactează-ne
                                    </a>
                                    <a
                                        href="/proiecte"
                                        className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-[#09a252] transition-colors duration-200"
                                    >
                                        Vezi toate proiectele
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CampaniiDePromovareOnlineOfflinePage;
