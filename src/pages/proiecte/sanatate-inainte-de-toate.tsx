import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import Image from 'next/image';

const SanatateInainteDeTotePage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Sănătate înainte de toate - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Proiectul 'Sănătate înainte de toate' - screening nutrițional și oftalmologic pentru copii, programe de educație și intervenție pentru un stil de viață sănătos." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Sănătate înainte de toate
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Proiect de screening și educație pentru sănătatea copiilor
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
                                <span className="text-[#09a252] font-medium">Proiectele APNS pentru copii</span>
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
                                    În cadrul proiectelor organizate de APNS („Nutriție de la mic la mare" și „Sănătate înainte de toate") au fost implementate activități cu caracter educațional și preventiv, desfășurate în unități de învățământ din ciclul primar și gimnazial, cu impact direct asupra populației pediatrice și cu impact indirect asupra cadrelor didactice și părinților copiilor incluși în proiecte.
                                </p>
                            </div>
                        </div>

                        {/* Project Image 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="text-center mb-6">
                                <Image
                                    src="/images/group.jpeg"
                                    alt="Activitate educațională în școală"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mx-auto"
                                />
                                <p className="text-sm text-gray-600 mt-2 italic">Activități educaționale în școli</p>
                            </div>
                        </div>

                        {/* Project focus */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Focusul pe populația pediatrică</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Primele proiecte ale APNS au fost „Nutriție de la mic la mare" și „Sănătate înainte de toate", care s-au concentrat asupra populației pediatrice, deoarece educația pentru un stil de viață sănătos este cea mai eficientă atunci când începe de la vârste fragede. În colaborare cu instituțiile de învățământ, asociația a reușit să efectueze screening nutrițional și oftalmologic, apoi să implementeze programe de intervenție nutrițională și oftalmologică în rândul copiilor cu suprapondere, obezitate, miopie, astigmatism, hipermetropie, etc.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    În cadrul proiectelor derulate, peste <strong>1.500 de copii</strong> au beneficiat de evaluare nutrițională și oftalmologică, confirmând relevanța și impactul programelor în comunitate.
                                </p>
                            </div>
                        </div>

                        {/* Screening section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Screening nutrițional și oftalmologic prin metode neinvazive</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 text-xl">Screening nutrițional</h3>
                                    <p className="text-gray-700 mb-4">Activitatea a inclus:</p>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                                        <li><strong>evaluarea statusului nutrițional:</strong> măsurători antropometrice și interpretarea acestora în raport cu curbele de creștere;</li>
                                        <li><strong>depistarea copiilor cu suprapondere și obezitate,</strong> precum și includerea acestora în programe gratuite de educație și intervenție nutrițională.</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 text-xl">Screening oftalmologic</h3>
                                    <p className="text-gray-700 mb-4">Realizat în parteneriat cu Clinica Stereopsis – Iași, a vizat:</p>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                                        <li><strong>identificarea precoce</strong> a tulburărilor de vedere la copii (astigmatism, miopie, hipermetropie, strabism);</li>
                                        <li><strong>furnizarea de consultații gratuite</strong> de către medici oftalmologi, iar acolo unde a fost necesar prescrierea de tratamente medicale.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Project Image 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="text-center mb-6">
                                <Image
                                    src="/images/group.jpeg"
                                    alt="Screening medical pentru copii"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mx-auto"
                                />
                                <p className="text-sm text-gray-600 mt-2 italic">Screening nutrițional și oftalmologic</p>
                            </div>
                        </div>

                        {/* Educational sessions */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Sesiuni de educație nutrițională</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Sesiuni de educație nutrițională adresate copiilor și părinților, susținute de dieteticieni, cu informații care respectă ghidurile actuale privind:
                                </p>
                                <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                    <li>principiile unui stil de viață sănătos;</li>
                                    <li>farfuria sănătoasă și piramida alimentară;</li>
                                    <li>hidratarea corespunzătoare;</li>
                                    <li>importanța somnului și a activității fizice regulate;</li>
                                    <li>promovarea unui stil de viață sustenabil, cu scopul de a reduce risipa alimentară și de a proteja mediul înconjurător.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Physical activities */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Activități de educație fizică în aer liber</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Activități de educație fizică în aer liber, pentru susținerea unui stil de viață sănătos.
                                </p>
                            </div>
                        </div>

                        {/* Psychological counseling */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Consiliere psihologică</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Consiliere psihologică care a abordat teme precum:
                                </p>
                                <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                    <li>înțelegerea relației emoționale cu alimentația;</li>
                                    <li>reducerea comportamentelor alimentare compulsive;</li>
                                    <li>stigmatizarea persoanelor cu obezitate în societate;</li>
                                    <li>promovarea echilibrului psiho-emoțional.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center mt-12">
                            <div className="bg-[#09a252] text-white rounded-lg p-8">
                                <h3 className="text-2xl font-bold mb-4">Vrei să afli mai multe despre proiectele noastre?</h3>
                                <p className="text-green-100 mb-6 text-lg">
                                    Descoperă cum poți contribui la promovarea unui stil de viață sănătos în comunitatea ta
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

export default SanatateInainteDeTotePage;
