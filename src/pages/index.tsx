import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/layouts/NavbarLayout';

// Mock data for volunteers
const volunteers = [
  {
    name: 'Dr. Maria Popescu',
    photo: '/images/volunteers/volunteer1.jpg',
    title: 'Nutriționist Șef',
    bio: 'Cu peste 15 ani de experiență în nutriție clinică, Dr. Maria coordonează programele noastre educaționale și dezvoltă rețete sănătoase pentru comunitate.',
    instagram: 'https://instagram.com/mariapopescu',
    facebook: 'https://facebook.com/mariapopescu'
  },
  {
    name: 'Alex Ionescu',
    photo: '/images/volunteers/volunteer2.jpg',
    title: 'Coordonator Voluntari',
    bio: 'Pasionat de educația nutrițională, Alex organizează workshopurile noastre și coordonează echipa de voluntari din întreaga țară.',
    instagram: 'https://instagram.com/alexionescu',
    facebook: ''
  },
  {
    name: 'Elena Dumitrescu',
    photo: '/images/volunteers/volunteer3.jpg',
    title: 'Specialist Comunicare',
    bio: 'Elena se ocupă de comunicarea cu școlile și comunitățile locale, asigurându-se că mesajul nostru ajunge la cât mai mulți oameni.',
    instagram: '',
    facebook: 'https://facebook.com/elenadumitrescu'
  },
  {
    name: 'Dr. Radu Stanciu',
    photo: '/images/volunteers/volunteer4.jpg',
    title: 'Consultant Medical',
    bio: 'Medic specialist în endocrinologie, Dr. Radu ne ajută cu aspectele medicale ale programelor de nutriție și prevenția diabetului.',
    instagram: 'https://instagram.com/radustanciu',
    facebook: 'https://facebook.com/radustanciu'
  }
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [currentVolunteerIndex, setCurrentVolunteerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we should show the modal
    const hasSubscribed = document.cookie.includes('email_subscribed');
    const modalClosed = document.cookie.includes('modal_closed');
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');

    // Increment visit count
    localStorage.setItem('visit_count', (visitCount + 1).toString());

    // Show modal on second visit if not subscribed and not recently closed
    if (!hasSubscribed && visitCount >= 1 && !modalClosed) {
      setTimeout(() => setShowModal(true), 1000);
    }

    // Handle window resize for carousel
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setModalClosedCookie = () => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
    document.cookie = `modal_closed=true; expires=${expiry.toUTCString()}; path=/`;
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalClosedCookie();
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscription - in real app, this would call your API
    console.log('Subscribing email:', email);
    document.cookie = 'email_subscribed=true; max-age=2592000';
    setShowModal(false);
    setEmail('');
  };

  const maxVolunteerIndex = isMobile
    ? Math.max(volunteers.length - 1, 0)
    : Math.max(volunteers.length - 3, 0);

  const nextVolunteer = () => {
    setCurrentVolunteerIndex(Math.min(currentVolunteerIndex + 1, maxVolunteerIndex));
  };

  const prevVolunteer = () => {
    setCurrentVolunteerIndex(Math.max(currentVolunteerIndex - 1, 0));
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
      `}</style>

      <div className="relative">
        {/* Modal */}
        {showModal && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleModalClose}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
                {/* Close Button */}
                <button
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Decorative Header */}
                  <div className="mb-6 text-center">
                    <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Creștem sănătoși împreună!</h2>
                    <p className="text-gray-600">Primiți sfaturi nutriționale, rețete și actualizări direct în inbox</p>
                  </div>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresa de e-mail"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      Abonați-vă acum!
                    </button>
                  </form>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    Vă respectăm confidențialitatea. Dezabonați-vă oricând.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

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
        <main className="max-w-screen-xl mx-auto py-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto">

            {/* Card 1: Diabet */}
            <Link
              href="/articles/diabetes"
              className="shadow-lg group relative flex flex-col items-center bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[160px] justify-center transform hover:-translate-y-2.5"
            >
              <div className="max-w-md group inline-block cursor-pointer">
                <svg
                  className="w-20 h-20 mt-2 mb-6"
                  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.003 512.003">
                  <path
                    className="fill-[#D8143A] transition-[fill] duration-300 ease-in-out group-hover:fill-[#14D83A]"
                    d="M360.773,20.807c-38.114,0-75.772,14.352-104.769,39.228c-0.002-0.002-0.003-0.003-0.005-0.003c-29.001-24.876-66.657-39.225-104.77-39.225C66.429,20.807,0,87.234,0,172.037c0,102.506,71.37,165.162,179.402,260.002c9.234,8.107,18.763,16.471,28.57,25.143c0.067,0.059,0.135,0.119,0.203,0.177l32.617,28.174c4.367,3.774,9.789,5.66,15.21,5.663c0.003,0,0.005,0,0.008,0c5.424,0,10.847-1.889,15.219-5.663l32.611-28.174c0.068-0.059,0.135-0.118,0.203-0.177c64.565-57.104,112.977-100.818,148-143.453c40.907-49.796,59.961-94.82,59.961-141.692C512,87.234,445.573,20.807,360.773,20.807z" />
                  <polygon
                    className="fill-[#830018] transition-[fill] duration-300 ease-in-out group-hover:fill-[#188300]"
                    points="287.037,209.449 287.037,147.373 256,147.373 224.961,147.373 224.961,209.449 162.889,209.449 162.889,271.523 224.961,271.523 224.961,333.596 256,333.596 287.037,333.596 287.037,271.523 349.111,271.523 349.111,209.449" />
                </svg>
              </div>
              <h3 className="text-xl py-2 font-semibold text-gray-700 text-center px-2 leading-tight">
                Diabet
              </h3>
            </Link>

            {/* Card 2: Obezitate */}
            <Link
              href="/articles/obesity"
              className="shadow-lg group relative flex flex-col items-center bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[160px] justify-center transform hover:-translate-y-2.5"
            >
              <div className="group inline-block cursor-pointer">
                <svg
                  className="w-20 h-20 mt-2 mb-6 text-gray-500 group-hover:text-green-600 transition-colors duration-300"
                  version="1.1" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path
                    className="fill-[#AFAFD9] transition-[fill] duration-300 ease-in-out group-hover:fill-[#AFD9AF]"
                    d="M256,11.251c-141.384,0-256,29.51-256,65.911v399.645c0,13.224,10.72,23.942,23.942,23.942h464.116c13.224,0,23.942-10.72,23.942-23.942V77.162C512,40.761,397.385,11.251,256,11.251z" />
                  <path
                    className="fill-[#464655] transition-[fill] duration-300 ease-in-out group-hover:fill-[#465546]"
                    d="M446.799,206.95H65.201c-10.856,0-19.656,8.8-19.656,19.656V436.57c0,10.856,8.8,19.656,19.656,19.656h381.597c10.856,0,19.656-8.8,19.656-19.656V226.608C466.456,215.752,457.655,206.95,446.799,206.95z" />
                  <path
                    className="fill-[#FF6465] transition-[fill] duration-300 ease-in-out group-hover:fill-[#65D965]"
                    d="M256,136.305c-5.042,0-9.129-4.087-9.129-9.129V78.249c0-5.042,4.087-9.129,9.129-9.129c5.042,0,9.129,4.087,9.129,9.129v48.927C265.129,132.218,261.042,136.305,256,136.305z" />
                </svg>
              </div>
              <h3 className="text-xl py-2 font-semibold text-gray-700 text-center px-2 leading-tight">
                Obezitate
              </h3>
            </Link>

            {/* Card 3: Guta */}
            <Link
              href="/articles/gout"
              className="shadow-lg group relative flex flex-col items-center bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[160px] justify-center transform hover:-translate-y-2.5"
            >
              <div className="group inline-block cursor-pointer">
                <svg
                  version="1.1"
                  className="w-20 h-20 mt-2 mb-6 text-gray-500 group-hover:text-green-600 transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 432 432">
                  <path
                    className="fill-[#F69494] transition-[fill] duration-300 ease-in-out group-hover:fill-[#FFB6C1]"
                    d="M368,280h-8v-32h20c15.2,0,28-12.8,28-28s-12.8-28-28-28H112c-17.6,0-32-14.4-32-32s14.4-32,32-32h223.2c22.4,0,40.8-18.4,40.8-40.8V8h-48v56c0,8.8-7.2,16-16,16H48c-13.6,0-24,10.4-24,24v8c0,12.8,10.4,24,24,24h3.2c1.6,0,3.2,0,4.8,0h8v24v8h-8c-17.6,0-32,14.4-32,32s14.4,32,32,32h200c17.6,0,32,14.4,32,32s-14.4,32-32,32H56c-17.6,0-32,14.4-32,32s14.4,32,24,32h160v32h-24v32h88v-32h-32v-32h128c22.4,0,40-17.6,40-40S390.4,280,368,280z" />
                </svg>
              </div>
              <h3 className="text-xl py-2 font-semibold text-gray-700 text-center px-2 leading-tight">
                Guta
              </h3>
            </Link>
          </div>
        </main>

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

        {/* Volunteers Section */}
        <div className="max-w-screen-xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Echipa Noastră de Voluntari</h2>
          <p className="text-lg text-gray-600 mb-10">
            Întâlnește oamenii dedicați care fac posibilă misiunea asociației noastre.
          </p>
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-28 overflow-hidden">
          {/* Carousel Container */}
          <div className="relative">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentVolunteerIndex * cardWidth}%)` }}
            >
              {volunteers.map((volunteer, index) => (
                <div key={index} className="min-w-full md:min-w-[33.333%] px-4 transition-all duration-300">
                  <div className="relative bg-white rounded-2xl shadow-xl border-green-50 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 mx-2">
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-emerald-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Volunteer Photo */}
                    <div className="relative z-10 w-48 h-48 mx-auto -mt-12 rounded-full overflow-hidden border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={volunteer.photo}
                        alt={volunteer.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent"></div>
                    </div>

                    {/* Volunteer Info */}
                    <div className="relative z-10 px-6 py-8 text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{volunteer.name}</h3>
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                          🌟 {volunteer.title}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {volunteer.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-3 mt-6">
                        {volunteer.instagram && (
                          <a href={volunteer.instagram} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </a>
                        )}

                        {volunteer.facebook && (
                          <a href={volunteer.facebook} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevVolunteer}
            className={`absolute top-1/2 left-1 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 ${currentVolunteerIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={currentVolunteerIndex === 0}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextVolunteer}
            className={`absolute top-1/2 right-1 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 ${currentVolunteerIndex >= maxVolunteerIndex ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={currentVolunteerIndex >= maxVolunteerIndex}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

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
                href="/articles/obesity"
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