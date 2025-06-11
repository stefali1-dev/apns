import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ArticleLayout from '@/layouts/ArticleLayout';

export default function DiabetesArticle() {
    const [shareDropdownOpen, setShareDropdownOpen] = useState(false);

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Diabetul Zaharat: Înțelegere, Prevenție și Gestionare prin Nutriție');

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            email: `mailto:?subject=${title}&body=Articol interesant despre diabet și nutriție: ${url}`
        };

        if (shareUrls[platform as keyof typeof shareUrls]) {
            window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
        }
    };

    return (
        <ArticleLayout>
            <Head>
                <title>Diabetul Zaharat: Înțelegere, Prevenție și Gestionare prin Nutriție | APNS</title>
                <meta name="description" content="Ghid complet despre diabetul zaharat: prevenție prin nutriție, managementul alimentației pentru diabetici, alimente recomandate și sfaturi practice." />
                <meta name="keywords" content="diabet zaharat, nutriție diabet, prevenție diabet, alimentație diabetici, glicemie, insulină, APNS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Diabetul Zaharat: Înțelegere, Prevenție și Gestionare prin Nutriție" />
                <meta property="og:description" content="Ghid complet despre diabetul zaharat: prevenție prin nutriție, managementul alimentației pentru diabetici, alimente recomandate și sfaturi practice." />
                <meta property="og:image" content="/images/diabetes1.png" />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="/article/diabetes" />
            </Head>

            <div className="">
                <header className="article-header">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">Diabetul Zaharat: Înțelegere, Prevenție și Gestionare prin Nutriție</h1>
                    <div className="article-meta flex items-center text-sm text-green-700 mb-6">
                        <span className="mr-4"><i className="fas fa-calendar-alt mr-1"></i> 13 Aprilie 2025</span>
                        <span className="mr-4"><i className="fas fa-user mr-1"></i> Asociația pentru Promovarea Nutriției Sănătoase</span>
                        <span><i className="fas fa-tag mr-1"></i> Diabet, Nutriție, Sănătate</span>
                    </div>
                    <div className="article-featured-image mb-8">
                        <Image src="/images/diabetes1.png" width={600} height={400} alt="Diabet și nutriție" className="w-full rounded-lg shadow-md" />
                        <p className="text-sm text-gray-600 mt-2 italic">Alimentația sănătoasă joacă un rol crucial în managementul diabetului zaharat.</p>
                    </div>
                </header>

                <div className="article-content text-gray-800 leading-relaxed">
                    <div className="article-intro mb-6">
                        <p className="text-lg font-medium text-green-900 mb-4">Diabetul zaharat reprezintă una dintre cele mai comune afecțiuni metabolice la nivel global, afectând milioane de oameni din toate categoriile de vârstă. Asociația pentru Promovarea Nutriției Sănătoase consideră esențială informarea corectă a publicului despre această afecțiune și despre rolul determinant al alimentației în prevenția și managementul acesteia.</p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Ce este diabetul zaharat?</h2>
                        <p className="mb-4">Diabetul zaharat este o afecțiune cronică caracterizată prin niveluri crescute ale glicemiei (zahărului din sânge), care apare atunci când pancreasul nu mai poate produce suficientă insulină sau când organismul nu poate utiliza eficient insulina pe care o produce. Insulina este un hormon esențial care permite celulelor să preia glucoza din sânge și să o transforme în energie.</p>
                        <p className="mb-4">Există mai multe tipuri de diabet zaharat, cele mai comune fiind:</p>
                        <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
                            <li><strong className="text-green-700">Diabetul de tip 1</strong> - afecțiune autoimună în care sistemul imunitar atacă și distruge celulele producătoare de insulină din pancreas. Apare de obicei la copii și tineri adulți.</li>
                            <li><strong className="text-green-700">Diabetul de tip 2</strong> - forma cea mai răspândită, în care organismul dezvoltă rezistență la insulină sau nu produce suficientă insulină. Este asociat frecvent cu obezitatea și stilul de viață sedentar.</li>
                            <li><strong className="text-green-700">Diabetul gestațional</strong> - apare în timpul sarcinii și de obicei dispare după naștere, deși crește riscul dezvoltării ulterioare a diabetului de tip 2.</li>
                        </ul>
                        <p>Netratată, această afecțiune poate duce la complicații grave, precum boli cardiovasculare, neuropatie, nefropatie, retinopatie și alte probleme de sănătate semnificative.</p>
                    </section>

                    <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Știați că?</h3>
                        <p className="text-gray-700">În România, aproximativ 11.6% din populația adultă suferă de diabet zaharat, iar aproape jumătate dintre aceste persoane nu sunt diagnosticate și nu urmează niciun tratament.</p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Rolul nutriției în prevenirea diabetului</h2>
                        <p className="mb-4">Cercetările științifice arată că adoptarea unei alimentații echilibrate și sănătoase joacă un rol crucial în prevenirea diabetului de tip 2, forma cea mai frecventă a bolii. Iată câteva recomandări nutriționale importante:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Alimente recomandate</h3>
                                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                    <li>Legume cu conținut ridicat de fibre</li>
                                    <li>Fructe întregi (în cantități moderate)</li>
                                    <li>Cereale integrale (ovăz, quinoa, orez brun)</li>
                                    <li>Proteine slabe (pește, pui, leguminoase)</li>
                                    <li>Grăsimi sănătoase (avocado, nuci, ulei de măsline)</li>
                                    <li>Lactate fermentate cu conținut scăzut de grăsimi</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Alimente de limitat</h3>
                                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                    <li>Zahărul rafinat și produsele zaharoase</li>
                                    <li>Carbohidrații rafinați (pâine albă, paste din făină albă)</li>
                                    <li>Băuturile îndulcite (sucuri, băuturi energizante)</li>
                                    <li>Alimente procesate și fast-food</li>
                                    <li>Grăsimile saturate și trans</li>
                                    <li>Alcoolul (mai ales băuturile dulci)</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mb-4">Este important să subliniem că adoptarea unui stil de alimentație mediteraneană sau DASH (Dietary Approaches to Stop Hypertension) s-a dovedit eficientă în reducerea riscului de a dezvolta diabet de tip 2 cu până la 30%. Aceste tipuri de alimentație pun accentul pe consumul de legume, fructe, cereale integrale, pește și ulei de măsline, limitând în același timp consumul de carne roșie și alimente procesate.</p>

                        <p>Menținerea unei greutăți corporale sănătoase prin combinarea unei alimentații echilibrate cu activitate fizică regulată reprezintă cea mai eficientă strategie de prevenire a diabetului de tip 2.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Managementul diabetului prin nutriție personalizată</h2>
                        <p className="mb-4">Pentru persoanele diagnosticate cu diabet zaharat, gestionarea alimentației devine esențială pentru controlul glicemiei și prevenirea complicațiilor. Abordarea nutrițională trebuie însă să fie personalizată, ținând cont de tipul de diabet, vârstă, nivel de activitate fizică, medicație și alte aspecte individuale.</p>

                        <h3 className="text-xl font-semibold text-green-700 mb-3">Principii fundamentale în alimentația pentru diabetici:</h3>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 mb-2">1. Monitorizarea carbohidraților</h4>
                            <p className="mb-4">Carbohidrații au cel mai mare impact asupra nivelului glicemiei. Persoanele cu diabet trebuie să învețe să monitorizeze cantitatea de carbohidrați consumată la fiecare masă și gustare. Metodele includ:</p>
                            <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700">
                                <li>Numărarea carbohidraților (în grame sau porții)</li>
                                <li>Utilizarea indicelui glicemic și a încărcăturii glicemice</li>
                                <li>Metoda farfuriei (1/2 legume, 1/4 proteine, 1/4 carbohidrați)</li>
                            </ul>
                            <p className="mb-2">Este important să alegem carbohidrați complecși, bogați în fibre, care sunt absorbiți mai lent și produc creșteri mai moderate ale glicemiei.</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 mb-2">2. Regularitatea meselor</h4>
                            <p className="mb-4">Consumarea meselor la intervale regulate ajută la menținerea unui nivel stabil al glicemiei. Specialiștii recomandă:</p>
                            <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700">
                                <li>3 mese principale și 2-3 gustări mici pe zi</li>
                                <li>Evitarea saltului peste mese, în special peste micul dejun</li>
                                <li>Porții moderate, consumate lent</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 mb-2">3. Echilibrul nutrițional</h4>
                            <p className="mb-2">O alimentație echilibrată pentru diabetici ar trebui să includă:</p>
                            <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700">
                                <li>45-60% carbohidrați (predominant complecși)</li>
                                <li>15-20% proteine de calitate</li>
                                <li>20-35% grăsimi sănătoase (predominant nesaturate)</li>
                                <li>Minimum 25-30g de fibre alimentare zilnic</li>
                            </ul>
                        </div>

                        <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                            <p className="text-gray-700"><strong className="text-green-800">Important:</strong> Planul alimentar al unei persoane cu diabet trebuie elaborat împreună cu un medic specialist și un nutriționist cu experiență în managementul diabetului zaharat.</p>
                        </div>

                        <p>Cercetări recente arată că anumite tipuri de alimentație, precum dieta mediteraneană, dieta DASH sau abordările bazate pe alimente integrale, cu un consum redus de alimente procesate, pot îmbunătăți semnificativ controlul glicemic și pot reduce riscul de complicații cardiovasculare la persoanele cu diabet.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Alimente benefice în diabetul zaharat</h2>
                        <p className="mb-4">Anumite alimente au demonstrat efecte deosebit de benefice în gestionarea diabetului zaharat:</p>

                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Scorțișoara</h3>
                                <p className="text-gray-700 text-sm">Conține compuși care pot îmbunătăți sensibilitatea la insulină și reduce glicemia postprandială.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Semințele de in</h3>
                                <p className="text-gray-700 text-sm">Bogate în fibre solubile și acizi grași omega-3, pot contribui la îmbunătățirea controlului glicemic.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Leguminoasele</h3>
                                <p className="text-gray-700 text-sm">Fasolea, lintea și năutul oferă proteine și fibre de calitate, cu impact minim asupra glicemiei.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Nucile și semințele</h3>
                                <p className="text-gray-700 text-sm">Consumul moderat poate îmbunătăți profilul lipidic și controlul glicemic la persoanele cu diabet.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Peștele gras</h3>
                                <p className="text-gray-700 text-sm">Somonul, macroului și sardinele sunt bogate în acizi grași omega-3, care reduc inflamația și riscul cardiovascular.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Iaurtul natural</h3>
                                <p className="text-gray-700 text-sm">Produsele fermentate pot îmbunătăți compoziția microbiotei intestinale, influențând pozitiv metabolismul glucozei.</p>
                            </div>
                        </div>

                        <p>Aceste alimente pot fi integrate într-un plan alimentar echilibrat, însă este important să ținem cont de cantitățile totale și de impactul global al meselor asupra glicemiei.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Mituri și concepții greșite despre diabetul zaharat</h2>

                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="text-green-600 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Mit: Persoanele cu diabet trebuie să evite total carbohidrații</h4>
                                    <p className="text-gray-700">Adevăr: Carbohidrații sunt o parte esențială a unei alimentații echilibrate, inclusiv pentru persoanele cu diabet. Importantă este alegerea carbohidraților de calitate (integrali, bogați în fibre) și monitorizarea cantității.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="text-green-600 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Mit: Fructele sunt interzise în diabet din cauza conținutului de zahăr</h4>
                                    <p className="text-gray-700">Adevăr: Fructele întregi, consumate în cantități moderate și distribuite pe parcursul zilei, fac parte dintr-o alimentație sănătoasă pentru diabetici. Acestea conțin fibre, vitamine și antioxidanți benefici.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="text-green-600 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Mit: Îndulcitorii artificiali sunt întotdeauna o alternativă mai bună la zahăr</h4>
                                    <p className="text-gray-700">Adevăr: Deși îndulcitorii artificiali nu cresc direct glicemia, cercetările recente sugerează că pot afecta microbiota intestinală și metabolismul. Consumul lor ar trebui limitat în favoarea reducerii preferinței generale pentru gustul dulce.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-start mb-2">
                                <div className="text-green-600 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Mit: Produsele etichetate "fără zahăr" sau "pentru diabetici" sunt întotdeauna sănătoase</h4>
                                    <p className="text-gray-700">Adevăr: Aceste produse pot conține cantități semnificative de grăsimi, calorii sau îndulcitori artificiali. Este important să citim etichetele nutriționale și să le consumăm cu moderație.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Sfaturi practice pentru gestionarea diabetului în viața de zi cu zi</h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Planificarea meselor</h3>
                                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                    <li>Planificați mesele în avans și încercați să mențineți un program regulat</li>
                                    <li>Pregătiți gustări sănătoase pentru situațiile în care nu puteți respecta orarul meselor</li>
                                    <li>Învățați să interpretați etichetele nutriționale pentru a face alegeri informate</li>
                                    <li>Utilizați aplicații specializate pentru monitorizarea carbohidraților și a glicemiei</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Ieșirile la restaurant</h3>
                                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                    <li>Consultați meniul în avans, când este posibil</li>
                                    <li>Nu ezitați să solicitați informații despre ingrediente și metode de preparare</li>
                                    <li>Cereți modificări ale preparatelor (ex. dressing separat, înlocuirea garniturilor)</li>
                                    <li>Controlați porțiile (împărțiți un fel de mâncare sau cereți o cutie pentru restul)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Activitate fizică și alimentație</h3>
                                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                    <li>Ajustați aportul de carbohidrați în funcție de nivelul de activitate fizică</li>
                                    <li>Pentru activități intense, poate fi necesară o gustare suplimentară</li>
                                    <li>Monitorizați glicemia înainte, eventual în timpul, și după activitatea fizică</li>
                                    <li>Hidratați-vă corespunzător, preferând apa simplă</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-green-700 mb-3">Gestionarea situațiilor speciale</h3>
                                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                    <li>În perioadele de stres, acordați o atenție sporită monitorizării glicemiei</li>
                                    <li>În caz de boală, mențineți aportul de lichide și carbohidrați chiar dacă apetitul este redus</li>
                                    <li>În călătorii, planificați în avans și purtați gustări adecvate</li>
                                    <li>Sărbătorile pot fi ocazii de a savura alimente speciale, dar cu moderație și atenție</li>
                                </ul>
                            </div>
                        </div>

                        <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                            <p className="text-gray-700"><strong className="text-green-800">Sfat practic:</strong> Țineți un jurnal alimentar și al glicemiei pentru a identifica mai ușor alimentele și combinațiile care vă influențează valorile glicemiei. Acest instrument poate fi extrem de util pentru a personaliza și optimiza planul alimentar.</p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Cercetări și tendințe recente în nutriția pentru diabet</h2>

                        <p className="mb-4">Domeniul nutriției pentru diabet evoluează constant, pe măsură ce noi cercetări aduc informații valoroase. Iată câteva direcții actuale de interes:</p>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Cronobiologia nutriției</h3>
                            <p className="text-gray-700 mb-2">Studii recente sugerează că nu doar ce mâncăm, ci și când mâncăm poate influența controlul glicemic. Sincronizarea meselor cu ritmurile circadiene naturale ale organismului (consumul majorității caloriilor în prima parte a zilei) poate îmbunătăți sensibilitatea la insulină și controlul glicemic.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Microbiota intestinală</h3>
                            <p className="text-gray-700 mb-2">Există dovezi tot mai numeroase că microorganismele din intestin influențează metabolismul glucozei și sensibilitatea la insulină. Alimentele prebiotice (fibre fermentabile) și probiotice pot modula compoziția microbiotei cu efecte potențial benefice în diabet.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Dietele cu restricție calorică intermitentă</h3>
                            <p className="text-gray-700 mb-2">Protocoalele de post intermitent și alimentație cu restricție temporală au arătat rezultate promițătoare în îmbunătățirea controlului glicemic și reducerea rezistenței la insulină în unele studii. Totuși, sunt necesare cercetări suplimentare pentru a stabili siguranța și eficacitatea pe termen lung, în special pentru persoanele care utilizează medicamente hipoglicemiante.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Nutrigenomică și nutriție personalizată</h3>
                            <p className="text-gray-700 mb-2">Cercetările în domeniul nutrigenomicii explorează interacțiunile dintre nutrienți și genele individuale, deschizând calea spre recomandări nutriționale personalizate bazate pe profilul genetic al persoanei. Această abordare ar putea revoluționa managementul diabetului în viitor.</p>
                        </div>
                    </section>

                    <div className="conclusion bg-green-50 p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Concluzie</h2>
                        <p className="mb-4">Nutriția reprezintă unul dintre pilonii fundamentali în prevenirea și gestionarea diabetului zaharat. O alimentație echilibrată, personalizată și adaptată stilului de viață individual poate îmbunătăți semnificativ controlul glicemic, poate reduce riscul complicațiilor și poate crește calitatea vieții persoanelor cu diabet.</p>
                        <p className="mb-4">Asociația pentru Promovarea Nutriției Sănătoase recomandă abordarea diabetului într-o manieră holistică, care să integreze nutriția optimizată cu activitatea fizică regulată, monitorizarea atentă a glicemiei, gestionarea stresului și aderența la tratamentul medicamentos, atunci când acesta este necesar.</p>
                        <p>Consultarea regulată cu o echipă medicală specializată, care să includă un medic diabetolog și un nutriționist cu experiență în domeniul diabetului, reprezintă cheia succesului în managementul acestei afecțiuni.</p>
                    </div>

                    <div className="references">
                        <h2 className="text-xl font-bold text-green-800 mb-4">Resurse și referințe</h2>
                        <ul className="list-disc ml-6 space-y-2 text-gray-700">
                            <li>Societatea Română de Diabet, Nutriție și Boli Metabolice - <a href="#" className="text-green-600 hover:underline">www.societate-diabet.ro</a></li>
                            <li>Federația Internațională de Diabet - <a href="#" className="text-green-600 hover:underline">www.idf.org</a></li>
                            <li>Asociația Americană de Diabet - <a href="#" className="text-green-600 hover:underline">www.diabetes.org</a></li>
                            <li>Asociația Europeană pentru Studiul Diabetului - <a href="#" className="text-green-600 hover:underline">www.easd.org</a></li>
                            <li>Organizația Mondială a Sănătății - <a href="#" className="text-green-600 hover:underline">www.who.int</a></li>
                        </ul>
                    </div>
                </div>

                <div className="article-footer mt-8 pt-6 border-t border-green-200">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="tags mb-4 md:mb-0">
                            <span className="font-semibold text-green-700">Subiecte:</span>

                            <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Diabet</a>
                            <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Nutriție</a>
                            <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Sănătate</a>
                            <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200">Prevenție</a>
                        </div>
                        <div className="share">
                            <span className="font-semibold text-green-700 mr-2">Distribuie:</span>
                            <a href="#" className="inline-block text-green-700 hover:text-green-900 mr-3"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="inline-block text-green-700 hover:text-green-900 mr-3"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="inline-block text-green-700 hover:text-green-900 mr-3"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="inline-block text-green-700 hover:text-green-900"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>

                <div className="cta mt-8 bg-green-600 text-white p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Ești specialist în nutriție sau diabet?</h2>
                    <p className="mb-6 max-w-2xl mx-auto">Alătură-te Asociației pentru Promovarea Nutriției Sănătoase și contribuie la educarea publicului și la dezvoltarea practicilor nutriționale bazate pe dovezi științifice.</p>
                    <a href="#" className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors">Află mai multe despre membership</a>
                </div>



            </div>

        </ArticleLayout>
    );
}