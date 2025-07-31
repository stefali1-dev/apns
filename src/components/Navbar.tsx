import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  // State for mobile menu and dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [despreNoiOpen, setDespreNoiOpen] = useState(false);
  const [articoleOpen, setArticoleOpen] = useState(false);
  const [mobileDespreNoiOpen, setMobileDespreNoiOpen] = useState(false);
  const [mobileArticoleOpen, setMobileArticoleOpen] = useState(false);

  // Close dropdowns when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (despreNoiOpen) {
        setDespreNoiOpen(false);
      }
      if (articoleOpen) {
        setArticoleOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [despreNoiOpen, articoleOpen]);

  return (
    <nav className="bg-white border-b border-gray-200">
      {/* First row: Logo + Site Name on the left, Search + Donate on the right */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo + Association Name */}
        <div className="flex items-center space-x-2 sm:space-x-3"> {/* Adjusted space-x for smaller screens */}
          <Link href="/">
            {/* Responsive image sizing: smaller on mobile, larger on larger screens */}
            <Image
              src="/images/logo.png"
              alt="Asociația pentru Promovarea Nutriției Sănătoase"
              width={48} // Base width for smaller screens
              height={48} // Base height for smaller screens
              className="w-auto h-auto sm:h-16" // Adjusted height for smaller screens, scales up on sm:
            />
          </Link>

          <Link
            href="/"
            className="text-[#09a252] font-bold text-base sm:text-lg lg:text-xl leading-tight" // Adjusted font size and line height
          >
            {/* Removed whitespace-nowrap and text-wrap for proper wrapping */}
            Asociația pentru Promovarea Nutriției Sănătoase
          </Link>
        </div>

        {/* Search + Donate */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search form */}
          <form action="#" method="GET" className="relative">
            <input
              type="search"
              name="q"
              placeholder="Caută nutriționiști..."
              className="border border-gray-300 rounded-lg pl-4 pr-10 py-1 focus:outline-none
                      focus:ring-2 focus:ring-[#09a252] focus:border-transparent transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#09a252] transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          {/* Donate button */}
          <Link
            href="/donate"
            className="text-base bg-[#09a252] text-white font-bold py-1 px-4 rounded-lg hover:bg-green-800 transition-colors duration-200"
          >
            Donează
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-[#09a252] transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Second row: Navigation links (desktop) */}
      <div className="max-w-7xl mx-auto px-4 py-2 hidden md:block relative">
        <ul className="w-full flex items-center justify-center text-gray-700 font-semibold divide-x divide-gray-200">
          <li className="px-12">
            <Link
              href="/"
              className="text-lg transition-colors duration-200 hover:text-[#09a252] hover:underline underline-offset-4"
            >
              Acasă
            </Link>
          </li>
          {/* Despre noi dropdown */}
          <li className="relative group px-12">
            <div
              onMouseEnter={() => setDespreNoiOpen(true)}
              onMouseLeave={() => setDespreNoiOpen(false)}
              className="relative"
            >
              <button
                className="text-lg transition-colors duration-200 hover:text-[#09a252] underline-offset-4 flex items-center"
              >
                Despre noi
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${despreNoiOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Invisible bridge to prevent dropdown from disappearing */}
              {despreNoiOpen && (
                <div className="absolute top-full left-0 right-0 h-4 z-40" />
              )}
            </div>

            {/* Full-width dropdown menu - always centered on screen */}
            {despreNoiOpen && (
              <div
                className="fixed left-1/2 top-31 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4"
                onMouseEnter={() => setDespreNoiOpen(true)}
                onMouseLeave={() => setDespreNoiOpen(false)}
              >
                <div className="bg-white shadow-2xl border border-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-0">
                    {/* Left section - Main menu items */}
                    <div className="col-span-4 bg-gray-50 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Despre organizația noastră</h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            href="/asociatie"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Asociație
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/team"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Echipa noastră
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/proiecte"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Proiecte
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dietetician"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Ce este un dietetician?
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Right section - Featured content */}
                    <div className="col-span-8 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Resurse importante</h3>
                      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        {/* Featured item 1 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/enroll" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              Voluntariatul APNS
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Alătură-te echipei noastre de voluntari și contribuie la promovarea nutriției sănătoase</p>
                          </div>
                        </div>

                        {/* Featured item 2 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 0 0 1.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0 0 16.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0 1 11.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 0 1 .701.292c.189.189.293.44.293.707z"/>
                            </svg>
                          </div>
                          <div>
                            <Link href="/donate" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              Susține-ne
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Donează pentru a sprijini activitățile noastre și dezvoltarea programelor educaționale</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Articole dropdown */}
          <li className="relative group px-12">
            <div
              onMouseEnter={() => setArticoleOpen(true)}
              onMouseLeave={() => setArticoleOpen(false)}
              className="relative"
            >
              <button
                className="text-lg transition-colors duration-200 hover:text-[#09a252] underline-offset-4 flex items-center"
              >
                Articole
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${articoleOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Invisible bridge to prevent dropdown from disappearing */}
              {articoleOpen && (
                <div className="absolute top-full left-0 right-0 h-4 z-40" />
              )}
            </div>

            {/* Full-width dropdown menu - always centered on screen */}
            {articoleOpen && (
              <div
                className="fixed left-1/2 top-31 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4"
                onMouseEnter={() => setArticoleOpen(true)}
                onMouseLeave={() => setArticoleOpen(false)}
              >
                <div className="bg-white shadow-2xl border border-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-0">
                    {/* Left section - Main articles */}
                    <div className="col-span-4 bg-gray-50 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Articole</h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            href="/article/diabetes"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Diabet
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/article/obesity"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Obezitate
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/article/gout"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Guta
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Toate articolele
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Right section - Featured content */}
                    <div className="col-span-8 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Resurse educaționale</h3>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Featured item 1 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/ebooks" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              eBooks
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Descarcă ghidurile noastre de nutriție în format digital</p>
                          </div>
                        </div>

                        {/* Featured item 2 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/coming-soon" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              Webinarii live
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Participă la sesiunile noastre educaționale interactive</p>
                          </div>
                        </div>

                        {/* Featured item 3 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/test-imc-adulti" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              Test IMC
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Calculează-ți indicele de masă corporală cu instrumentul nostru</p>
                          </div>
                        </div>

                        {/* Featured item 4 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-16 w-16 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/contact" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors">
                              Întrebări frecvente
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Răspunsuri la cele mai comune întrebări despre nutriție</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Regular menu items */}
          <li className="px-12">
            <Link
              href="/ebooks"
              className="text-lg transition-colors duration-200 hover:text-[#09a252] hover:underline underline-offset-4"
            >
              eBooks
            </Link>
          </li>
          <li className="px-12">
            <Link
              href="/coming-soon"
              className="text-lg transition-colors duration-200 hover:text-[#09a252] hover:underline underline-offset-4"
            >
              Webinarii
            </Link>
          </li>
          <li className="px-12">
            <Link
              href="/enroll"
              className="text-lg transition-colors duration-200 hover:text-[#09a252] hover:underline underline-offset-4"
            >
              Înscriere
            </Link>
          </li>
          <li className="px-12">
            <Link
              href="/contact"
              className="text-lg transition-colors duration-200 hover:text-[#09a252] hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile search and donate */}
            <div className="p-2 space-y-3">
              <form action="#" method="GET" className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Search"
                  className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none
                         focus:ring-2 focus:ring-[#09a252] focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#09a252]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>

              <Link
                href="/donate"
                className="block w-full text-center bg-[#09a252] text-white font-bold py-2 px-4 rounded-full hover:bg-green-800 transition-colors"
              >
                Donează
              </Link>
            </div>

            {/* Mobile navigation menu */}
            {/* Despre noi dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileDespreNoiOpen(!mobileDespreNoiOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-semibold">Despre noi</span>
                <svg
                  className={`w-4 h-4 transition-transform ${mobileDespreNoiOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDespreNoiOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/team" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Voluntari</Link>
                  <Link href="/proiecte" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Proiecte</Link>
                  <Link href="/coming-soon" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Statut</Link>
                </div>
              )}
            </div>

            {/* Articole dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileArticoleOpen(!mobileArticoleOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-semibold">Articole</span>
                <svg
                  className={`w-4 h-4 transition-transform ${mobileArticoleOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileArticoleOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/article/diabetes" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Diabet</Link>
                  <Link href="/article/obesity" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Obezitate</Link>
                  <Link href="/article/gout" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Guta</Link>
                </div>
              )}
            </div>

            {/* Other menu items */}
            <Link href="/ebooks" className="block px-3 py-2 text-gray-700 font-semibold hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors">
              eBooks
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-700 font-semibold hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors">
              Blog
            </Link>
            <Link href="/enroll" className="block px-3 py-2 text-gray-700 font-semibold hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors">
              Înscriere
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 font-semibold hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}