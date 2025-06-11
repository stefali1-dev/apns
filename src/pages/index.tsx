import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/layouts/NavbarLayout';
import { CARD_ITEMS } from '@/components/CardsData';
import SubscribeModal from '@/components/SubscribeModal';
import { Member, membersService } from '@/lib/services/membersService';
import VolunteerCarousel from '@/components/VolunteerCarousel';


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

        {/* Hero Section */}
        <section className="bg-primary">
          <div className="flex bg-gray-50 w-full flex-col md:flex-row">
            {/* Left Section */}
            <div className="flex-1 md:w-1/2 bg-gray-50 px-4 md:px-10 xl:px-[108px] py-10 flex items-center">
              <div className="max-w-[600px] mx-auto">
                <h1 className="text-black mb-5 text-3xl md:text-4xl xl:text-5xl xl:leading-[4rem] font-bold">
                  Transformăm Cunoașterea în Sănătate!
                </h1>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  APNS promovează alimentația corectă prin programe educaționale în școli și online,
                  resurse practice și combaterea bolilor legate de nutriție. Alătură-te comunității noastre!
                </p>
                <div>
                  <Link
                    href="/donate"
                    className="font-bold text-xl inline-block text-white px-8 py-4 hover:scale-105 duration-300 relative overflow-hidden hover:shadow-lg transition-all animate-gradient-pulse"
                    style={{
                      background: 'linear-gradient(270deg, #22c55e, #10b981, #15803d, #10b981, #22c55e)',
                      backgroundSize: '400% 400%',
                    }}
                  >
                    Redirecționează 3.5% impozit
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex flex-1 md:w-1/2 gradient-bg p-10 items-center justify-start relative overflow-visible">
              <div className="relative z-10 -ml-12 md:-ml-36">
                <div className="border-y-[10px] border-r-[10px] border-gray-50 py-10 pr-10">
                  <div className="relative">
                    <Image
                      src="/images/apns.png"
                      alt="Four senior men and women out for a hike"
                      width={700}
                      height={500}
                      className="w-[700px] h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="max-w-screen-xl mx-auto py-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto">
            {CARD_ITEMS.map(({ slug, label, Icon }) => (
              <Link
                key={slug}
                href={`/article/${slug}`}          // e.g. /article/diabetes
                className="shadow-lg group relative flex flex-col items-center bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[160px] justify-center transform hover:-translate-y-2.5"
              >
                {/* icon */}
                <Icon className="transition-colors duration-300 group-hover:scale-105" />

                {/* caption */}
                <h3 className="text-xl py-2 font-semibold text-gray-700 text-center px-2 leading-tight">
                  {label}
                </h3>
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
                <Image
                  className="w-full rounded-lg shadow-lg hidden sm:block transition-transform duration-300 hover:scale-105"
                  src="/images/image1.png"
                  alt="Workshop nutrițional"
                  width={600}
                  height={400}
                />
                <div className="mt-0">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Asociația noastră promovează nutriția echilibrată
                  </h2>
                  <p className="mb-6 text-gray-500 md:text-lg">
                    De 10 ani, educăm copii și adulți în peste 150 de școli din România. Colaborăm cu nutriționiști
                    certificați pentru a crea programe practice de nutriție și meniuri sănătoase adaptate nevoilor comunității.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/enroll"
                      className="inline-flex bg-green-600 text-white font-semibold px-6 py-3 rounded shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                      Implică-te
                      <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-block border-2 border-green-600 text-green-600 font-semibold px-6 py-3 rounded shadow-md hover:bg-green-600 hover:text-white transition-colors duration-300"
                    >
                      Despre noi
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Content Block */}
              <div className="items-center gap-8 xl:gap-16 md:grid md:grid-cols-2">
                <div className="mb-4 md:mb-0">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Alătură-te comunității noastre pentru o viață mai sănătoasă
                  </h2>
                  <p className="mb-6 text-gray-500 md:text-lg">
                    Participă la cursurile noastre de gătit sănătos, challenge-urile lunare de nutriție sau ascultă podcast-ul
                    săptămânal cu specialiști în domeniu. Toate resursele sunt gratuite și accesibile online.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/projects"
                      className="inline-flex bg-green-600 text-white font-semibold px-6 py-3 rounded shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                      Vezi toate activitățile
                      <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <Image
                  className="w-full rounded-lg shadow-lg hidden sm:block transition-transform duration-300 hover:scale-105"
                  src="/images/donate.png"
                  alt="Comunitate APNS"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gray-50">
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:py-24">
            <div className="grid items-center grid-cols-1 gap-12 xl:grid-cols-3 lg:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  APNS în numere: Impactul nostru colectiv
                </h2>
                <p className="text-gray-500 sm:text-xl">
                  Împreună construim un viitor mai sănătos
                </p>
                <div>
                  <Link href="#" className="inline-flex items-center text-lg font-medium text-green-700 hover:underline">
                    Află mai multe
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 xl:col-span-2 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">Implicare în școli</h3>
                  <p className="mt-2 text-gray-500">
                    Am educat peste 500 de elevi prin programul "Sănătate în ghiozdan"
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">Resurse practice</h3>
                  <p className="mt-2 text-gray-500">
                    Peste 300 de rețete sănătoase disponibile gratuit în platforma noastră
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">Evenimente comunitare</h3>
                  <p className="mt-2 text-gray-500">
                    Organizăm anual 10+ workshop-uri practice în întreaga țară
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">Susținere continuă</h3>
                  <p className="mt-2 text-gray-500">
                    150+ abonați la newsletter-ul lunar cu sfaturi nutriționale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VolunteerCarousel />

        {/* Obesity Stats Section */}
        <section className="bg-gray-50 relative py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Obezitatea în România - date alarmante
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Conform ultimelor studii Ministerului Sănătății (2023)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-green-700 mb-2">34%</div>
                <p className="text-center text-gray-700">dintre români au exces de greutate</p>
              </div>
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-green-700 mb-2">1 din 5</div>
                <p className="text-center text-gray-700">copii de vârstă școlară este supraponderal</p>
              </div>
              <div className="p-6 bg-green-50 rounded shadow-sm flex flex-col items-center">
                <div className="text-5xl font-bold text-green-700 mb-2">62%</div>
                <p className="text-center text-gray-700">dintre adulți nu consumă suficiente legume</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 mt-10">
              Prevenția începe pe farfurie! Alătură-te programelor noastre pentru a învăța să faci alegeri alimentare informate.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Link
                href="/enroll"
                className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded shadow-md hover:bg-green-700 transition-colors duration-300"
              >
                Devino voluntar
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-green-600 text-green-600 font-semibold px-6 py-3 rounded shadow-md hover:bg-green-600 hover:text-white transition-colors duration-300"
              >
                Împărtășește povestea ta
              </Link>
            </div>
          </div>
        </section>

        {/* BMI Test Section */}
        <section className="w-full bg-green-600 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Cunoaște-ți riscul pentru sănătate!</h2>
            <p className="text-lg mb-8">
              Calculează-ți gratuit Indicele de Masă Corporală (IMC) și primești recomandări personalizate de la
              nutriționistul nostru.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                href="#"
                className="bg-white text-green-600 font-medium px-6 py-3 rounded shadow-md hover:text-green-700 transition-colors duration-300"
              >
                Test IMC Gratuit
              </Link>
              <Link
                href="/article/obesity"
                className="border-2 border-white text-white font-medium px-6 py-3 rounded hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                Prevenirea obezității
              </Link>
            </div>
          </div>
        </section>

        {/* donates Section */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Susține educația nutrițională!</h2>
                <p className="text-gray-700 mb-6">
                  Poți redirecționa 3.5% din impozitul pe venit către APNS fără costuri suplimentare.
                  Fondurile strânse susțin programele noastre în școli și crearea de resurse educaționale.
                </p>
                <Link
                  href="/donate"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition-colors duration-300"
                >
                  Redirecționează 3.5% impozit
                </Link>
              </div>

              <div className="md:w-1/2">
                <Image
                  src="/images/donate2.png"
                  alt="Copii în clasă"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}