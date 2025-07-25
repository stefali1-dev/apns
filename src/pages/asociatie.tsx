import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';

const AsociatePage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Despre Asociație - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Descoperă misiunea și viziunea APNS în dezvoltarea profesiei de dietetician și promovarea nutriției clinice în România." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Despre Asociație
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Misiunea noastră în dezvoltarea profesiei de dietetician și promovarea nutriției clinice
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
                                <span className="text-[#09a252] font-medium">Cine suntem și ce facem</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Mission statement */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Într-un climat în care bolile cronice netransmisibile, alimentația dezechilibrată și lipsa educației nutriționale adecvate afectează profund calitatea vieții populației, APNS își asumă responsabilitatea de a susține dezvoltarea profesiei de dietetician și de a contribui la formularea și implementarea politicilor de sănătate publică în care nutriția joacă un rol central.
                                </p>
                            </div>
                        </div>

                        {/* Commitments section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Asociația se angajează în:</h2>
                            
                            <div className="space-y-6">
                                {/* Commitment 1 */}
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Dezvoltarea și susținerea proiectelor cu impact comunitar</strong>, care vizează educația nutrițională, prevenția și reducerea inegalităților în sănătate;
                                    </p>
                                </div>

                                {/* Commitment 2 */}
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Cultivarea unei relații de empatie și încredere cu populația generală</strong>, prin diseminarea de informații validate științific, accesibile și adaptate nevoilor diverse ale comunității;
                                    </p>
                                </div>

                                {/* Commitment 3 */}
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Promovarea nutriției clinice ca disciplină esențială</strong> în cadrul îngrijirilor medicale, prin integrarea dieteticianului în echipele multidisciplinare de tratament;
                                    </p>
                                </div>

                                {/* Commitment 4 */}
                                                                {/* Commitment 4 */}
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Formarea continuă a specialiștilor în nutriție și dietetică</strong>, prin facilitarea accesului la programe educaționale riguroase și actualizate, în conformitate cu standardele europene și internaționale.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Impact section */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Impactul nostru</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Prin activitățile desfășurate, APNS contribuie la consolidarea unei rețele profesionale puternice, capabile să sprijine transformarea nutriției într-un pilon fundamental al unui sistem de sănătate eficient, sustenabil și orientat către prevenție.
                                </p>
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center mt-12">
                            <div className="bg-[#09a252] text-white rounded-lg p-8">
                                <h3 className="text-2xl font-bold mb-4">Vrei să afli mai multe?</h3>
                                <p className="text-green-100 mb-6 text-lg">
                                    Descoperă echipa noastră, proiectele în desfășurare și modalitățile prin care poți contribui la misiunea APNS
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a 
                                        href="/team" 
                                        className="bg-white text-[#09a252] font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                    >
                                        Echipa noastră
                                    </a>
                                    <a 
                                        href="/contact" 
                                        className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-[#09a252] transition-colors duration-200"
                                    >
                                        Contactează-ne
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

export default AsociatePage;
