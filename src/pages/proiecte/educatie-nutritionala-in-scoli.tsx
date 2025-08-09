import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import Image from 'next/image';

const EducatieNutritionalaInScoliPage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Educație nutrițională în școli - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Proiectul 'Educație nutrițională în școli' - workshopuri și ateliere de gătit sănătos pentru copii și adolescenți în parteneriat cu unități de învățământ." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Educație nutrițională în școli
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Campanii de promovare a unui stil de viață sănătos
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
                                <span className="text-[#09a252] font-medium">Educație prin practică</span>
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
                                    În cadrul demersurilor educaționale desfășurate de asociație, promovarea alimentației echilibrate în rândul copiilor și adolescenților reprezintă o direcție prioritară. Astfel, în parteneriat cu unități de învățământ preuniversitar din municipiul Iași, am implementat o serie de activități interactive cu rol educativ.
                                </p>
                            </div>
                        </div>

                        {/* Partnership programs */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Programele partenere</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    În cadrul programelor <strong>„Școala Altfel"</strong> și <strong>„Săptămâna Verde"</strong>, APNS a organizat workshopuri și ateliere de gătit sănătos, în colaborare cu școlile partenere.
                                </p>
                            </div>
                        </div>

                        {/* Workshop topics */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Temele abordate</h2>
                            
                            <div className="space-y-8">
                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#09a252]">
                                    <h3 className="font-bold text-gray-800 mb-3 text-xl">Pachețelul sănătos, dar și gustos</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sesiuni interactive în care elevii au învățat cum pot pregăti un pachețel echilibrat pentru școală, atractiv și adaptat vârstei.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#09a252]">
                                    <h3 className="font-bold text-gray-800 mb-3 text-xl">Ce înseamnă o gustare sănătoasă</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Activitate practică în care copiii au pregătit gustări nutritive și au învățat cum să combine corect alimentele.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#09a252]">
                                    <h3 className="font-bold text-gray-800 mb-3 text-xl">Shaworma sănătoasă</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Atelier în care copiii au reinterpretat rețetele de tip fast food, folosind ingrediente sănătoase (lipie integrală, carne slabă, legume crude, dressinguri pe bază de iaurt).
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#09a252]">
                                    <h3 className="font-bold text-gray-800 mb-3 text-xl">Băuturile energizante chiar „îți dau aripi?"</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sesiuni de educație despre băuturile energizante, efectele asupra organismului și alternative sănătoase de hidratare.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Impact and benefits */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Impactul activităților</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Aceste activități au contribuit la dezvoltarea deprinderilor alimentare sănătoase și implicarea activă a copiilor în procesul de gătit, cu beneficii directe asupra alegerilor alimentare de zi cu zi.
                                </p>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="text-center mb-6">
                                <Image
                                    src="/images/group2.jpg"
                                    alt="Workshop de educație nutrițională în școli"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mx-auto"
                                />
                                <p className="text-sm text-gray-600 mt-2 italic">Workshopuri și ateliere de gătit sănătos cu elevii</p>
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center mt-12">
                            <div className="bg-[#09a252] text-white rounded-lg p-8">
                                <h3 className="text-2xl font-bold mb-4">Vrei să implementezi astfel de programe în școala ta?</h3>
                                <p className="text-green-100 mb-6 text-lg">
                                    Contactează-ne pentru a afla cum putem colabora în educația nutrițională a copiilor
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

export default EducatieNutritionalaInScoliPage;
