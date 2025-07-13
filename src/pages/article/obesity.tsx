import ArticleLayout from "@/layouts/ArticleLayout";
import Image from "next/image";

export default function ObesityArticle() {
    return (
        <ArticleLayout>
            <header className="article-header">
                <h1 className="text-3xl font-bold text-green-800 mb-4">Obezitatea: O Provocare Globală de Sănătate Publică</h1>
                <div className="article-meta flex items-center text-sm text-[#09a252] mb-6">
                    <span className="mr-4"><i className="fas fa-calendar-alt mr-1"></i> 13 Aprilie 2025</span>
                    <span className="mr-4"><i className="fas fa-user mr-1"></i> Asociația pentru Promovarea Nutriției Sănătoase</span>
                    <span><i className="fas fa-tag mr-1"></i> Obezitate, Nutriție, Sănătate</span>
                </div>
                <div className="article-featured-image mb-8">
                    <Image
                        width={800}
                        height={450}
                        src="/images/obesity1.png"
                        alt="Obezitate și nutriție"
                        className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic">
                        Abordarea integrată a obezității necesită atât măsuri individuale, cât și schimbări sociale.
                    </p>
                </div>
            </header>

            <div className="article-content text-gray-800 leading-relaxed">
                <div className="article-intro mb-6">
                    <p className="text-lg font-medium text-green-900 mb-4">Obezitatea reprezintă una dintre cele mai mari provocări de sănătate publică ale secolului XXI, afectând milioane de oameni din toate categoriile sociale și de vârstă. În România, prevalența acestei afecțiuni a crescut alarmant în ultimele decenii, necesitând o abordare multidisciplinară pentru prevenire și tratament.</p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Ce este obezitatea?</h2>
                    <p className="mb-4">Obezitatea este definită medical ca o acumulare excesivă de țesut adipos care reprezintă un risc pentru sănătate. Organizația Mondială a Sănătății clasifică obezitatea utilizând indicele de masă corporală (IMC), calculat prin împărțirea greutății unei persoane în kilograme la pătratul înălțimii sale în metri:</p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">IMC: 18.5-24.9</h3>
                            <p className="text-gray-700 text-sm">Greutate normală</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">IMC: 25-29.9</h3>
                            <p className="text-gray-700 text-sm">Suprapondere</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">IMC: ≥30</h3>
                            <p className="text-gray-700 text-sm">Obezitate</p>
                        </div>
                    </div>

                    <p className="mb-4">Este important de menționat că IMC-ul oferă doar o imagine generală și nu ia în considerare compoziția corporală sau distribuția grăsimii. Măsurători suplimentare, precum circumferința taliei, oferă informații valoroase despre riscul cardiometabolic asociat obezității.</p>

                    <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Știați că?</h3>
                        <p className="text-gray-700">În România, aproximativ 25% dintre adulți sunt obezi și peste 40% se încadrează în categoria supraponderalilor. Mai îngrijorător, obezitatea infantilă afectează unul din patru copii, plasând țara noastră printre primele în Europa la acest indicator.</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Cauzele obezității</h2>
                    <p className="mb-4">Obezitatea este o afecțiune complexă, multifactorială, care rezultă din interacțiunea dintre factori genetici, metabolici, comportamentali și de mediu:</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-[#09a252] mb-3">Factori comportamentali</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                <li>Alimentație hipercalorică, bogată în grăsimi saturate și zahăr adăugat</li>
                                <li>Consum crescut de alimente ultraprocesate</li>
                                <li>Porții alimentare excesive</li>
                                <li>Sedentarism și nivel scăzut de activitate fizică</li>
                                <li>Tulburări de comportament alimentar</li>
                                <li>Somn insuficient sau de calitate redusă</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#09a252] mb-3">Factori sociali și de mediu</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                <li>Mediul alimentar toxic (abundența de alimente nesănătoase, accesibile și intens promovate)</li>
                                <li>Factori socioeconomici (accesul redus la alimente sănătoase în comunitățile defavorizate)</li>
                                <li>Urbanizarea și reducerea oportunităților de mișcare</li>
                                <li>Stresul cronic și problemele de sănătate mintală</li>
                                <li>Influențe culturale și familiale asupra comportamentului alimentar</li>
                            </ul>
                        </div>
                    </div>

                    <p>Deși predispoziția genetică joacă un rol important, creșterea rapidă a prevalenței obezității în ultimele decenii sugerează că factorii de mediu și comportamentali sunt determinanți esențiali asupra cărora se poate interveni.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Consecințele obezității asupra sănătății</h2>
                    <p className="mb-4">Obezitatea nu este doar o problemă estetică, ci reprezintă un factor de risc major pentru numeroase afecțiuni cronice:</p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">Cardiovasculare</h3>
                            <ul className="list-disc ml-5 text-gray-700 text-sm">
                                <li>Hipertensiune arterială</li>
                                <li>Boli coronariene</li>
                                <li>Accident vascular cerebral</li>
                                <li>Insuficiență cardiacă</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">Metabolice</h3>
                            <ul className="list-disc ml-5 text-gray-700 text-sm">
                                <li>Diabet zaharat tip 2</li>
                                <li>Dislipidemie</li>
                                <li>Sindrom metabolic</li>
                                <li>Steatoză hepatică</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <h3 className="text-lg font-semibold text-[#09a252] mb-2">Alte complicații</h3>
                            <ul className="list-disc ml-5 text-gray-700 text-sm">
                                <li>Apnee de somn</li>
                                <li>Probleme osteoarticulare</li>
                                <li>Anumite tipuri de cancer</li>
                                <li>Probleme psihosociale</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mb-4">Obezitatea reduce semnificativ calitatea vieții și speranța de viață. Studiile arată că persoanele cu obezitate severă pot pierde între 8 și 10 ani din speranța de viață comparativ cu persoanele cu greutate normală.</p>

                    <p>De asemenea, obezitatea are un impact economic semnificativ asupra sistemului de sănătate, fiind responsabilă pentru aproximativ 10% din costurile totale de sănătate în România.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Managementul obezității: O abordare integrată</h2>

                    <p className="mb-4">Tratamentul obezității necesită o abordare personalizată, multidisciplinară, care să țină cont de particularitățile fiecărui individ. Componentele esențiale includ:</p>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#09a252] mb-3">1. Modificarea stilului de viață</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h4 className="font-semibold text-[#09a252] mb-2">Intervenții nutriționale</h4>
                                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                    <li>Reducerea moderată a aportului caloric (deficitul de 500-750 kcal/zi)</li>
                                    <li>Creșterea consumului de alimente cu densitate nutritivă ridicată</li>
                                    <li>Limitarea alimentelor ultraprocesate, a zahărului adăugat și a grăsimilor nesănătoase</li>
                                    <li>Adoptarea unui model alimentar de tip mediteranean</li>
                                    <li>Hidratare adecvată și reducerea băuturilor îndulcite</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                <h4 className="font-semibold text-[#09a252] mb-2">Activitate fizică</h4>
                                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                    <li>Minimum 150-300 minute de activitate fizică moderată săptămânal</li>
                                    <li>Combinarea exercițiilor aerobice cu antrenamentul de forță</li>
                                    <li>Reducerea comportamentului sedentar</li>
                                    <li>Activitate fizică adaptată condiției fizice și preferințelor individuale</li>
                                    <li>Creșterea progresivă a intensității și duratei</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#09a252] mb-3">2. Intervenții comportamentale</h3>
                        <p className="mb-4">Tehnicile de modificare comportamentală sunt esențiale pentru susținerea schimbărilor pe termen lung:</p>
                        <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700">
                            <li>Stabilirea unor obiective realiste și măsurabile</li>
                            <li>Auto-monitorizarea greutății, alimentației și activității fizice</li>
                            <li>Identificarea și gestionarea factorilor declanșatori ai alimentației emoționale</li>
                            <li>Tehnici de managementul stresului</li>
                            <li>Îmbunătățirea calității somnului</li>
                            <li>Dezvoltarea unui sistem de suport social</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#09a252] mb-3">3. Tratamente medicamentoase și chirurgicale</h3>
                        <p className="mb-4">Pentru anumite persoane, intervenții suplimentare pot fi necesare:</p>
                        <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700">
                            <li>Farmacoterapie pentru obezitate (sub strictă supraveghere medicală)</li>
                            <li>Chirurgie bariatrică pentru obezitatea severă sau cu comorbidități semnificative</li>
                        </ul>
                        <p className="text-gray-700">Aceste intervenții trebuie întotdeauna combinate cu modificări ale stilului de viață și monitorizate de o echipă medicală specializată.</p>
                    </div>

                    <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                        <p className="text-gray-700"><strong className="text-green-800">Important:</strong> Orice program de management al greutății ar trebui să se concentreze pe îmbunătățirea parametrilor de sănătate și a calității vieții, nu doar pe reducerea greutății. O abordare centrată pe sănătate, nu pe aspectul fizic, este esențială pentru rezultate sustenabile.</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Prevenția obezității: O responsabilitate comună</h2>

                    <p className="mb-4">Prevenția obezității necesită eforturi concertate la nivel individual, comunitar și societal:</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-[#09a252] mb-3">Strategii individuale</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                <li>Dezvoltarea obiceiurilor alimentare sănătoase din copilărie</li>
                                <li>Activitate fizică regulată integrată în rutina zilnică</li>
                                <li>Monitorizarea greutății corporale</li>
                                <li>Gestionarea proactivă a stresului</li>
                                <li>Asigurarea unui somn de calitate</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#09a252] mb-3">Politici publice și intervenții comunitare</h3>
                            <ul className="list-disc ml-5 space-y-2 text-gray-700">
                                <li>Educație nutrițională în școli și grădinițe</li>
                                <li>Reglementarea marketingului alimentar adresat copiilor</li>
                                <li>Politici fiscale care favorizează accesul la alimente sănătoase</li>
                                <li>Crearea de medii urbane care facilitează activitatea fizică</li>
                                <li>Programe comunitare de prevenție și management al obezității</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="conclusion bg-green-50 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Concluzie</h2>
                    <p className="mb-4">Obezitatea reprezintă o problemă complexă de sănătate publică care necesită o abordare holistică și multisectorială. Asociația pentru Promovarea Nutriției Sănătoase consideră esențială combinarea intervențiilor individuale cu politici publice coerente pentru prevenirea și gestionarea eficientă a acestei afecțiuni.</p>
                    <p>Stigmatizarea persoanelor cu obezitate este contraproductivă și poate exacerba problema. În schimb, crearea unui mediu de suport care facilitează alegerile sănătoase și abordarea factorilor sociali, economici și de mediu care contribuie la epidemia de obezitate reprezintă direcția corectă pentru inversarea tendințelor actuale.</p>
                </div>

                <div className="references">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Resurse și referințe</h2>
                    <ul className="list-disc ml-6 space-y-2 text-gray-700">
                        <li>Organizația Mondială a Sănătății - <a href="#" className="text-[#09a252] hover:underline">www.who.int/topics/obesity</a></li>
                        <li>Societatea Europeană pentru Studiul Obezității - <a href="#" className="text-[#09a252] hover:underline">www.easo.org</a></li>
                        <li>Institutul Național de Sănătate Publică - <a href="#" className="text-[#09a252] hover:underline">www.insp.gov.ro</a></li>
                        <li>Asociația Română pentru Studiul Obezității - <a href="#" className="text-[#09a252] hover:underline">www.arso.ro</a></li>
                    </ul>
                </div>
            </div>

            <div className="article-footer mt-8 pt-6 border-t border-green-200">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="tags mb-4 md:mb-0">
                        <span className="font-semibold text-[#09a252]">Subiecte:</span>
                        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Obezitate</a>
                        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Nutriție</a>
                        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Sănătate publică</a>
                        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200">Prevenție</a>
                    </div>
                    <div className="share">
                        <span className="font-semibold text-[#09a252] mr-2">Distribuie:</span>
                        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="inline-block text-[#09a252] hover:text-green-900"><i className="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>

        </ArticleLayout>
    );
}