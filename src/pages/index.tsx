import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

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

  const cardWidth = isMobile ? 100 : 100/3;

  return (
    <>
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
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
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
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }

        .floating-elements::after {
          content: '';
          position: absolute;
          bottom: 30%;
          right: 15%;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          animation: float 12s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes gradient-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-pulse {
          background-size: 200% 200%;
          animation: gradient-pulse 3s ease infinite;
        }

        .health-icon-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .health-icon-hover:hover .icon-svg {
          transform: scale(1.1) rotate(5deg);
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
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative transform transition-all">
                {/* Close Button */}
                <button 
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Decorative Header */}
                  <div className="mb-6 text-center">
                    <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
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
        <section className="gradient-bg relative overflow-visible">
          <div className="floating-elements"></div>
          
          <div className="relative max-w-screen-xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section */}
              <div className="text-white lg:pr-8">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                  Transformăm<br />
                  <span className="text-green-200">Cunoașterea</span><br />
                  în Sănătate!
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
                  APNS promovează alimentația corectă prin programe educaționale în școli și online,
                  resurse practice și combaterea bolilor legate de nutriție.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <Link
                    href="/donation"
                    className="inline-block bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    📝 Redirecționează 3.5% impozit
                  </Link>
                  
                  <Link
                    href="/enroll"
                    className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                  >
                    Implică-te ca voluntar
                  </Link>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-200 mb-1">500+</div>
                    <div className="text-sm">Copii educați</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-200 mb-1">150+</div>
                    <div className="text-sm">Școli partenere</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-200 mb-1">10</div>
                    <div className="text-sm">Ani de experiență</div>
                  </div>
                </div>
              </div>

              {/* Right Section - Dramatic Pop-out Image */}
              <div className="relative lg:-mr-16 xl:-mr-24">
                {/* Background glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-white/20 via-green-200/30 to-blue-200/20 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
                
                {/* Multiple layered shadows for depth */}
                <div className="absolute -inset-6 bg-white/10 rounded-2xl transform rotate-2 scale-105"></div>
                <div className="absolute -inset-4 bg-white/20 rounded-2xl transform -rotate-1 scale-102"></div>
                
                {/* Main image container with dramatic border and spacing */}
                <div className="relative z-20 transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                  {/* Outer border frame */}
                  <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    {/* Inner border frame */}
                    <div className="bg-gradient-to-br from-green-100 to-white p-3 rounded-xl">
                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src="/images/apns.png"
                          alt="Echipa APNS în acțiune"
                          width={700}
                          height={500}
                          className="w-full h-auto object-cover transform hover:scale-110 transition-transform duration-700"
                          priority
                        />
                        
                        {/* Image overlay for extra effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-transparent"></div>
                        
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements around the image */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-bounce delay-300"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-pulse delay-500"></div>
                  <div className="absolute top-1/2 -left-8 w-6 h-6 bg-pink-400 rounded-full opacity-70 animate-ping delay-700"></div>
                </div>

                {/* Additional background elements for more drama */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-300/20 to-transparent rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Topics Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Probleme de sănătate pe care le abordăm
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Educația nutrițională poate preveni și ameliora multe afecțiuni cronice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Diabetes Card */}
              <Link
                href="/articles/diabetes"
                className="health-icon-hover group bg-white rounded-2xl p-8 shadow-lg card-hover text-center border border-gray-100"
              >
                <div className="icon-svg mb-6 mx-auto">
                  <svg 
                    className="w-20 h-20 mx-auto"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512.003 512.003">
                    <path 
                      className="fill-red-500 group-hover:fill-green-500 transition-colors duration-500" 
                      d="M360.773,20.807c-38.114,0-75.772,14.352-104.769,39.228c-0.002-0.002-0.003-0.003-0.005-0.003c-29.001-24.876-66.657-39.225-104.77-39.225C66.429,20.807,0,87.234,0,172.037c0,102.506,71.37,165.162,179.402,260.002c9.234,8.107,18.763,16.471,28.57,25.143c0.067,0.059,0.135,0.119,0.203,0.177l32.617,28.174c4.367,3.774,9.789,5.66,15.21,5.663c0.003,0,0.005,0,0.008,0c5.424,0,10.847-1.889,15.219-5.663l32.611-28.174c0.068-0.059,0.135-0.118,0.203-0.177c64.565-57.104,112.977-100.818,148-143.453c40.907-49.796,59.961-94.82,59.961-141.692C512,87.234,445.573,20.807,360.773,20.807z"/>
                    <polygon 
                      className="fill-red-700 group-hover:fill-green-700 transition-colors duration-500" 
                      points="287.037,209.449 287.037,147.373 256,147.373 224.961,147.373 224.961,209.449 162.889,209.449 162.889,271.523 224.961,271.523 224.961,333.596 256,333.596 287.037,333.596 287.037,271.523 349.111,271.523 349.111,209.449"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  Diabet
                </h3>
                <p className="text-gray-600">
                  Prevenirea și gestionarea diabetului prin alimentație echilibrată
                </p>
              </Link>

              {/* Obesity Card */}
              <Link
                href="/articles/obesity"
                className="health-icon-hover group bg-white rounded-2xl p-8 shadow-lg card-hover text-center border border-gray-100"
              >
                <div className="icon-svg mb-6 mx-auto">
                  <svg 
                    className="w-20 h-20 mx-auto"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512">
                    <path 
                      className="fill-blue-400 group-hover:fill-green-400 transition-colors duration-500" 
                      d="M256,11.251c-141.384,0-256,29.51-256,65.911v399.645c0,13.224,10.72,23.942,23.942,23.942h464.116c13.224,0,23.942-10.72,23.942-23.942V77.162C512,40.761,397.385,11.251,256,11.251z"/>
                    <path 
                      className="fill-blue-600 group-hover:fill-green-600 transition-colors duration-500" 
                      d="M446.799,206.95H65.201c-10.856,0-19.656,8.8-19.656,19.656V436.57c0,10.856,8.8,19.656,19.656,19.656h381.597c10.856,0,19.656-8.8,19.656-19.656V226.608C466.456,215.752,457.655,206.95,446.799,206.95z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  Obezitate
                </h3>
                <p className="text-gray-600">
                  Strategii sustenabile pentru menținerea unei greutăți sănătoase
                </p>
              </Link>

              {/* Gout Card */}
              <Link
                href="/articles/gout"
                className="health-icon-hover group bg-white rounded-2xl p-8 shadow-lg card-hover text-center border border-gray-100"
              >
                <div className="icon-svg mb-6 mx-auto">
                  <svg 
                    className="w-20 h-20 mx-auto"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 432 432">
                    <path 
                      className="fill-purple-400 group-hover:fill-green-400 transition-colors duration-500" 
                      d="M368,280h-8v-32h20c15.2,0,28-12.8,28-28s-12.8-28-28-28H112c-17.6,0-32-14.4-32-32s14.4-32,32-32h223.2c22.4,0,40.8-18.4,40.8-40.8V8h-48v56c0,8.8-7.2,16-16,16H48c-13.6,0-24,10.4-24,24v8c0,12.8,10.4,24,24,24h3.2c1.6,0,3.2,0,4.8,0h8v24v8h-8c-17.6,0-32,14.4-32,32s14.4,32,32,32h200c17.6,0,32,14.4,32,32s-14.4,32-32,32H56c-17.6,0-32,14.4-32,32s14.4,32,24,32h160v32h-24v32h88v-32h-32v-32h128c22.4,0,40-17.6,40-40S390.4,280,368,280z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  Guta
                </h3>
                <p className="text-gray-600">
                  Controlul nivelului de acid uric prin alegeri alimentare corecte
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="space-y-20">
              {/* First Content Block */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-20"></div>
                  <Image
                    className="relative w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
                    src="/images/image1.png"
                    alt="Workshop nutrițional"
                    width={600}
                    height={400}
                  />
                </div>
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Asociația noastră promovează 
                    <span className="text-green-600"> nutriția echilibrată</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    De 10 ani, educăm copii și adulți în peste 150 de școli din România. Colaborăm cu nutriționiști
                    certificați pentru a crea programe practice de nutriție și meniuri sănătoase adaptate nevoilor comunității.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Link
                      href="/enroll" 
                      className="inline-flex items-center justify-center bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Implică-te
                      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                      Despre noi
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Content Block */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Alătură-te comunității noastre pentru 
                    <span className="text-green-600"> o viață mai sănătoasă</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Participă la cursurile noastre de gătit sănătos, challenge-urile lunare de nutriție sau ascultă podcast-ul
                    săptămânal cu specialiști în domeniu. Toate resursele sunt gratuite și accesibile online.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Link
                      href="/projects" 
                      className="inline-flex items-center justify-center bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Vezi toate activitățile
                      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="relative order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-500 rounded-2xl blur opacity-20"></div>
                  <Image
                    className="relative w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
                    src="/images/donate.png"
                    alt="Comunitate APNS"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                APNS în numere: Impactul nostru colectiv
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Împreună construim un viitor mai sănătos pentru România
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🏫
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Elevi educați prin "Sănătate în ghiozdan"</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🍎
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">300+</div>
                <div className="text-gray-700 font-medium">Rețete sănătoase în platformă</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🎪
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <div className="text-gray-700 font-medium">Workshop-uri anuale în țară</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📧
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
                <div className="text-gray-700 font-medium">Abonați la newsletter-ul lunar</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/projects" 
                className="inline-flex items-center text-lg font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Află mai multe despre impactul nostru
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteers Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Echipa noastră de voluntari
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Întâlnește oamenii dedicați care fac posibilă misiunea asociației noastre
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/* Carousel Container */}
              <div className="relative">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentVolunteerIndex * cardWidth}%)` }}
                >
                  {volunteers.map((volunteer, index) => (
                    <div key={index} className="min-w-full md:min-w-[33.333%] px-4">
                      <div className="relative bg-white rounded-2xl shadow-xl group card-hover mx-2 overflow-hidden">
                        {/* Animated Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-emerald-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Volunteer Photo */}
                        <div className="relative z-10 w-32 h-32 mx-auto mt-8 rounded-full overflow-hidden border-4 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <span className="text-4xl text-white">👤</span>
                          </div>
                        </div>

                        {/* Volunteer Info */}
                        <div className="relative z-10 px-6 py-8 text-center">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{volunteer.name}</h3>
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                              {volunteer.title}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                            {volunteer.bio}
                          </p>
                          
                          {/* Social Links */}
                          <div className="flex justify-center space-x-3">
                            {volunteer.instagram && (
                              <a href={volunteer.instagram} target="_blank" rel="noopener noreferrer"
                                 className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                            )}
                            
                            {volunteer.facebook && (
                              <a href={volunteer.facebook} target="_blank" rel="noopener noreferrer"
                                 className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
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
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 ${
                  currentVolunteerIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'
                }`}
                disabled={currentVolunteerIndex === 0}
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>

              <button 
                onClick={nextVolunteer}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 ${
                  currentVolunteerIndex >= maxVolunteerIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50'
                }`}
                disabled={currentVolunteerIndex >= maxVolunteerIndex}
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: maxVolunteerIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVolunteerIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentVolunteerIndex === index ? 'bg-green-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Obesity Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Obezitatea în România - date alarmante
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conform ultimelor studii Ministerului Sănătății (2023), situația necesită acțiune urgentă
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl transform rotate-2"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                  <div className="text-5xl font-bold text-red-600 mb-4">34%</div>
                  <div className="text-gray-700 font-medium">dintre români au exces de greutate</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transform -rotate-1"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                  <div className="text-5xl font-bold text-orange-600 mb-4">1 din 5</div>
                  <div className="text-gray-700 font-medium">copii de vârstă școlară este supraponderal</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl transform rotate-1"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center card-hover">
                  <div className="text-5xl font-bold text-yellow-600 mb-4">62%</div>
                  <div className="text-gray-700 font-medium">dintre adulți nu consumă suficiente legume</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Prevenția începe pe farfurie!
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Alătură-te programelor noastre pentru a învăța să faci alegeri alimentare informate și să construiești obiceiuri sănătoase de durată.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/enroll" 
                  className="inline-flex items-center justify-center bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                >
                  Devino voluntar
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Împărtășește povestea ta
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BMI Test Section */}
        <section className="py-20 gradient-bg relative overflow-hidden">
          <div className="floating-elements"></div>
          
          <div className="relative max-w-screen-xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cunoaște-ți riscul pentru sănătate!
            </h2>
            <p className="text-xl mb-8 text-green-100 max-w-4xl mx-auto leading-relaxed">
              Calculează-ți gratuit Indicele de Masă Corporală (IMC) și primești recomandări personalizate de la
              nutriționistul nostru, plus acces la planuri alimentare adaptate nevoilor tale.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white text-green-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🧮 Test IMC Gratuit
              </Link>
              <Link
                href="/articles/obesity"
                className="inline-flex items-center justify-center border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                📚 Prevenirea obezității
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-green-200 mb-2">✅ Evaluare gratuită</div>
                <div className="text-sm">Analiza completă IMC</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-green-200 mb-2">👨‍⚕️ Consiliere specializată</div>
                <div className="text-sm">Recomandări personalizate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-green-200 mb-2">🍽️ Plan alimentar</div>
                <div className="text-sm">Meniu adaptat obiectivelor</div>
              </div>
            </div>
          </div>
        </section>

        {/* Donations Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Susține educația nutrițională!
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Poți redirecționa 3.5% din impozitul pe venit către APNS fără costuri suplimentare.
                  Fondurile strânse susțin programele noastre în școli și crearea de resurse educaționale.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <h3 className="font-bold text-green-800">Beneficii pentru tine:</h3>
                  </div>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Nu te costă nimic extra - banii merg oricum la stat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Proces simplu de completare online</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Raport anual despre cum sunt folosiți banii</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/donation"
                  className="inline-flex items-center justify-center bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                >
                  📝 Redirecționează 3.5% impozit
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-20"></div>
                <Image
                  src="/images/donate2.png"
                  alt="Copii în clasă învățând despre nutriție"
                  width={600}
                  height={400}
                  className="relative w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}