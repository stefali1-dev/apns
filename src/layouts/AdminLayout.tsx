import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/lib/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = 'APNS Admin',
  description = 'Panou de administrare APNS',
}) => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <>
        <Head>
          <title>{title} - APNS Admin</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="bg-green-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09a252] mx-auto mb-4"></div>
            <p className="text-gray-600">Se încarcă panoul de administrare...</p>
          </div>
        </div>
      </>
    );
  }

  // Don't render anything if not authenticated (redirect is handled by useAuth)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title} - APNS Admin</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-green-50 min-h-screen">
        {/* Header */}
        <header className="bg-[#09a252] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo and Navigation */}
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => navigateTo('/admin')}
                  className="text-white text-xl font-bold hover:text-green-200 transition-colors"
                >
                  APNS Admin
                </button>

                <nav className="hidden md:flex space-x-6">
                  <button
                    onClick={() => navigateTo('/admin/articles')}
                    className={`text-white hover:text-green-200 transition-colors ${router.pathname.startsWith('/admin/articles') ? 'text-green-200 font-medium' : ''
                      }`}
                  >
                    Articole
                  </button>
                  <button
                    onClick={() => navigateTo('/admin/members')}
                    className={`text-white hover:text-green-200 transition-colors ${router.pathname.startsWith('/admin/members') ? 'text-green-200 font-medium' : ''
                      }`}
                  >
                    Membri
                  </button>
                  <button
                    onClick={() => navigateTo('/admin/ebooks')}
                    className={`text-white hover:text-green-200 transition-colors ${router.pathname.startsWith('/admin/ebooks') ? 'text-green-200 font-medium' : ''
                      }`}
                  >
                    E-Books
                  </button>
                  <button
                    onClick={() => navigateTo('/admin/authors')}
                    className={`text-white hover:text-green-200 transition-colors ${router.pathname.startsWith('/admin/ebooks') ? 'text-green-200 font-medium' : ''
                      }`}
                  >
                    Autori
                  </button>
                                    <button
                    onClick={() => navigateTo('/admin/subscriptions')}
                    className={`text-white hover:text-green-200 transition-colors ${router.pathname.startsWith('/admin/ebooks') ? 'text-green-200 font-medium' : ''
                      }`}
                  >
                    Abonați
                  </button>
                </nav>
              </div>

              {/* User menu */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#09a252] hover:bg-green-100 font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Deconectare
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
