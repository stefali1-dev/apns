import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  varsta: string;
  oras: string;
  experienta: string;
  motivatie: string;
  domenii: string[];
  disponibilitate: string;
  studii: string;
}

export default function EnrollPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nume: '',
    prenume: '',
    email: '',
    telefon: '',
    varsta: '',
    oras: '',
    experienta: '',
    motivatie: '',
    domenii: [],
    disponibilitate: '',
    studii: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const volunteerAreas = [
    { id: 'educatie', label: 'Educație nutrițională în școli', icon: '🏫' },
    { id: 'workshop', label: 'Workshop-uri pentru părinți', icon: '👨‍👩‍👧‍👦' },
    { id: 'digital', label: 'Conținut digital și social media', icon: '💻' },
    { id: 'evenimente', label: 'Organizare evenimente', icon: '🎪' },
    { id: 'cercetare', label: 'Cercetare și documentare', icon: '📊' },
    { id: 'traduceri', label: 'Traduceri și redactare', icon: '📝' },
    { id: 'fundraising', label: 'Strângere de fonduri', icon: '💰' },
    { id: 'design', label: 'Design grafic și materiale', icon: '🎨' }
  ];

  const testimonials = [
    {
      name: "Maria Popescu",
      role: "Voluntar educație, 2 ani",
      text: "Voluntariatul la APNS mi-a schimbat perspectiva asupra importanței educației nutriționale. Să văd cum copiii învață să facă alegeri sănătoase este incredibil de împlinitor.",
      image: "/images/volunteer1.jpg"
    },
    {
      name: "Alexandru Ionescu", 
      role: "Coordonator workshop-uri, 3 ani",
      text: "Echipa APNS este ca o familie. Împreună reușim să aducem schimbări reale în comunitățile unde lucrăm. Fiecare zi aduce o nouă oportunitate de a face diferența.",
      image: "/images/volunteer2.jpg"
    }
  ];

  const benefits = [
    {
      icon: '🎓',
      title: 'Dezvoltare profesională',
      description: 'Cursuri gratuite de nutriție și comunicare'
    },
    {
      icon: '🤝',
      title: 'Rețea de contacte',
      description: 'Conectări cu profesioniști din domeniul sănătății'
    },
    {
      icon: '📜',
      title: 'Certificări oficiale',
      description: 'Diplome și recomandări pentru CV'
    },
    {
      icon: '🌟',
      title: 'Impact real',
      description: 'Contribuie direct la educația copiilor'
    },
    {
      icon: '⏰',
      title: 'Program flexibil',
      description: 'Adaptăm activitățile la disponibilitatea ta'
    },
    {
      icon: '🎉',
      title: 'Experiențe memorabile',
      description: 'Evenimente speciale și ieșiri în echipă'
    }
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDomeniiChange = (domeniu: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        domenii: [...prev.domenii, domeniu]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        domenii: prev.domenii.filter(d => d !== domeniu)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulăm trimiterea formularului
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.nume && formData.prenume && formData.email && formData.telefon;
      case 2:
        return formData.domenii.length > 0 && formData.disponibilitate;
      case 3:
        return formData.motivatie.length >= 50;
      default:
        return false;
    }
  };

  return (
    <>
      <Head>
        <title>Înscrie-te ca voluntar - APNS</title>
        <meta name="description" content="Alătură-te echipei de voluntari APNS și contribuie la educația nutrițională din România. Aplicare online simplă în 3 pași." />
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

        .step-indicator {
          transition: all 0.3s ease;
        }

        .step-indicator.active {
          background: linear-gradient(135deg, #10b968 0%, #059646 100%);
          color: white;
          transform: scale(1.1);
        }

        .step-indicator.completed {
          background: #10b968;
          color: white;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-elements::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 10%;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-elements::after {
          content: '';
          position: absolute;
          bottom: 20%;
          right: 15%;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .pulse-green {
          animation: pulse-green 2s ease-in-out infinite;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="gradient-bg relative overflow-hidden">
          <div className="floating-elements"></div>
          
          <div className="relative max-w-screen-xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Alătură-te echipei<br />
                  <span className="text-green-200">APNS</span> ca voluntar
                </h1>
                
                <p className="text-xl mb-8 text-green-100 leading-relaxed">
                  Fii parte din schimbarea pe care o vrei să o vezi în lume. 
                  Contribuie la educația nutrițională a copiilor din România.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-semibold">✨ 50+ voluntari activi</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-semibold">🏆 Impact în 12 orașe</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-semibold">❤️ Comunitate unită</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Program flexibil adaptat stilului tău de viață</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Formare profesională continuă gratuită</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Certificări oficiale pentru activitatea voluntară</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">Impactul echipei noastre în 2024:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-200">500+</div>
                      <div className="text-sm text-white/80">Copii educați</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-200">24</div>
                      <div className="text-sm text-white/80">Workshop-uri</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-200">12</div>
                      <div className="text-sm text-white/80">Școli partenere</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-200">1500+</div>
                      <div className="text-sm text-white/80">Ore volunteer</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link 
                    href="#formular"
                    className="inline-block bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    🚀 Începe aplicarea acum
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Povestiri din echipa noastră
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descoperă experiențele celor care fac deja diferența în comunitățile lor
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 card-hover">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                    </div>
                    <div>
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                        "{testimonial.text}"
                      </blockquote>
                      <div>
                        <div className="font-bold text-gray-800">{testimonial.name}</div>
                        <div className="text-green-600 font-medium">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Ce îți oferim ca voluntar APNS
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Voluntariatul la APNS înseamnă mult mai mult decât timpul donat - înseamnă dezvoltare personală și profesională
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="formular" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Formularul de aplicare
              </h2>
              <p className="text-xl text-gray-600">
                Completează formularul în 3 pași simpli - durează doar 5 minute
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div 
                      className={`step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        activeStep === step ? 'active' : 
                        activeStep > step ? 'completed' : 
                        'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {activeStep > step ? '✓' : step}
                    </div>
                    {step < 3 && <div className="w-16 h-1 bg-gray-200 mx-2"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Informații personale</h3>
                      <p className="text-gray-600">Să te cunoaștem mai bine</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nume *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nume}
                          onChange={(e) => handleInputChange('nume', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Numele tău de familie"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prenume *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.prenume}
                          onChange={(e) => handleInputChange('prenume', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Prenumele tău"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="exemplu@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.telefon}
                          onChange={(e) => handleInputChange('telefon', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="0721 123 456"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Vârsta
                        </label>
                        <select
                          value={formData.varsta}
                          onChange={(e) => handleInputChange('varsta', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        >
                          <option value="">Selectează</option>
                          <option value="18-25">18-25 ani</option>
                          <option value="26-35">26-35 ani</option>
                          <option value="36-45">36-45 ani</option>
                          <option value="46-55">46-55 ani</option>
                          <option value="55+">Peste 55 ani</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Orașul
                        </label>
                        <input
                          type="text"
                          value={formData.oras}
                          onChange={(e) => handleInputChange('oras', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Orașul în care locuiești"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Studii/Formare profesională
                      </label>
                      <textarea
                        value={formData.studii}
                        onChange={(e) => handleInputChange('studii', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Scurt despre studiile tale și experiența profesională relevantă..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Volunteer Preferences */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Domenii de interes</h3>
                      <p className="text-gray-600">În ce activități ai vrea să te implici?</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Selectează domeniile care te interesează: *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {volunteerAreas.map((area) => (
                          <label key={area.id} className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                            <input
                              type="checkbox"
                              checked={formData.domenii.includes(area.id)}
                              onChange={(e) => handleDomeniiChange(area.id, e.target.checked)}
                              className="mr-3 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-xl mr-3">{area.icon}</span>
                            <span className="font-medium text-gray-700">{area.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Disponibilitate *
                      </label>
                      <select
                        required
                        value={formData.disponibilitate}
                        onChange={(e) => handleInputChange('disponibilitate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Selectează disponibilitatea</option>
                        <option value="weekend">Doar în weekend</option>
                        <option value="saptamana">În timpul săptămânii (după program)</option>
                        <option value="flexibil">Flexibil - și weekend și în săptămână</option>
                        <option value="ocazional">Ocazional - pentru evenimente speciale</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Experiență anterioară în voluntariat
                      </label>
                      <textarea
                        value={formData.experienta}
                        onChange={(e) => handleInputChange('experienta', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Descrie pe scurt experiența ta în voluntariat sau activități similare (opțional)..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Motivation */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Motivația ta</h3>
                      <p className="text-gray-600">De ce vrei să fii voluntar la APNS?</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Scrie-ne despre motivația ta să te alături echipei APNS *
                      </label>
                      <textarea
                        required
                        value={formData.motivatie}
                        onChange={(e) => handleInputChange('motivatie', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Ce te motivează să te implici în educația nutrițională? Cum crezi că poți contribui la misiunea APNS? (minim 50 de caractere)"
                      />
                      <div className="text-sm text-gray-500 mt-2">
                        {formData.motivatie.length}/50 caractere minimum
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-3">Ce urmează după aplicare?</h4>
                      <div className="space-y-2 text-green-700 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">1️⃣</span>
                          <span>Vei primi un email de confirmare în maxim 24 de ore</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">2️⃣</span>
                          <span>Te vom contacta pentru o discuție informală (online sau telefonic)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">3️⃣</span>
                          <span>Îți vom propune primele activități pe baza intereselor tale</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">4️⃣</span>
                          <span>Vei primi accesul la platforma de voluntari și materialele de formare</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeStep === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    disabled={activeStep === 1}
                  >
                    ← Înapoi
                  </button>

                  {activeStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      disabled={!isStepValid(activeStep)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                        isStepValid(activeStep)
                          ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continuă →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid(activeStep) || isSubmitting}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                        isStepValid(activeStep) && !isSubmitting
                          ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Se trimite...
                        </div>
                      ) : (
                        '🚀 Trimite aplicația'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎉</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Aplicația ta a fost trimisă!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Mulțumim pentru interesul de a te alătura echipei APNS! 
                Vei primi un email de confirmare în următoarele 24 de ore.
              </p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Perfect! 
              </button>
              
              <div className="mt-4 text-sm text-gray-500">
                Îți mulțumim că vrei să faci diferența! 💚
              </div>
            </div>
          </div>
        )}

        {/* Community Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Fă parte din comunitatea APNS
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Peste 50 de voluntari din întreaga țară lucrează împreună pentru un viitor mai sănătos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  👥
                </div>
                <div className="text-2xl font-bold text-gray-800">50+</div>
                <div className="text-gray-600">Voluntari activi</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🏢
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-gray-600">Orașe acoperite</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📚
                </div>
                <div className="text-2xl font-bold text-gray-800">1500+</div>
                <div className="text-gray-600">Ore de voluntariat</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🎯
                </div>
                <div className="text-2xl font-bold text-gray-800">24</div>
                <div className="text-gray-600">Proiecte realizate</div>
              </div>
            </div>

            {/* Volunteer Images Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">👨‍🏫</div>
                    <div className="text-xl font-semibold">Workshop educațional</div>
                    <div className="text-green-100">Voluntarii APNS în acțiune</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white font-bold text-lg">Educație în școli</h3>
                  <p className="text-white/90 text-sm">Echipa noastră susține workshop-uri interactive pentru copii</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🤝</div>
                    <div className="text-xl font-semibold">Echipa unită</div>
                    <div className="text-blue-100">Voluntari din toată România</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white font-bold text-lg">Comunitate puternică</h3>
                  <p className="text-white/90 text-sm">Împreună construim o rețea națională de educație nutrițională</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Gata să începi aventura?
              </h3>
              <p className="text-gray-600 mb-6">
                Alătură-te unei comunități care chiar face diferența în viețile copiilor din România
              </p>
              <Link 
                href="#formular"
                className="inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
              >
                Completează formularul de aplicare
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Întrebări frecvente despre voluntariat
              </h2>
              <p className="text-xl text-gray-600">
                Răspunsuri la cele mai comune întrebări despre cum poți deveni voluntar APNS
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Cât timp trebuie să dedic voluntariatului?",
                  answer: "Programul nostru este foarte flexibil. Poți contribui cu doar 2-4 ore pe lună pentru începători, sau mai mult dacă dorești să te implici în mai multe proiecte. Respectăm timpul tău și ne adaptăm la disponibilitatea ta."
                },
                {
                  question: "Trebuie să am experiență în nutriție pentru a fi voluntar?",
                  answer: "Nu este necesar! Oferim formare completă pentru toți voluntarii noștri. Dacă ai pasiune pentru educația sănătoasă și vrei să înveți, te vom ajuta să dobândești toate cunoștințele necesare."
                },
                {
                  question: "Pot fi voluntar dacă nu locuiesc în București?",
                  answer: "Absolut! Avem voluntari în toată țara. Multe dintre activitățile noastre se pot desfășura online, iar pentru cele fizice organizăm echipe locale în mai multe orașe din România."
                },
                {
                  question: "Primesc vreo certificare pentru activitatea de voluntar?",
                  answer: "Da! La finalul fiecărui an îți oferim o diplomă de voluntar cu numărul de ore dedicate și activitățile desfășurate. De asemenea, poți primi recomandări oficiale pentru CV."
                },
                {
                  question: "Care sunt costurile pentru a fi voluntar?",
                  answer: "Voluntariatul la APNS este complet gratuit. Noi acoperim toate costurile pentru materialele educaționale, formarea și certificările. În plus, pentru deplasările la evenimente îți rambursăm cheltuielile de transport."
                },
                {
                  question: "Cum pot să îmi încetez activitatea de voluntar?",
                  answer: "Poți înceta activitatea oricând, fără penalități. Înțelegem că prioritățile se schimbă. Tot ce îți cerem este să ne anunți cu măcar o săptămână înainte pentru a ne reorganiza activitățile."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${selectedFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {selectedFaq === index && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 gradient-bg">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Încă ai întrebări?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Echipa noastră este aici să îți răspundă la orice nelămurire despre programul de voluntariat
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <Link 
                href="mailto:voluntariat@apns.ro"
                className="bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                📧 voluntariat@apns.ro
              </Link>
              
              <Link 
                href="tel:+40721123456"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                📞 0721 123 456
              </Link>
            </div>

            <div className="text-sm text-green-200">
              Programul nostru: Luni - Vineri, 9:00 - 17:00
            </div>
          </div>
        </section>
      </div>
    </>
  );
}