import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/layouts/NavbarLayout';
import { ebookService } from '@/lib/services/ebookService';
import { subscribeUser } from '@/lib/services/subscriptionService';
import { EBook } from '@/lib/types/ebook';

interface FilterState {
  search: string;
  priceTypes: ('free' | 'paid')[];
  sort: 'newest' | 'title_asc' | 'title_desc' | 'price_asc' | 'price_desc';
}

const ITEMS_PER_PAGE = 6;

export default function EBooksPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [emailSubscription, setEmailSubscription] = useState('');
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceTypes: [],
    sort: 'newest'
  });

  // Load ebooks from service
  useEffect(() => {
    const loadEbooks = async () => {
      try {
        setLoading(true);
        const data = await ebookService.getEBooks();
        setEbooks(data);
      } catch (error) {
        console.error('Error loading ebooks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEbooks();
  }, []);

  // Sincronizarea cu URL query parameters
  useEffect(() => {
    const { query } = router;

    setFilters({
      search: (query.search as string) || '',
      priceTypes: query.price ?
        (Array.isArray(query.price) ? query.price as ('free' | 'paid')[] : [query.price as ('free' | 'paid')]) :
        [],
      sort: (query.sort as FilterState['sort']) || 'newest'
    });

    setCurrentPage(Number(query.page) || 1);
  }, [router.query]);

  // Actualizarea URL-ului când se schimbă filtrele
  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setCurrentPage(1);

    const queryParams: any = {};
    if (updatedFilters.search) queryParams.search = updatedFilters.search;
    if (updatedFilters.priceTypes.length > 0) queryParams.price = updatedFilters.priceTypes;
    if (updatedFilters.sort !== 'newest') queryParams.sort = updatedFilters.sort;

    router.push({
      pathname: router.pathname,
      query: queryParams
    }, undefined, { shallow: true });
  };

  // Filtrarea și paginarea e-book-urilor
  const filteredAndPaginatedEBooks = useMemo(() => {
    let filtered = ebooks.filter((ebook: EBook) => {
      // Filtrare după search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!ebook.title.toLowerCase().includes(searchLower) &&
          !ebook.shortDescription.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Filtrare după tip preț
      if (filters.priceTypes.length > 0) {
        const isFreeSelected = filters.priceTypes.includes('free');
        const isPaidSelected = filters.priceTypes.includes('paid');
        if (isFreeSelected && !ebook.isFree) return false;
        if (isPaidSelected && ebook.isFree) return false;
        if (!isFreeSelected && !isPaidSelected) return false;
      }

      return true;
    });
    
    // Sortare
    filtered.sort((a: EBook, b: EBook) => {
      switch (filters.sort) {
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'price_asc':
          const priceA = a.isFree ? 0 : a.price || 0;
          const priceB = b.isFree ? 0 : b.price || 0;
          return priceA - priceB;
        case 'price_desc':
          const priceA2 = a.isFree ? 0 : a.price || 0;
          const priceB2 = b.isFree ? 0 : b.price || 0;
          return priceB2 - priceA2;
        case 'newest':
        default:
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
    });

    return filtered;
  }, [ebooks, filters]);

  // Paginare
  const totalPages = Math.ceil(filteredAndPaginatedEBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEbooks = filteredAndPaginatedEBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const query = { ...router.query, page: page.toString() };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      priceTypes: [],
      sort: 'newest'
    });
    setCurrentPage(1);
    router.push(router.pathname, undefined, { shallow: true });
  };

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubscription.trim()) return;

    setSubscriptionLoading(true);
    setSubscriptionMessage(null);

    try {
      const result = await subscribeUser(emailSubscription);
      if (result.success) {
        setSubscriptionMessage({ type: 'success', text: 'Te-ai abonat cu succes la newsletter!' });
        setEmailSubscription('');
      } else {
        setSubscriptionMessage({ type: 'error', text: result.message || 'A apărut o eroare la abonare.' });
      }
    } catch (error) {
      setSubscriptionMessage({ type: 'error', text: 'A apărut o eroare neașteptată.' });
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Layout>
      <Head>
        <title>E-Books & Resurse | APNS - Asociația pentru Promovarea Nutriției Sănătoase</title>
        <meta name="description" content="Descarcă e-books gratuite și premium despre nutriție, alimentație sănătoasă și prevenirea bolilor. Ghiduri de specialitate de la experți în nutriție." />
        <meta name="keywords" content="e-books nutriție, ghiduri alimentație, cărți digitale sănătate, resurse nutriție, APNS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/ebooks" />
      </Head>

      <div className="min-h-screen bg-green-50">
        {/* Hero Section */}
        <div className="relative bg-[#09a252] text-white overflow-hidden">
          <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">E-Books & Resurse</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Informații și ghiduri de la experți pentru a vă ajuta să gestionați alimentația și să trăiți o viață mai sănătoasă.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Filters */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6 text-[#09a252]">Filtre</h2>

                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                    Caută
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      value={filters.search}
                      onChange={(e) => updateFilters({ search: e.target.value })}
                      placeholder="Caută e-books..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#09a252] focus:border-[#09a252] transition-all"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Preț</h3>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceTypes.includes('free')}
                        onChange={(e) => {
                          const newPriceTypes = e.target.checked
                            ? [...filters.priceTypes, 'free' as const]
                            : filters.priceTypes.filter(type => type !== 'free');
                          updateFilters({ priceTypes: newPriceTypes });
                        }}
                        className="h-4 w-4 text-[#09a252] focus:ring-[#09a252] border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 hover:text-[#09a252] transition-colors">Gratuit</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceTypes.includes('paid')}
                        onChange={(e) => {
                          const newPriceTypes = e.target.checked
                            ? [...filters.priceTypes, 'paid' as const]
                            : filters.priceTypes.filter(type => type !== 'paid');
                          updateFilters({ priceTypes: newPriceTypes });
                        }}
                        className="h-4 w-4 text-[#09a252] focus:ring-[#09a252] border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 hover:text-[#09a252] transition-colors">Cu plată</span>
                    </label>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleClearFilters}
                    className="w-full text-center text-gray-600 hover:text-[#09a252] text-sm font-medium transition-colors"
                  >
                    Șterge toate filtrele
                  </button>
                </div>
              </div>
            </div>

            {/* E-Books Content */}
            <div className="w-full lg:w-3/4">
              {/* Results Summary and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <p className="text-gray-600">
                    Se afișează <span className="font-semibold">{startIndex + 1}</span> până la{' '}
                    <span className="font-semibold">{Math.min(endIndex, filteredAndPaginatedEBooks.length)}</span> din{' '}
                    <span className="font-semibold">{filteredAndPaginatedEBooks.length}</span> e-books
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
                    Sortează după:
                  </label>
                  <select
                    id="sort"
                    value={filters.sort}
                    onChange={(e) => updateFilters({ sort: e.target.value as FilterState['sort'] })}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#09a252] focus:border-[#09a252] transition-all"
                  >
                    <option value="newest">Cele mai noi</option>
                    <option value="title_asc">Titlu: A-Z</option>
                    <option value="title_desc">Titlu: Z-A</option>
                    <option value="price_asc">Preț: Crescător</option>
                    <option value="price_desc">Preț: Descrescător</option>
                  </select>
                </div>
              </div>

              {/* E-Books Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                      <div className="aspect-[4/3] bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentEbooks.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentEbooks.map((ebook: EBook) => (
                      <div key={ebook.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <Link href={`/ebooks/${ebook.slug}`}>
                          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                            {ebook.imageUrl ? (
                              <Image
                                src={ebook.imageUrl}
                                alt={ebook.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="h-20 w-20 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                            )}

                            {ebook.isFree ? (
                              <span className="absolute top-3 right-3 bg-[#09a252] text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                                Gratuit
                              </span>
                            ) : (
                              <span className="absolute top-3 right-3 bg-[#09a252] text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                                {ebook.price} Lei
                              </span>
                            )}
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              {ebook.category.trim() !== '' && (
                                <span className="inline-block bg-green-100 text-[#09a252] text-xs px-3 py-1 rounded-full font-medium">
                                  {ebook.category}
                                </span>
                              )}
                              <span className="text-gray-500 text-xs font-medium">
                                PDF
                              </span>
                            </div>

                            <h3 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#09a252] transition-colors line-clamp-2">
                              {ebook.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                              {ebook.shortDescription}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{ebook.pageCount} pagini</span>
                              <span>{formatDate(ebook.publishedDate)}</span>
                            </div>
                          </div>
                        </Link>

                        <div className="px-6 pb-6">
                          <Link
                            href={`/ebooks/${ebook.slug}`}
                            className="block w-full bg-[#09a252] text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                          >
                            {ebook.isFree ? 'Descarcă Acum' : 'Vezi Detalii'}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 rounded-lg ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-[#09a252] border border-gray-300'
                            } transition-colors`}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                          .map((page, index, array) => (
                            <div key={page} className="flex items-center">
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 text-gray-400">...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg font-medium ${currentPage === page
                                  ? 'bg-[#09a252] text-white'
                                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-[#09a252] border border-gray-300'
                                  } transition-colors`}
                              >
                                {page}
                              </button>
                            </div>
                          ))}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 rounded-lg ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-[#09a252] border border-gray-300'
                            } transition-colors`}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                /* No Results */
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nu s-au găsit e-books</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Încercați să ajustați criteriile de căutare sau filtrare pentru a găsi ceea ce căutați.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-6 py-3 rounded-lg shadow-sm text-sm font-semibold text-white bg-[#09a252] hover:bg-green-700 transition-colors"
                  >
                    Șterge filtrele
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-[#09a252] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Abonează-te la Newsletter
            </h2>
            <p className="text-white mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Fii la curent cu cele mai noi e-books, resurse și sfaturi nutriționale direct în inbox-ul tău.
            </p>

            <form
              onSubmit={handleSubscription}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              autoComplete="off"
            >
              <input
                type="email"
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
                placeholder="Adresa ta de email"
                className="px-6 py-3 border border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white flex-grow transition-all placeholder-green-900 bg-white text-black font-medium"
                required
                disabled={subscriptionLoading}
                aria-label="Adresa ta de email"
              />
              <button
                type="submit"
                disabled={subscriptionLoading}
                className="bg-white text-[#09a252] px-8 py-3 rounded-lg hover:bg-green-100 hover:shadow-lg font-semibold whitespace-nowrap transition-all duration-300 border border-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscriptionLoading ? 'Se procesează...' : 'Abonează-te'}
              </button>
            </form>

            {subscriptionMessage && (
              <div className={`mt-4 p-3 rounded-lg max-w-md mx-auto ${
                subscriptionMessage.type === 'success' 
                  ? 'bg-white/20 text-white border border-white/30' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {subscriptionMessage.text}
              </div>
            )}

            <p className="text-sm text-green-100 mt-4">
              Ne respectăm abonații. Dezabonează-te oricând cu un singur click.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}