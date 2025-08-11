import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService, AuthUser } from '@/lib/services/authService';

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return {
    user,
    loading,
    isAuthenticated: !!user
  };
};
