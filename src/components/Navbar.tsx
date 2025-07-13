import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  // State for mobile menu and dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [despreNoiOpen, setDespreNoiOpen] = useState(false);
  const [articoleOpen, setArticoleOpen] = useState(false);
  const [mobileDespreNoiOpen, setMobileDespreNoiOpen] = useState(false);
  const [mobileArticoleOpen, setMobileArticoleOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 py-2 hidden md:block">
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
              className="relative" // Keep this relative for proper positioning of the dropdown
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
              {/* Dropdown menu */}
              {despreNoiOpen && (
                <div
                  className="absolute z-40 mt-0 min-w-[200px] bg-white rounded-lg shadow-xl py-2 border border-gray-100
                  left-1/2 -translate-x-1/2" // Added centering classes here
                >
                  <Link
                    href="/team"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Echipă
                  </Link>
                  <Link
                    href="#"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Proiecte
                  </Link>
                  <Link
                    href="#"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Statut
                  </Link>
                </div>
              )}
            </div>
          </li>

          {/* Articole dropdown */}
          <li className="relative group px-12">
            <div
              onMouseEnter={() => setArticoleOpen(true)}
              onMouseLeave={() => setArticoleOpen(false)}
              className="relative" // Keep this relative for proper positioning of the dropdown
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
              {/* Dropdown menu */}
              {articoleOpen && (
                <div
                  className="absolute z-40 mt-0 min-w-[200px] bg-white rounded-lg shadow-xl py-2 border border-gray-100
                  left-1/2 -translate-x-1/2" // Added centering classes here
                >
                  <Link
                    href="/article/diabetes"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Diabet
                  </Link>
                  <Link
                    href="/article/obesity"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Obezitate
                  </Link>
                  <Link
                    href="/article/gout"
                    className="px-12 block py-2 text-base text-gray-700 hover:bg-green-50 hover:text-[#09a252] transition-colors"
                  >
                    Guta
                  </Link>
                </div>
              )}
            </div>
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
              href="/webinars"
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
                  <Link href="#" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Proiecte</Link>
                  <Link href="#" className="block px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors">Statut</Link>
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