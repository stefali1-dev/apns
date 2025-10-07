import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/NavbarLayout';
import { CARD_ITEMS } from '@/components/CardsData';
import SubscribeModal from '@/components/SubscribeModal';
import VolunteerCarousel from '@/components/VolunteerCarousel';
import ArticleCarousel from '@/components/ArticleCarousel';
import OptimizedImage from '@/components/OptimizedImage';
import ObesityStatsSection from '@/components/ObesityStatsSection';
import { subscribeUser } from '@/lib/services/subscriptionService';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ----------------------------------------
     visit-count + responsive logic
  ---------------------------------------- */
  useEffect(() => {

    const hasSubscribed = document.cookie.includes('email_subscribed');
    const modalClosed = document.cookie.includes('modal_closed');
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
    localStorage.setItem('visit_count', (visitCount + 1).toString());

    if (!hasSubscribed && visitCount >= 1 && !modalClosed) {
      setTimeout(() => setShowModal(true), 1000);
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setModalClosedCookie = () => {
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1 h
    document.cookie = `modal_closed=true; expires=${expiry}; path=/`;
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalClosedCookie();
  };

  const handleSubscribe = async (email: string) => {
    try {
      const result = await subscribeUser(email, 'modal');
      if (result.success) {
        console.log('Successfully subscribed:', email);
        document.cookie = 'email_subscribed=true; max-age=2592000'; // 30 d
        setShowModal(false);
      } else {
        console.warn('Subscription failed:', result.message);
        // Could show an error message to user
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error; // Let SubscribeModal handle the error display
    }
  };

  const cardWidth = isMobile ? 100 : 100 / 3;

  return (
    <Layout>
      <Head>
        <title>APNS - Asociația pentru Promovarea Nutriției Sănătoase</title>
        <meta name="description" content="APNS promovează alimentația corectă prin programe educaționale în școli și online, resurse practice și combaterea bolilor legate de nutriție." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #10b968 0%, #059646 100%);
        }
        .button-hover {
          transition: all 0.3s ease-in-out;
        }
        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        @keyframes gradient-pulse {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-pulse {
          animation: gradient-pulse 6s ease infinite;
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

        /* Improved mobile touch interactions */
        @media (max-width: 768px) {
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
          
          /* Ensure minimum touch target size */
          a, button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improve readability on mobile */
          p {
            line-height: 1.6;
          }
          
          /* Better spacing on mobile */
          .mobile-spacing {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="relative">
        <SubscribeModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubscribe={handleSubscribe}
        />

        <section className="relative w-full min-h-[500px] lg:h-[660px] overflow-visible bg-white lg:bg-transparent">
          {/* Background Split - only visible on large screens */}
          <div className="hidden lg:flex absolute inset-0 w-full h-full">
            <div className="w-[55%] bg-white" />
            <div className="w-[45%] bg-[#09a252]" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex justify-center items-center min-h-[500px] lg:h-full px-4 sm:px-6 md:px-10 lg:px-12 py-8 lg:py-0">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 border-4 border-gray-200 rounded-lg p-4 sm:p-6 md:p-10 max-w-screen-xl w-full shadow-xl">
              {/* Text block */}
              <div className="max-w-xl text-black flex-1 shrink-0 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Împreună Schimbăm Vieți
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                  APNS susține educația, oferă servicii personalizate de nutriție și sprijin real pentru copii și adulți afectați de boli cronice netransmisibile. Împreună, construim nu doar vieți mai sănătoase, ci o comunitate în care nimeni nu este lăsat singur în fața bolii.
                </p>
                <a
                  href="/donate"
                  className="inline-block bg-[#09a252] text-white font-semibold text-sm sm:text-base md:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-lg shadow hover:bg-green-700 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[44px] touch-manipulation"
                >
                  Dăruiește speranță
                </a>
              </div>

              {/* Image block */}
              <div className="relative flex-1 max-w-[600px] w-full mt-2 lg:mt-0 lg:-ml-12">
                <OptimizedImage
                  src="/images/group3.jpg"
                  alt="Poza de grup"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Cards Section */}
        <section className="bg-green-50 py-16">
          <div className="max-w-screen-xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {CARD_ITEMS.map(({ slug, label, Icon }) => (
                <Link
                  key={slug}
                  href={slug === 'coming-soon' ? '/coming-soon' : `/article/${slug}`}
                  className="shadow-lg group relative flex flex-col bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[180px] transform hover:-translate-y-2.5"
                >
                  {/* icon - fixed position at top */}
                  <div className="flex justify-center items-center h-20 mb-4">
                    <Icon className="transition-colors duration-300 group-hover:scale-105" />
                  </div>

                  {/* caption - positioned at bottom with proper spacing */}
                  <div className="flex-1 flex items-end justify-center">
                    <h3 className="text-lg font-semibold text-gray-700 text-center leading-tight">
                      {label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="bg-white mt-12 sm:mt-20">
          <div className="max-w-screen-xl px-4 sm:px-6 pb-8 mx-auto sm:pb-16 lg:pb-24">
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {/* First Content Block */}
              <div className="items-center gap-6 sm:gap-8 xl:gap-16 md:grid md:grid-cols-2">
                <div className="border-4 p-4 sm:p-6 border-gray-200 bg-gray-50 rounded-lg shadow-lg mb-6 md:mb-0">
                  <OptimizedImage
                    className="w-full rounded-lg shadow-lg transition-transform duration-300"
                    src="/images/group.jpeg"
                    alt="Workshop nutrițional"
                    width={1200}
                    height={1000}
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <div className="mt-0">
                  <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                    Despre asociație
                  </h2>
                  <p className="mb-6 text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
                    Asociația pentru Promovarea Nutriției Sănătoase (APNS) este o organizație non-guvernamentală
                    înființată în anul 2021 de către o echipă de dieteticieni autorizați cu formare în cadrul Universității
                    de Medicină și Farmacie „Grigore T. Popa" Iași. Are ca scop principal promovarea nutriției bazate pe dovezi științifice, informarea populației și susținerea politicilor de sănătate orientate către sustenabilitate, prevenție și educație nutrițională.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <Link
                      href="/enroll"
                      className="w-full sm:w-auto text-center inline-block bg-[#09a252] hover:bg-green-700 text-white font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md transition-colors duration-300 min-h-[44px] touch-manipulation"
                    >
                      Implică-te
                    </Link>
                    <Link
                      href="/asociatie"
                      className="w-full sm:w-auto text-center inline-block border-2 border-[#09a252] text-[#09a252] font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md hover:bg-[#09a252] hover:text-white transition-colors duration-300 min-h-[44px] touch-manipulation"
                    >
                      Află mai mult
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Content Block */}
              <div className="items-center gap-6 sm:gap-8 xl:gap-16 md:grid md:grid-cols-2">
                <div className="mb-6 md:mb-0 md:order-2">
                  <div className="border-4 p-4 sm:p-6 border-gray-200 bg-gray-50 rounded-lg shadow-lg">
                    <OptimizedImage
                      className="w-full rounded-lg shadow-lg transition-transform duration-300"
                      src="/images/group2.jpg"
                      alt="Comunitate APNS"
                      width={600}
                      height={400}
                      quality={80}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                </div>
                <div className="md:order-1">
                  <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                    Ce este un dietetician?
                  </h2>
                  <p className="mb-6 text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
                    Dieteticianul este un profesionist din domeniul sănătății, specializat în nutriție și dietetică,
                    cu studii universitare de licență în cadrul Universităților de Medicină și Farmacie. Rolul său este esențial
                    în prevenția bolilor, susținerea tratamentelor medicale prin terapie nutrițională, educația alimentară a populației
                    și dezvoltarea politicilor de sănătate publică.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/dietetician"
                      className="w-full sm:w-auto text-center inline-block bg-[#09a252] text-white font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 min-h-[44px] touch-manipulation"
                    >
                      Află mai mult
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ArticleCarousel />

        <VolunteerCarousel />

        <ObesityStatsSection />

        {/* BMI Test Section */}
        <section className="w-full bg-[#09a252] text-white py-12 sm:py-16">
          <div className="max-w-screen-xl mx-auto p-4 sm:p-6 text-center border-4 border-gray-200 rounded-lg shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Vrei să afli dacă ești la risc?</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed">
              Fă testul IMC de mai jos și descoperă ce poți schimba pentru sănătatea ta!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <Link
                href="/test-imc-adulti"
                className="bg-white text-[#09a252] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:bg-green-50 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 transform min-h-[44px] touch-manipulation"
              >
                Test IMC Adulți
              </Link>
              <Link
                href="/test-imc-copii"
                className="bg-white text-[#09a252] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:bg-green-50 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 transform min-h-[44px] touch-manipulation"
              >
                Test IMC Copii
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section className="py-12 sm:py-16 bg-green-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
              <div className="md:w-1/2 order-2 md:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Împărtășește povestea ta!</h2>
                <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                  Alătură-te echipei noastre de dieteticieni și profesioniști din domeniul sănătății.
                  Împreună putem face diferența în comunitățile noastre și putem inspira schimbări pozitive în viețile oamenilor.
                </p>
                <Link
                  href="/enroll"
                  className="inline-block w-full sm:w-auto text-center bg-[#09a252] text-white font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 min-h-[44px] touch-manipulation"
                >
                  Devino voluntar
                </Link>
              </div>

              <div className="md:w-1/2 order-1 md:order-2">
                <div className="border-4 p-4 sm:p-6 border-gray-200 bg-gray-50 rounded-lg shadow-lg">
                  <OptimizedImage
                    src="/images/donate.jpg"
                    alt="Copii în clasă"
                    width={600}
                    height={400}
                    className="w-full rounded-lg shadow-lg transition-transform duration-300"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}