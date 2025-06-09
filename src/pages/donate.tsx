import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function DonationPage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const faqData = [
    {
      id: 1,
      question: "Ce înseamnă redirecționarea de 3.5% din impozit?",
      answer: "Redirecționarea de 3.5% din impozit este o procedură prin care poți alege ca o parte din impozitul pe care îl plătești deja statului să ajungă la o asociație nonprofit de încredere, fără costuri suplimentare pentru tine. Banii aceștia ar rămâne oricum la bugetul de stat dacă nu faci această alegere."
    },
    {
      id: 2,
      question: "Cine poate redirecționa 3.5% din impozit?",
      answer: "Formularul 230 se completează și se depune de către persoanele fizice din România care realizează venituri din salarii și asimilate salariilor. Din 2024, pensionarii nu mai au dreptul să redirecționeze 3.5% din impozit."
    },
    {
      id: 3,
      question: "Care este termenul limită pentru 2025?",
      answer: "Termenul limită pentru depunerea formularului 230 în 2025 este 26 mai 2025. Este important să nu întârzii acest termen pentru ca donația ta să fie validă."
    },
    {
      id: 4,
      question: "Cum completez formularul 230?",
      answer: "Poți completa formularul online pe site-ul ANAF prin Spațiul Privat Virtual, sau poți descărca formularul PDF și să îl completezi manual. Vei avea nevoie de datele APNS: denumirea completă, codul de identificare fiscală și contul IBAN."
    },
    {
      id: 5,
      question: "Unde depun formularul completat?",
      answer: "Formularul poate fi depus în trei moduri: 1) Direct la ANAF (online prin SPV sau fizic), 2) Prin poștă către ANAF, 3) Direct la APNS - noi ne ocupăm de transmiterea către ANAF pentru tine."
    },
    {
      id: 6,
      question: "Pot alege să donez pentru doi ani consecutivi?",
      answer: "Da! Poți bifa opțiunea pentru 2 ani în formularul 230, astfel încât să nu mai fie nevoie să completezi formularul și anul următor. Donația se va repeta automat."
    },
    {
      id: 7,
      question: "Cum sunt folosiți banii redirectionați către APNS?",
      answer: "Fondurile redirectionate către APNS sunt folosite 100% pentru programele noastre educaționale: materiale didactice pentru școli, workshop-uri gratuite, dezvoltarea platformei online cu rețete sănătoase și campanii de conștientizare despre alimentația corectă."
    },
    {
      id: 8,
      question: "Este sigură această procedură?",
      answer: "Da, este complet sigură! Este o procedură oficială reglementată de ANAF prin Ordinul 103/2025. Nu dai bani din buzunarul tău, ci doar alegi destinația unei părți din impozitul pe care îl plătești deja statului."
    }
  ];

  const impactStories = [
    {
      title: "Școala Gimnazială nr. 15, București",
      description: "Cu ajutorul donațiilor primite în 2023, am implementat programul 'Gustul Sănătății' pentru 120 de elevi din clasele I-IV.",
      impact: "89% dintre copii au învățat să identifice alimentele sănătoase",
      image: "/images/impact1.jpg"
    },
    {
      title: "Workshop-uri pentru părinți",
      description: "Am organizat 12 sesiuni gratuite de educație nutrițională pentru familii din mediul rural.",
      impact: "240+ familii educate despre alimentația echilibrată",
      image: "/images/impact2.jpg"
    },
    {
      title: "Platforma digitală",
      description: "Am dezvoltat baza de date cu peste 300 de rețete sănătoase, accesibilă gratuit pentru toată comunitatea.",
      impact: "2,500+ utilizatori activi lunar",
      image: "/images/impact3.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Descarcă formularul",
      description: "Accesează formularul 230 precompletat cu datele APNS și completează-ți informațiile personale.",
      icon: "📝"
    },
    {
      number: "02", 
      title: "Semnează și trimite",
      description: "Semnează formularul și trimite-l la ANAF prin SPV, poștă sau direct către noi.",
      icon: "✍️"
    },
    {
      number: "03",
      title: "Confirmarea ANAF",
      description: "ANAF procesează cererea și virează suma către APNS în termen de 90 de zile.",
      icon: "✅"
    },
    {
      number: "04",
      title: "Primești raportul",
      description: "Îți trimitem un raport detaliat despre cum au fost folosiți banii donați.",
      icon: "📊"
    }
  ];

  const toggleFaq = (id: number) => {
    setSelectedFaq(selectedFaq === id ? null : id);
  };

  return (
    <>
      <Head>
        <title>Donează prin redirecționarea 3.5% din impozit - APNS</title>
        <meta name="description" content="Redirecționează 3.5% din impozitul pe venit către APNS prin formularul 230. Susții educația nutrițională fără costuri suplimentare. Termenul limită: 26 mai 2025." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #10b968 0%, #059646 100%);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        @keyframes pulse-green {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-green {
          animation: pulse-green 2s ease-in-out infinite;
        }

        .countdown-box {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          color: white;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="gradient-bg relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
          </div>

          <div className="relative max-w-screen-xl mx-auto px-6 py-20">
            <div className="text-center text-white">
              {/* Countdown Alert */}
              {/* <div className="countdown-box max-w-md mx-auto mb-8 animate-pulse-green">
                <div className="text-sm font-semibold mb-1">⏰ ATENȚIE! TERMEN LIMITĂ</div>
                <div className="text-xl font-bold">26 Mai 2025</div>
                <div className="text-sm">pentru formularul 230</div>
              </div> */}

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Redirecționează<br />
                <span className="text-green-200">3.5% din impozit</span><br />
                către educația nutrițională
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                Fără costuri suplimentare pentru tine, poți susține programele noastre educaționale 
                care schimbă viețile a mii de copii și familii din România.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                <button 
                  onClick={() => setIsFormModalOpen(true)}
                  className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  📝 Completează Formularul 230
                </button>
                
                <Link 
                  href="#cum-functioneaza"
                  className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Află cum funcționează
                </Link>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-200 mb-2">0 RON</div>
                  <div className="text-sm">Nu te costă nimic extra</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-200 mb-2">500+</div>
                  <div className="text-sm">Copii educați anul trecut</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-200 mb-2">12</div>
                  <div className="text-sm">Școli partenere active</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Modal */}
        {isFormModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Datele pentru Formularul 230</h2>
                <button 
                  onClick={() => setIsFormModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Datele APNS pentru formularul 230:</h3>
                  <div className="space-y-2 text-green-700">
                    <p><strong>Denumire:</strong> Asociația pentru Promovarea Nutriției Sănătoase</p>
                    <p><strong>Cod de identificare fiscală:</strong> 12345678</p>
                    <p><strong>IBAN:</strong> RO49 AAAA 1B31 0075 9384 0000</p>
                    <p><strong>Banca:</strong> BCR - Banca Comercială Română</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">📥 Descarcă formularul precompletat:</h4>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mr-3">
                      Descarcă PDF Formular 230
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Formularul conține deja datele APNS. Tu trebuie doar să îți completezi datele personale.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">🌐 Sau completează online:</h4>
                    <Link 
                      href="https://www.anaf.ro"
                      target="_blank"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Spațiul Privat Virtual ANAF
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">Accesează contul tău ANAF și caută secțiunea "Declarația 230"</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">📧 Trimite-ne formularul!</h4>
                    <p className="text-yellow-700 text-sm">
                      Dacă vrei să ne ocupăm noi de transmiterea către ANAF, trimite formularul semnat la 
                      <strong> formular230@apns.ro</strong> sau prin poștă la adresa noastră.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Donate Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                De ce să alegi APNS pentru donația ta?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transparență totală, impact real și focus pe educația nutrițională - aceasta este promisiunea noastră.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Impact Direct</h3>
                <p className="text-gray-600">
                  100% din donații merg direct către programele educaționale. Zero cheltuieli administrative.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Transparență Totală</h3>
                <p className="text-gray-600">
                  Rapoarte detaliate despre utilizarea fondurilor și progresul programelor noastre.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Experiență Comprovată</h3>
                <p className="text-gray-600">
                  10 ani de experiență în educația nutrițională și peste 500 de copii educați.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="cum-functioneaza" className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Cum funcționează procesul?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                În doar 4 pași simpli, poți susține educația nutrițională din România.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => setIsFormModalOpen(true)}
                className="bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
              >
                Începe acum procesul de donație
              </button>
            </div>
          </div>
        </section>

        {/* Impact Stories Section */}
        <section className="py-20 bg-green-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Impactul donațiilor din anul trecut
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Iată cum au fost folosite donațiile primite prin redirectionarea de 3.5% în 2023:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg card-hover">
                  <div className="h-48 bg-green-200 flex items-center justify-center">
                    <span className="text-6xl text-green-600">📚</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="font-semibold text-green-800">{story.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">15,780 lei</div>
                  <div className="text-gray-600">Total donații 2023</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">127</div>
                  <div className="text-gray-600">Donatori activi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                  <div className="text-gray-600">Proiecte finalizate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-600">Fonduri către programe</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Întrebări frecvente
              </h2>
              <p className="text-xl text-gray-600">
                Răspunsuri la cele mai comune întrebări despre redirectionarea de 3.5%
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${selectedFaq === faq.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {selectedFaq === faq.id && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Gata să faci diferența?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Alătură-te celor peste 127 de oameni care au ales să susțină educația nutrițională prin APNS.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="text-sm text-green-200 mb-2">⏰ Nu uita!</div>
              <div className="text-2xl font-bold">Termenul limită: 26 Mai 2025</div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsFormModalOpen(true)}
                className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                📝 Completează Formularul 230
              </button>
              
              <Link 
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Întrebări? Contactează-ne
              </Link>
            </div>

            <div className="mt-8 text-sm text-green-200">
              Pentru întrebări: formular230@apns.ro | 📞 0721 123 456
            </div>
          </div>
        </section>
      </div>
    </>
  );
}