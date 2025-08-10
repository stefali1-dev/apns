import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/layouts/NavbarLayout';
import { authService, AuthUser } from '@/lib/services/authService';

const AdminDashboard: React.FC = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { session, user } = await authService.getSession();
                
                if (!session || !user) {
                    // No session, redirect to login
                    router.push('/admin/login');
                    return;
                }

                setUser(user);
            } catch (error) {
                console.error('Error checking auth:', error);
                router.push('/admin/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange((user) => {
            if (!user) {
                router.push('/admin/login');
            } else {
                setUser(user);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            const { error } = await authService.signOut();
            if (error) {
                console.error('Logout error:', error);
            }
            router.push('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="bg-green-50 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09a252] mx-auto mb-4"></div>
                        <p className="text-gray-600">Se încarcă panoul de administrare...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    return (
        <>
            <Head>
                <title>Admin Dashboard - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Panou de administrare APNS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">
                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="flex justify-between items-center text-white">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    Panou de Administrare
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl leading-relaxed">
                                    Bine ai venit!
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-[#09a252] hover:bg-green-100 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                Deconectare
                            </button>
                        </div>
                    </div>
                </section>

                {/* Transition section */}
                <div className="bg-green-50 py-6">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center space-x-4">
                                <span className="h-px w-12 bg-green-300"></span>
                                <span className="text-[#09a252] font-medium">Gestionează conținutul site-ului appns.ro</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Admin Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Articles Management */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Articole</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Gestionează articolele și conținutul educațional</p>
                                <button 
                                    onClick={() => router.push('/admin/articles')}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto"
                                >
                                    Gestionează Articole
                                </button>
                            </div>

                            {/* Members Management */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Membri Echipă</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Adaugă și editează membrii echipei APNS</p>
                                <button className="w-full bg-[#09a252] text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 mt-auto">
                                    Gestionează Membri
                                </button>
                            </div>

                            {/* EBooks Management */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">E-Books</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Adaugă și gestionează cărțile electronice</p>
                                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 mt-auto">
                                    Gestionează E-Books
                                </button>
                            </div>

                            {/* Subscriptions Management */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Abonați Newsletter</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Vizualizează și gestionează abonații la newsletter</p>
                                <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300 mt-auto">
                                    Gestionează Abonați
                                </button>
                            </div>

                            {/* File Storage */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Fișiere</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Gestionează imaginile și fișierele PDF</p>
                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mt-auto">
                                    Gestionează Fișiere
                                </button>
                            </div>

                            {/* Settings */}
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <div className="bg-gray-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Setări</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Configurează setările site-ului și contului</p>
                                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 mt-auto">
                                    Accesează Setări
                                </button>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-4">Informații Cont</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                                    <p className="text-gray-800">{user.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ultima autentificare</h3>
                                    <p className="text-gray-800">{new Date(user.last_sign_in_at).toLocaleString('ro-RO')}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Cont creat</h3>
                                    <p className="text-gray-800">{new Date(user.created_at).toLocaleString('ro-RO')}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Activ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
