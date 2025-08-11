import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { membersService } from '@/lib/services/membersService';
import { Member } from '@/lib/types/member';

export default function Navbar() {
  // State for mobile menu and dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [despreNoiOpen, setDespreNoiOpen] = useState(false);
  const [articoleOpen, setArticoleOpen] = useState(false);
  const [mobileDespreNoiOpen, setMobileDespreNoiOpen] = useState(false);
  const [mobileArticoleOpen, setMobileArticoleOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (despreNoiOpen) {
        setDespreNoiOpen(false);
      }
      if (articoleOpen) {
        setArticoleOpen(false);
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [despreNoiOpen, articoleOpen, isSearchOpen]);

  // Handle click outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      // Show all members when search is empty but focused
      setIsSearching(true);
      try {
        const allMembers = await membersService.getMembers();
        setSearchResults(allMembers);
        setIsSearchOpen(true);
      } catch (error) {
        console.error('Error fetching all members:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    setIsSearching(true);
    try {
      const results = await membersService.searchMembers(query.trim());
      setSearchResults(results);
      setIsSearchOpen(true);
    } catch (error) {
      console.error('Error searching members:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleSearchInputFocus = async () => {
    // Show all members when input is focused, even if empty
    if (searchQuery.trim().length === 0) {
      setIsSearching(true);
      try {
        const allMembers = await membersService.getMembers();
        setSearchResults(allMembers);
        setIsSearchOpen(true);
      } catch (error) {
        console.error('Error fetching all members:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else if (searchResults.length > 0) {
      setIsSearchOpen(true);
    }
  };

  const handleSearchResultClick = () => {
    // Clear search and close dropdown
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

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
          <div className="relative" ref={searchRef}>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              placeholder="Caută nutriționiști..."
              className="border border-gray-300 rounded-lg pl-4 pr-10 py-1 focus:outline-none
                      focus:ring-2 focus:ring-[#09a252] focus:border-transparent transition-all duration-200 w-64"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#09a252]"></div>
              ) : (
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
              )}
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.map((member) => (
                  <Link
                    key={member.id}
                    href="/team"
                    onClick={handleSearchResultClick}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {member.imageUrl && (
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-100">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="font-medium text-gray-900 truncate">{member.name}</div>
                      <div className="text-sm text-gray-500 truncate">{member.position}</div>
                    </div>
                  </Link>
                ))}
                
                {searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    Nu am găsit nutriționiști pentru "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

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
                    <div className="col-span-6 bg-gray-50 p-8">
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
                    <div className="col-span-6 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Resurse</h3>
                      <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                        {/* Featured item 1 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-12 w-12 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/enroll" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors text-base">
                              Voluntariatul APNS
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Alătură-te echipei noastre de voluntari și contribuie la promovarea nutriției sănătoase</p>
                          </div>
                        </div>

                        {/* Featured item 2 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-12 w-12 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 0 0 1.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0 0 16.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0 1 11.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 0 1 .701.292c.189.189.293.44.293.707z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/donate" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors text-base">
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
                    {/* Left section - Main articles organized in two columns */}
                    <div className="col-span-6 bg-gray-50 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Articole</h3>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        <div className="space-y-1">
                          <Link
                            href="/article/obesity"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Obezitate
                          </Link>
                          <Link
                            href="/article/diabetes"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Diabet zaharat
                          </Link>
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Boli cardiovasculare
                          </Link>
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Boli digestive
                          </Link>
                        </div>
                        <div className="space-y-1">
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Boli autoimune
                          </Link>
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Oncologie
                          </Link>
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Pediatrie
                          </Link>
                          <Link
                            href="/coming-soon"
                            className="block text-base text-gray-700 hover:text-[#09a252] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                          >
                            Sport / Fitness
                          </Link>
                        </div>
                      </div>

                      {/* Call to action button */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Link
                          href="/articole"
                          className="block w-full text-center bg-[#09a252] text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Vezi toate articolele
                        </Link>
                      </div>
                    </div>

                    {/* Right section - Featured content */}
                    <div className="col-span-6 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Resurse educaționale</h3>
                      <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                        {/* Featured item 1 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-12 w-12 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/ebooks" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors text-base">
                              eBooks
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Descarcă ghidurile noastre de nutriție în format digital</p>
                          </div>
                        </div>

                        {/* Featured item 2 */}
                        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-[#09a252] h-12 w-12 flex justify-center items-center rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <Link href="/test-imc-adulti" className="block font-bold text-gray-900 hover:text-[#09a252] transition-colors text-base">
                              Test IMC
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">Calculează-ți indicele de masă corporală cu instrumentul nostru</p>
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
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {/* Primary navigation items */}
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Acasă
            </Link>

            {/* Despre noi section */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileDespreNoiOpen(!mobileDespreNoiOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Despre noi
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${mobileDespreNoiOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileDespreNoiOpen && (
                <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/asociatie"
                    className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Asociație
                  </Link>
                  <Link
                    href="/team"
                    className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Echipa noastră
                  </Link>
                  <Link
                    href="/proiecte"
                    className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Proiecte
                  </Link>
                  <Link
                    href="/dietetician"
                    className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ce este un dietetician?
                  </Link>
                </div>
              )}
            </div>

            {/* Articole section */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileArticoleOpen(!mobileArticoleOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Articole
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${mobileArticoleOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileArticoleOpen && (
                <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {/* Medical conditions - organized in groups for better mobile UX */}
                  <div className="space-y-1">
                    <Link
                      href="/article/obesity"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Obezitate
                    </Link>
                    <Link
                      href="/article/diabetes"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Diabet zaharat
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Boli cardiovasculare
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Boli digestive
                    </Link>
                  </div>

                  <div className="space-y-1 pt-2">
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Boli autoimune
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Oncologie
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pediatrie
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sport / Fitness
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <Link
                      href="/articole"
                      className="flex items-center px-4 py-2 text-[#09a252] font-medium hover:bg-green-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Vezi toate articolele
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other main navigation items */}
            <Link
              href="/ebooks"
              className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              eBooks
            </Link>

            <Link
              href="/coming-soon"
              className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Webinarii
            </Link>

            <Link
              href="/enroll"
              className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Înscriere
            </Link>

            <Link
              href="/contact"
              className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 hover:text-[#09a252] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </Link>

            {/* Quick access tools section */}
            <div className="border-t border-gray-100 mt-4 pt-4">
              <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Instrumente utile</p>
              <Link
                href="/test-imc-adulti"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Test IMC Adulți
              </Link>
              <Link
                href="/test-imc-copii"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#09a252] rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Test IMC Copii
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}