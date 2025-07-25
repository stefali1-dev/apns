import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';

const DieteticianPage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Ce este un dietetician? - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Descoperă ce este un dietetician, diferența față de nutriționist și cum poți deveni dietetician autorizat în România. Informații complete despre profesia de dietetician." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Ce este un dietetician?
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Ghidul complet despre profesia de dietetician în România
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
                                <span className="text-[#09a252] font-medium">Profesia de dietetician</span>
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
                                    Dieteticianul este un profesionist din domeniul sănătății, specializat în nutriție și dietetică, cu studii universitare de licență în cadrul Universităților de Medicină și Farmacie. Această profesie este acreditată de statul român conform Legii nr. 256/2015 și are drept de liberă practică doar în baza autorizației eliberate de Colegiul Dieteticienilor din România.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Rolul său este esențial în prevenția bolilor, susținerea tratamentelor medicale prin terapie nutrițională, educația alimentară a populației și dezvoltarea politicilor de sănătate publică.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Dieteticienii fac parte din echipa multidisciplinară și contribuie direct la îmbunătățirea calității vieții, prin recomandări personalizate și bazate pe dovezi științifice.
                                </p>
                            </div>
                        </div>

                        {/* APNS mission */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Misiunea APNS</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Asociația pentru Promovarea Nutriției Sănătoase (APNS) este o organizație independentă, dedicată promovării echității, diversității și accesului egal la informație, resurse și sprijin pentru toți membrii săi. Susținem un mediu profesional în care fiecare persoană este tratată cu respect, fără discriminare și încurajăm accesul echitabil la dezvoltare în cariera de dietetician.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Ne dedicăm formării profesioniștilor din domeniul sănătății și informării publicului larg în domeniul nutriției personalizate, bazate pe cele mai recente dovezi științifice. Oferim acces la cunoștințe prin conferințe, webinarii și programe educaționale specializate.
                                </p>
                            </div>
                        </div>

                        {/* What is a dietitian */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Ce este un dietetician?</h2>
                            <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                <li>Dieteticianul este un profesionist din domeniul sănătății, cu studii universitare în „Nutriție și dietetică" care acordă servicii conexe actului medical.</li>
                                <li><strong>Scopul său principal:</strong> asigurarea unei alimentații echilibrate pentru persoane sănătoase sau cu afecțiuni, prin prevenție, recuperare sau susținerea sănătății.</li>
                            </ul>
                        </div>

                        {/* What do dietitians do */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Ce fac dieteticienii?</h2>
                            <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                <li>Aplică știința nutriției și dieteticii în alimentația și educația pacienților și a populației;</li>
                                <li>Evaluează și controlează calitatea dietelor, alimentelor și suplimentelor, respectând recomandările de sănătate publică;</li>
                                <li>Participă în programe de sănătate publică cu componentă nutrițională;</li>
                                <li>Iau decizii profesioniste, etice și independente, punând sănătatea beneficiarului pe primul loc.</li>
                            </ul>
                        </div>

                        {/* How to become a dietitian */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Cum devii dietetician în România?</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Pentru a deveni dietetician autorizat în România, trebuie să îndeplinești cumulativ:
                            </p>
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">1. Titlu oficial de calificare</h3>
                                    <p className="text-gray-700">
                                        Să deții diploma de licență în specializarea nutriție și dietetică, eliberată de o instituție de învățământ superior acreditată în România;
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">2. Experiență practică</h3>
                                    <p className="text-gray-700">
                                        Dovada efectuării unui an de practică în domeniul nutriției și dieteticii conform Legii nr. 256/2015 sau să deții o diplomă de masterat în același domeniu (120 de credite);
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">3. Examen național</h3>
                                    <p className="text-gray-700">
                                        Să promovezi examenul național de dietetician autorizat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Activity domains */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Domenii de activitate</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Dietetician clinic</h3>
                                    <p className="text-gray-700">Cabinete, spitale; planuri alimentare individualizate</p>
                                </div>
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Dietetician comunitar</h3>
                                    <p className="text-gray-700">Sănătate publică, politici alimentare</p>
                                </div>
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Dietetician administrativ</h3>
                                    <p className="text-gray-700">Management în instituții, nutriție colectivă</p>
                                </div>
                                <div className="border border-gray-200 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-2">Cercetare și formare</h3>
                                    <p className="text-gray-700">Universități, master, doctorat</p>
                                </div>
                            </div>
                        </div>

                        {/* Ethics */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Principii și reguli etice</h2>
                            <ul className="space-y-3 list-disc list-inside text-gray-700 leading-relaxed">
                                <li>Trebuie să acționeze cu profesionalism, competență, confidențialitate, respectând demnitatea beneficiarilor;</li>
                                <li>Răspundere disciplinară în caz de malpraxis sau nedemnitate (ex. infracțiuni, abuzuri).</li>
                            </ul>
                        </div>

                        {/* Difference between nutritionist and dietitian */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Diferența dintre nutriționist și dietetician</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    În România și pe plan internațional, termenii nutriționist și dietetician sunt adesea folosiți interschimbabil, însă există diferențe semnificative între cele două profesii, în special în ceea ce privește nivelul de pregătire și aria de competență.
                                </p>

                                <div className="bg-green-50 p-6 rounded-lg mb-6">
                                    <h3 className="font-bold text-gray-800 mb-3">Dieteticianul</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Este un profesionist din domeniul sănătății, cu studii universitare de licență în Nutriție și Dietetică. Acesta are formare teoretică și practică solidă, inclusiv stagii clinice, fiind pregătit să elaboreze planuri alimentare personalizate atât pentru persoane sănătoase, cât și pentru pacienți cu diverse afecțiuni. Dieteticienii pot lucra în spitale, clinici, cabinete private sau în domeniul cercetării, iar profesia lor este reglementată prin lege în România.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                    <h3 className="font-bold text-gray-800 mb-3">Nutriționistul</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Este o denumire mai generală, fără o reglementare oficială clară. De cele mai multe ori, nutriționiștii urmează cursuri de scurtă durată, de câteva luni, care oferă o introducere în conceptele de bază ale nutriției. Aceste cursuri nu echivalează cu o formare academică de specialitate. În consecință, nutriționiștii pot oferi recomandări generale despre alimentație, însă nu au competența profesională de a elabora diete pentru persoane cu patologii sau de a interveni în context clinic.
                                    </p>
                                </div>

                                <div className="p-6 rounded-lg mb-6">
                                    <h3 className="font-bold text-gray-800 mb-3">Pe scurt:</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        <strong>Dieteticianul</strong> = specialist cu diplomă universitară în Nutriție și Dietetică, reglementat legal, cu abilități clinice și intervenții personalizate în diverse boli;
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Nutriționistul</strong> = persoană cu pregătire variabilă (de regulă cursuri scurte), fără reglementare oficială, limitat la sfaturi generale despre stil de viață sănătos.
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Recomandare:</strong> Pentru intervenții nutriționale în context medical sau pentru diete adaptate unor afecțiuni specifice este esențial să consultați un dietetician autorizat, cu formare clinică adecvată.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Personalized nutrition */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Ce este Nutriția Personalizată?</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Nutriția personalizată reprezintă o abordare modernă și integrată a alimentației, care pune în centrul atenției individul – cu tot ce înseamnă acesta: istoric medical, profil genetic, stil de viață, nevoi și obiective specifice.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Spre deosebire de recomandările generale sau tendințele populare în nutriție, această disciplină valorifică știința de ultimă oră și datele personale (precum analizele de sânge, markerii metabolici și chiar testele genetice), pentru a crea planuri alimentare adaptate biologiei fiecărei persoane.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Apărută ca o extensie firească a nutriției clinice, nutriția personalizată a evoluat într-un domeniu multidisciplinar care combină cercetarea științifică, educația profesională și intervențiile terapeutice pentru a preveni și gestiona boli cronice precum obezitatea, diabetul de tip 2, bolile cardiovasculare sau osteoporoza.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Această abordare elimină incertitudinea din alegerile alimentare și oferă o strategie clară, bazată pe date concrete, pentru îmbunătățirea sănătății pe termen lung.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Nutriția personalizată nu doar reacționează la boală, ci acționează preventiv, adaptând alimentația la unicitatea fiecărei persoane. Astăzi este unul dintre cei mai promițători factori în transformarea modului în care privim sănătatea și îngrijirea personalizată.
                                </p>
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center mt-12">
                            <div className="bg-[#09a252] text-white rounded-lg p-8">
                                <h3 className="text-2xl font-bold mb-4">Vrei să știi mai multe?</h3>
                                <p className="text-green-100 mb-6 text-lg">
                                    Explorează resursele noastre educaționale și descoperă cum poți beneficia de serviciile unui dietetician autorizat
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="/contact"
                                        className="bg-white text-[#09a252] font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                    >
                                        Contactează un dietetician
                                    </a>
                                    <a
                                        href="/ebooks"
                                        className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-[#09a252] transition-colors duration-200"
                                    >
                                        Resurse educaționale
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

export default DieteticianPage;
