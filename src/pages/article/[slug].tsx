import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ArticleLayout from '@/layouts/ArticleLayout';
import { articleService } from '@/lib/services/articleService';
import { Article } from '@/lib/types/article';

export default function ArticlePage() {
    const router = useRouter();
    const { slug } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug || typeof slug !== 'string') return;
            
            try {
                setIsLoading(true);
                const articleData = await articleService.getArticleBySlug(slug);
                if (articleData) {
                    setArticle(articleData);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Eroare la încărcarea articolului:', error);
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <ArticleLayout>
                <Head>
                    <title>Se încarcă... - APNS</title>
                </Head>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="h-64 bg-gray-200 rounded mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </ArticleLayout>
        );
    }

    // Not found state
    if (notFound || !article) {
        return (
            <ArticleLayout>
                <Head>
                    <title>Articol nu a fost găsit - APNS</title>
                </Head>
                <div className="text-center py-16">
                    <div className="mb-8">
                        <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Articolul nu a fost găsit</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Ne pare rău, dar articolul pe care îl căutați nu există sau a fost mutat.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/articole"
                                className="bg-[#09a252] text-white hover:bg-green-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Vezi toate articolele
                            </Link>
                            <Link 
                                href="/"
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Înapoi acasă
                            </Link>
                        </div>
                    </div>
                </div>
            </ArticleLayout>
        );
    }

    return (
        <ArticleLayout>
            <Head>
                <title>{article.title} | APNS - Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content={article.excerpt || article.title} />
                <meta name="keywords" content={`${article.category}, nutriție, sănătate, APNS, ${article.author}`} />
                <meta name="author" content={article.author} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt || article.title} />
                <meta property="og:image" content={article.imageUrl} />
                <meta property="og:type" content="article" />
                <meta property="article:author" content={article.author} />
                <meta property="article:published_time" content={article.publishDate} />
                <meta property="article:section" content={article.category} />
                <link rel="canonical" href={`/article/${article.slug}`} />
            </Head>

            <div className="">
                {/* Back to articles link */}
                <div className="mb-6">
                    <Link 
                        href="/articole"
                        className="inline-flex items-center text-[#09a252] hover:text-green-700 font-medium transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Înapoi la articole
                    </Link>
                </div>

                <header className="article-header">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
                    
                    {/* Article meta */}
                    <div className="article-meta flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-4">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(article.publishDate)}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {article.author}
                        </span>
                    </div>

                    {/* Featured image */}
                    <div className="article-featured-image mb-8">
                        <Image 
                            src={article.imageUrl} 
                            width={800} 
                            height={400} 
                            alt={article.title} 
                            className="w-full rounded-lg shadow-md" 
                        />
                        {article.excerpt && (
                            <p className="text-sm text-gray-600 mt-2 italic">{article.excerpt}</p>
                        )}
                    </div>
                </header>

                {/* Article content */}
                <div className="article-content">
                    <div 
                        className="prose prose-lg max-w-none prose-green"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    
                    <style jsx global>{`
                        .prose-green h1 {
                            color: #065f46;
                            font-size: 2rem;
                            font-weight: 700;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                            line-height: 1.2;
                        }
                        .prose-green h2 {
                            color: #065f46;
                            font-size: 1.75rem;
                            font-weight: 700;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                            line-height: 1.3;
                        }
                        .prose-green h3 {
                            color: #09a252;
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin-top: 1.5rem;
                            margin-bottom: 0.75rem;
                            line-height: 1.4;
                        }
                        .prose-green h4 {
                            color: #09a252;
                            font-size: 1.25rem;
                            font-weight: 600;
                            margin-top: 1.25rem;
                            margin-bottom: 0.5rem;
                            line-height: 1.4;
                        }
                        .prose-green p {
                            color: #374151;
                            margin-bottom: 1rem;
                            line-height: 1.7;
                        }
                        .prose-green ul {
                            list-style-type: disc;
                            margin-left: 1.5rem;
                            margin-bottom: 1rem;
                            padding-left: 0;
                        }
                        .prose-green ol {
                            list-style-type: decimal;
                            margin-left: 1.5rem;
                            margin-bottom: 1rem;
                            padding-left: 0;
                        }
                        .prose-green li {
                            color: #4b5563;
                            margin-bottom: 0.5rem;
                            line-height: 1.6;
                        }
                        .prose-green strong {
                            color: #09a252;
                            font-weight: 600;
                        }
                        .prose-green em {
                            font-style: italic;
                            color: #4b5563;
                        }
                        .prose-green a {
                            color: #09a252;
                            text-decoration: underline;
                        }
                        .prose-green a:hover {
                            color: #047857;
                        }
                    `}</style>
                </div>
            </div>
        </ArticleLayout>
    );
}
