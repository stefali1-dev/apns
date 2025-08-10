import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/layouts/NavbarLayout';
import { authService } from '@/lib/services/authService';

const AdminLoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { session } = await authService.getSession();
                if (session) {
                    // User is already logged in, redirect to admin dashboard
                    router.push('/admin');
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const { user, error } = await authService.signIn({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setSubmitError(error);
                return;
            }

            if (user) {
                // Successful login, redirect to admin dashboard
                router.push('/admin');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setSubmitError('A apărut o eroare la autentificare. Vă rugăm să încercați din nou.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <Layout>
                <div className="bg-green-50 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09a252] mx-auto mb-4"></div>
                        <p className="text-gray-600">Se verifică autentificarea...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Login - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Panou de administrare APNS - Autentificare pentru administratori" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-green-50 min-h-screen flex items-center justify-center">
                {/* Main content */}
                <div className="w-full max-w-md mx-auto px-4">
                    {/* Login form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#09a252] mb-2">Autentificare Admin</h2>
                                <p className="text-gray-600">Introduceți datele de acces pentru a continua</p>
                            </div>

                            {submitError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                                    <strong className="font-bold">Eroare!</strong>
                                    <span className="block sm:inline"> {submitError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-200"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-green-800 mb-1">
                                        Parolă
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-200"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#09a252] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Se autentifică...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                                </svg>
                                                Autentificare
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">
                                    Doar administratorii autorizați pot accesa acest panou
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default AdminLoginPage;
