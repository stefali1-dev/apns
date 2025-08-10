import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';
import { articleService } from '@/lib/services/articleService';
import { Article } from '@/lib/types/article';

const ArticolePage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                const [articlesData, categoriesData] = await Promise.all([
                    articleService.getArticles(),
                    articleService.getCategories()
                ]);
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Eroare la încărcarea articolelor:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const filterArticles = async () => {
            if (searchQuery.trim() || selectedCategory) {
                setIsSearching(true);
                try {
                    let filteredArticles: Article[];
                    
                    if (searchQuery.trim()) {
                        filteredArticles = await articleService.searchArticles(searchQuery);
                        if (selectedCategory) {
                            filteredArticles = filteredArticles.filter(
                                article => article.category === selectedCategory
                            );
                        }
                    } else if (selectedCategory) {
                        filteredArticles = await articleService.getArticlesByCategory(selectedCategory);
                    } else {
                        filteredArticles = await articleService.getArticles();
                    }
                    
                    setArticles(filteredArticles);
                } catch (error) {
                    console.error('Eroare la filtrarea articolelor:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                // If no filters, load all articles
                try {
                    setIsSearching(true);
                    const allArticles = await articleService.getArticles();
                    setArticles(allArticles);
                } catch (error) {
                    console.error('Eroare la încărcarea articolelor:', error);
                } finally {
                    setIsSearching(false);
                }
            }
        };

        filterArticles();
    }, [searchQuery, selectedCategory]);

    const getArticleHref = (article: Article): string => {
        return `/article/${article.slug}`;
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
    };

    const hasActiveFilters = searchQuery.trim() || selectedCategory;

    return (
        <Layout>
            <Head>
                <title>Articole - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Citește articolele noastre de specialitate despre nutriție, sănătate și stil de viață sănătos. Informații și sfaturi de la experții APNS." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Articole
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Informații și sfaturi de la experții noștri despre nutriție, sănătate și stil de viață sănătos
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transition section */}
                <div className="bg-green-50 py-6">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center space-x-4">
                                <span className="h-px w-12 bg-green-300"></span>
                                <span className="text-[#09a252] font-medium">Cunoștințe bazate pe dovezi științifice</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Articles grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {(isLoading || isSearching) ? (
                                // Display skeleton cards while loading
                                Array.from({ length: 6 }, (_, index) => (
                                    <ArticleCardSkeleton key={`skeleton-${index}`} />
                                ))
                            ) : articles.length > 0 ? (
                                articles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        href={getArticleHref(article)}
                                    />
                                ))
                            ) : (
                                // No articles found message
                                <div className="col-span-full text-center py-12">
                                    <div className="bg-white rounded-lg shadow-lg p-8">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Nu au fost găsite articole</h3>
                                        <p className="text-gray-600 mb-4">
                                            Încearcă să modifici termenii de căutare sau să ștergi filtrele active.
                                        </p>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={handleClearFilters}
                                                className="bg-[#09a252] text-white hover:bg-green-700 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                                            >
                                                Șterge filtrele
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Call to action */}
                        {!isLoading && articles.length > 0 && (
                            <div className="bg-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
                                <h2 className="text-3xl font-bold mb-4">Vrei să afli mai multe despre nutriție?</h2>
                                <p className="text-lg mb-6 max-w-2xl mx-auto text-green-100">
                                    Înscrie-te la newsletter-ul nostru pentru a primi cele mai recente articole și sfaturi 
                                    despre nutriție și sănătate direct în inbox-ul tău.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a 
                                        href="/enroll" 
                                        className="bg-white text-[#09a252] hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                    >
                                        Înscrie-te ca voluntar
                                    </a>
                                    <a 
                                        href="/contact" 
                                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#09a252] font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                    >
                                        Contactează-ne
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ArticolePage;
