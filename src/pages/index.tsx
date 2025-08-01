import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/NavbarLayout';
import { CARD_ITEMS } from '@/components/CardsData';
import SubscribeModal from '@/components/SubscribeModal';
import { Member, membersService } from '@/lib/services/membersService';
import VolunteerCarousel from '@/components/VolunteerCarousel';
import OptimizedImage from '@/components/OptimizedImage';


export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  /* ----------------------------------------
     visit-count + responsive logic unchanged
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setModalClosedCookie = () => {
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1 h
    document.cookie = `modal_closed=true; expires=${expiry}; path=/`;
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalClosedCookie();
  };

  const handleSubscribe = (email: string) => {
    console.log('Subscribing email:', email);
    document.cookie = 'email_subscribed=true; max-age=2592000'; // 30 d
    setShowModal(false);
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
      `}</style>

      <div className="relative">
        <SubscribeModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubscribe={handleSubscribe}
        />

        <section className="relative w-full h-[660px] overflow-visible bg-white lg:bg-transparent">
          {/* Background Split - only visible on large screens */}
          <div className="hidden lg:flex absolute inset-0 w-full h-full">
            <div className="w-[55%] bg-white" />
            <div className="w-[45%] bg-[#09a252]" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex justify-center items-center h-full px-6 md:px-10 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-4 border-gray-200 rounded-lg p-6 md:p-10 max-w-screen-xl w-full shadow-xl">
              {/* Text block */}
              <div className="max-w-xl text-black flex-1 shrink-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Împreună Schimbăm <span className="text-[#09a252]">Vieți</span>
                </h1>
                <p className="text-base md:text-lg mb-6">
                  APNS susține educația, oferă servicii personalizate de nutriție și sprijin real pentru copii și adulți afectați de boli cronice netransmisibile. Împreună, construim nu doar vieți mai sănătoase, ci o comunitate în care nimeni nu este lăsat singur în fața bolii.
                </p>
                <a
                  href="/donate"
                  className="inline-block bg-[#09a252] text-white font-semibold text-base md:text-lg py-3 px-6 rounded-lg shadow hover:bg-[#09a252] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Dăruiește speranță
                </a>
              </div>

              {/* Image block */}
              <div className="relative flex-1 max-w-[600px] w-full -mt-4 lg:mt-0 lg:-ml-12">
                <OptimizedImage
                  src="/images/header.jpg"
                  alt="Four senior men and women out for a hike"
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
        <section className="max-w-screen-xl mx-auto py-10 px-4">
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
        </section>

        {/* Main Content Sections */}
        <section className="bg-white mt-20">
          <div className="max-w-screen-xl px-4 pb-8 mx-auto sm:pb-16 lg:pb-24">
            <div className="space-y-8 lg:space-y-20">
              {/* First Content Block */}
              <div className="items-center gap-8 xl:gap-16 md:grid md:grid-cols-2">
                <OptimizedImage
                  className="w-full rounded-lg shadow-lg hidden sm:block transition-transform duration-300"
                  src="/images/group.jpeg"
                  alt="Workshop nutrițional"
                  width={1200}
                  height={1000}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="mt-0">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Despre asociație
                  </h2>
                  <p className="mb-6 text-gray-500 md:text-lg">
                    Asociația pentru Promovarea Nutriției Sănătoase (APNS) este o organizație non-guvernamentală
                    înființată în anul 2021 de către o echipă de dieteticieni autorizați cu formare în cadrul Universității
                    de Medicină și Farmacie „Grigore T. Popa” Iași. Are ca scop principal promovarea nutriției bazate pe dovezi științifice, informarea populației și susținerea politicilor de sănătate orientate către sustenabilitate, prevenție și educație nutrițională.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href="/enroll"
                      className="inline-block bg-[#09a252] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#09a252] transition-colors duration-300"
                    >
                      Implică-te
                    </Link>
                    <Link
                      href="/asociatie"
                      className="inline-block border-2 border-[#09a252] text-[#09a252] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#09a252] hover:text-white transition-colors duration-300"
                    >
                      Află mai mult
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Content Block */}
              <div className="items-center gap-8 xl:gap-16 md:grid md:grid-cols-2">
                <div className="mb-4 md:mb-0">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Ce este un dietetician?
                  </h2>
                  <p className="mb-6 text-gray-500 md:text-lg">
                    Dieteticianul este un profesionist din domeniul sănătății, specializat în nutriție și dietetică,
                    cu studii universitare de licență în cadrul Universităților de Medicină și Farmacie. Rolul său este esențial
                    în prevenția bolilor, susținerea tratamentelor medicale prin terapie nutrițională, educația alimentară a populației
                    și dezvoltarea politicilor de sănătate publică.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/dietetician"
                      className="inline-block bg-[#09a252] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#09a252] transition-colors duration-300"
                    >
                      Află mai mult
                    </Link>
                  </div>
                </div>
                <OptimizedImage
                  className="w-full rounded-lg shadow-lg hidden sm:block transition-transform duration-300"
                  src="/images/donate.png"
                  alt="Comunitate APNS"
                  width={600}
                  height={400}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        <VolunteerCarousel />

        {/* Obesity Stats Section */}
        <section className="bg-gray-50 relative py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Obezitatea în România - date alarmante
            </h2>
            <p className="text-lg text-gray-600 mb-10 text-center">
              Conform ultimelor studii Ministerului Sănătății (2023)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-[#09a252] mb-2">34%</div>
                <p className="text-center text-gray-700">dintre români au exces de greutate</p>
              </div>
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-[#09a252] mb-2">1 din 5</div>
                <p className="text-center text-gray-700">copii de vârstă școlară este supraponderal</p>
              </div>
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-[#09a252] mb-2">62%</div>
                <p className="text-center text-gray-700">dintre adulți nu consumă suficiente legume</p>
              </div>
            </div>
          </div>
        </section>

        {/* BMI Test Section */}
        <section className="w-full bg-[#09a252] text-white py-16">
          <div className="max-w-screen-xl mx-auto p-6 text-center  border-4 border-gray-200 rounded-lg shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Vrei să afli dacă ești la risc?</h2>
            <p className="text-xl mb-8">
              Fă testul IMC de mai jos și descoperă ce poți schimba pentru sănătatea ta!
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                href="/test-imc-adulti"
                className="bg-white text-[#09a252] font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-50 transition-colors duration-300"
              >
                Test IMC Adulți
              </Link>
              <Link
                href="/test-imc-copii"
                className="bg-white text-[#09a252] font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-50 transition-colors duration-300"
              >
                Test IMC Copii
              </Link>
            </div>
          </div>
        </section>

        {/* donates Section */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Împărtășește povestea ta!</h2>
                <p className="text-gray-700 mb-6">
                  Alătură-te echipei noastre de dieteticieni și profesioniști din domeniul sănătății.
                  Împreună putem face diferența în comunitățile noastre și putem inspira schimbări pozitive în viețile oamenilor.
                </p>
                <Link
                  href="/enroll"
                  className="inline-block bg-[#09a252] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#09a252] transition-colors duration-300"
                >
                  Devino voluntar
                </Link>
              </div>

              <div className="md:w-1/2">
                <OptimizedImage
                  src="/images/donate2.png"
                  alt="Copii în clasă"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow transition-transform duration-300"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}