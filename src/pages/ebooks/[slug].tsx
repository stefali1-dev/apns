import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { EBook, ebookService } from '@/lib/services/ebookService';
import Layout from '@/layouts/NavbarLayout';

interface EBookDetailProps {
  ebook: EBook | null;
  relatedEbooks: EBook[];
}

export default function EBookDetail({ ebook, relatedEbooks }: EBookDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'description' | 'authors' | 'toc'>('description');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle modal close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">E-book nu a fost găsit</h1>
          <Link href="/ebooks" className="text-green-600 hover:text-green-700">
            Înapoi la lista de e-books
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await ebookService.sendEBookDownload(ebook.slug, email);
      
      if (result.success) {
        setSuccess(true);
        setEmail('');
      } else {
        alert(result.error || 'A apărut o eroare');
      }
    } catch (error) {
      alert('A apărut o eroare');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
    setEmail('');
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(ebook.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      email: `mailto:?subject=${title}&body=Recomand acest e-book: ${url}`,
      instagram: `https://www.instagram.com/` // Instagram nu suportă share direct
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Layout>
      <Head>
        <title>{ebook.title} | APNS - Asociația pentru Promovarea Nutriției Sănătoase</title>
        <meta name="description" content={ebook.shortDescription} />
        <meta name="keywords" content={`${ebook.title}, ${ebook.category.name}, e-book nutriție, APNS`} />
        <meta property="og:title" content={ebook.title} />
        <meta property="og:description" content={ebook.shortDescription} />
        <meta property="og:image" content={ebook.coverImage} />
        <meta property="og:type" content="book" />
        <link rel="canonical" href={`/ebooks/${ebook.slug}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Banner Section */}
        <div className="bg-green-50 py-8 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center mb-4 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors">
                Acasă
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/ebooks" className="text-gray-600 hover:text-green-700 transition-colors">
                E-Books
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-800 font-medium">{ebook.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">
              {ebook.title}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cover Image and Quick Details */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-6">
                {/* Cover Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                  {ebook.coverImage ? (
                    <Image 
                      src={ebook.coverImage} 
                      alt={ebook.title} 
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-24 w-24 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  
                  {ebook.isFree ? (
                    <span className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                      Gratuit
                    </span>
                  ) : (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                      {ebook.price} Lei
                    </span>
                  )}
                </div>
                
                {/* Quick Details */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                        {ebook.category.name}
                      </span>
                      <span className="text-gray-500 text-sm font-medium">
                        {ebook.format.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{ebook.pageCount} pagini</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Publicat: {formatDate(ebook.publishedDate)}</span>
                      </div>
                      
                      <div className="flex items-start gap-3 text-gray-600">
                        <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>
                          Autor{ebook.authors.length > 1 ? 'i' : ''}:{' '}
                          {ebook.authors.map((author, index) => (
                            <span key={author.id}>
                              {author.name}
                              {index < ebook.authors.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  {ebook.isFree ? (
                    <button 
                      onClick={() => setShowModal(true)}
                      className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 mb-4"
                    >
                      Descarcă Gratuit
                    </button>
                  ) : (
                    <button 
                      className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 mb-4"
                    >
                      Adaugă în Coș - {ebook.price} Lei
                    </button>
                  )}
                  
                  {/* Share */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-gray-700 font-semibold mb-3">Distribuie:</h3>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
                        aria-label="Share on Facebook"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="text-gray-600 hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 rounded-full"
                        aria-label="Share on Twitter"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare('email')}
                        className="text-gray-600 hover:text-green-600 transition-colors p-2 hover:bg-green-50 rounded-full"
                        aria-label="Share via Email"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare('instagram')}
                        className="text-gray-600 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full"
                        aria-label="Share on Instagram"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Full Description and Details */}
            <div className="w-full lg:w-2/3">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex flex-wrap -mb-px">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`mr-8 py-4 border-b-2 font-semibold transition-colors ${
                      activeTab === 'description'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Descriere
                  </button>
                  <button 
                    onClick={() => setActiveTab('authors')}
                    className={`mr-8 py-4 border-b-2 font-semibold transition-colors ${
                      activeTab === 'authors'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Despre autor{ebook.authors.length > 1 ? 'i' : ''}
                  </button>
                  <button 
                    onClick={() => setActiveTab('toc')}
                    className={`py-4 border-b-2 font-semibold transition-colors ${
                      activeTab === 'toc'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Cuprins
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Despre acest e-book</h2>
                    <div 
                      className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: ebook.fullDescription }}
                    />
                  </div>
                )}
                
                {/* Authors Tab */}
                {activeTab === 'authors' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Despre autor{ebook.authors.length > 1 ? 'i' : ''}
                    </h2>
                    
                    {ebook.authors.map((author, index) => (
                      <div 
                        key={author.id} 
                        className={`flex flex-col md:flex-row items-start gap-6 ${
                          index < ebook.authors.length - 1 ? 'mb-12 pb-12 border-b border-gray-200' : ''
                        }`}
                      >
                        <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-green-100 to-green-200 rounded-full overflow-hidden">
                          {author.profileImage ? (
                            <Image 
                              src={author.profileImage} 
                              alt={author.name} 
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{author.name}</h3>
                          <p className="text-sm uppercase tracking-wider font-semibold text-green-700 mb-3">
                            {author.title}
                          </p>
                          <div 
                            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: author.bio }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Table of Contents Tab */}
                {activeTab === 'toc' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Cuprins</h2>
                    <div 
                      className="prose prose-lg prose-green max-w-none"
                      dangerouslySetInnerHTML={{ __html: ebook.toc }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Related E-books Section */}
          {relatedEbooks.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-green-800 mb-8">Alte e-books care ți-ar putea plăcea</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedEbooks.map((relatedEbook) => (
                  <div key={relatedEbook.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <Link href={`/ebooks/${relatedEbook.slug}`}>
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                        {relatedEbook.coverImage ? (
                          <Image 
                            src={relatedEbook.coverImage} 
                            alt={relatedEbook.title} 
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                        
                        {relatedEbook.isFree ? (
                          <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                            Gratuit
                          </span>
                        ) : (
                          <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                            {relatedEbook.price} Lei
                          </span>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-green-600 transition-colors line-clamp-2">
                          {relatedEbook.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {relatedEbook.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ai nevoie de asistență personalizată?
            </h2>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
              Suntem disponibili pentru a te ajuta să găsești cele mai bune resurse pentru nevoile tale.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-green-700 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              Contactează-ne
            </Link>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={handleCloseModal} />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative transform transition-all">
                {/* Close Button */}
                <button 
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center">
                  {/* Success State */}
                  {success ? (
                    <div>
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Mulțumim!</h3>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        E-book-ul a fost trimis la adresa ta de email.<br />
                        Verifică și folderul <span className="font-semibold">Spam</span>.
                      </p>
                      <button 
                        onClick={handleCloseModal}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        Închide
                      </button>
                    </div>
                  ) : (
                    /* Form State */
                    <div>
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Obține E-book Gratuit</h3>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        Introdu adresa ta de email pentru a primi link-ul de descărcare.<br />
                        Vei primi și resurse exclusive despre nutriție sănătoasă.
                      </p>
                      
                      <form onSubmit={handleDownload} className="space-y-6">
                        <div>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="adresa.ta@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            disabled={loading}
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-semibold disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Se trimite...
                            </>
                          ) : (
                            'Trimite E-book'
                          )}
                        </button>
                        
                        <p className="text-xs text-gray-500">
                          Prin înscriere confirm că am citit și sunt de acord cu{' '}
                          <Link href="/privacy" className="text-green-600 hover:underline">
                            Politica de Confidențialitate
                          </Link>
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const ebooks = await ebookService.getAllEBooks();
    const paths = ebooks.map((ebook) => ({
      params: { slug: ebook.slug },
    }));

    return {
      paths,
      fallback: true, // Enable ISR for new ebooks
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<EBookDetailProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const ebook = await ebookService.getEBookBySlug(slug);
    
    if (!ebook) {
      return {
        notFound: true,
      };
    }

    const relatedEbooks = await ebookService.getRelatedEBooks(ebook.id, 4);

    return {
      props: {
        ebook,
        relatedEbooks,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};