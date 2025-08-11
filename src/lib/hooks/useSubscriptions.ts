import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Subscription {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  inactive: number;
}

export interface SubscriptionFilters {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  sortBy?: 'email' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface UseSubscriptionsReturn {
  subscriptions: Subscription[];
  stats: SubscriptionStats | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  
  // Actions
  fetchSubscriptions: (filters?: SubscriptionFilters) => Promise<void>;
  fetchStats: () => Promise<void>;
  addSubscription: (email: string) => Promise<boolean>;
  updateSubscriptionStatus: (id: string, isActive: boolean) => Promise<boolean>;
  deleteSubscription: (id: string) => Promise<boolean>;
  deleteMultipleSubscriptions: (ids: string[]) => Promise<boolean>;
  exportSubscriptions: (filters?: SubscriptionFilters) => Promise<Blob | null>;
  validateEmail: (email: string) => string | null;
}

export const useSubscriptions = (): UseSubscriptionsReturn => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const validateEmail = useCallback((email: string): string | null => {
    if (!email.trim()) return 'Email-ul este obligatoriu';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email-ul nu este valid';
    
    return null;
  }, []);

  const fetchSubscriptions = useCallback(async (filters: SubscriptionFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const {
        search = '',
        status = 'all',
        sortBy = 'created_at',
        sortOrder = 'desc',
        page = 1,
        limit = 20
      } = filters;

      let query = supabase
        .from('subscriptions')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (search.trim()) {
        query = query.ilike('email', `%${search.trim()}%`);
      }

      // Apply status filter
      if (status !== 'all') {
        query = query.eq('is_active', status === 'active');
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setSubscriptions(data || []);
      setTotalCount(count || 0);
      setCurrentPage(page);
      setTotalPages(Math.ceil((count || 0) / limit));
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Eroare la încărcarea abonărilor');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('is_active');

      if (error) throw error;

      const total = data?.length || 0;
      const active = data?.filter(sub => sub.is_active).length || 0;
      const inactive = total - active;

      setStats({ total, active, inactive });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  const addSubscription = useCallback(async (email: string): Promise<boolean> => {
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return false;
    }

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setError('Acest email este deja înregistrat');
        } else {
          throw error;
        }
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error adding subscription:', err);
      setError('Eroare la adăugarea abonării');
      return false;
    }
  }, [validateEmail]);

  const updateSubscriptionStatus = useCallback(async (id: string, isActive: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, is_active: isActive } : sub
        )
      );

      return true;
    } catch (err) {
      console.error('Error updating subscription status:', err);
      setError('Eroare la actualizarea statusului');
      return false;
    }
  }, []);

  const deleteSubscription = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      setTotalCount(prev => prev - 1);

      return true;
    } catch (err) {
      console.error('Error deleting subscription:', err);
      setError('Eroare la ștergerea abonării');
      return false;
    }
  }, []);

  const deleteMultipleSubscriptions = useCallback(async (ids: string[]): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .in('id', ids);

      if (error) throw error;

      // Update local state
      setSubscriptions(prev => prev.filter(sub => !ids.includes(sub.id)));
      setTotalCount(prev => prev - ids.length);

      return true;
    } catch (err) {
      console.error('Error deleting multiple subscriptions:', err);
      setError('Eroare la ștergerea abonărilor');
      return false;
    }
  }, []);

  const exportSubscriptions = useCallback(async (filters: SubscriptionFilters = {}): Promise<Blob | null> => {
    try {
      // Fetch all subscriptions (no pagination for export)
      const {
        search = '',
        status = 'all',
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = filters;

      let query = supabase
        .from('subscriptions')
        .select('*');

      if (search.trim()) {
        query = query.ilike('email', `%${search.trim()}%`);
      }

      if (status !== 'all') {
        query = query.eq('is_active', status === 'active');
      }

      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;

      if (error) throw error;

      // Convert to CSV
      if (!data || data.length === 0) {
        setError('Nu există date pentru export');
        return null;
      }

      const headers = ['Email', 'Status', 'Data înregistrării', 'Ultima actualizare'];
      const csvContent = [
        headers.join(','),
        ...data.map(sub => [
          sub.email,
          sub.is_active ? 'Activ' : 'Inactiv',
          new Date(sub.created_at).toLocaleDateString('ro-RO'),
          new Date(sub.updated_at).toLocaleDateString('ro-RO')
        ].join(','))
      ].join('\n');

      // Add BOM for proper UTF-8 encoding in Excel
      const BOM = '\uFEFF';
      return new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    } catch (err) {
      console.error('Error exporting subscriptions:', err);
      setError('Eroare la exportul datelor');
      return null;
    }
  }, []);

  return {
    subscriptions,
    stats,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchSubscriptions,
    fetchStats,
    addSubscription,
    updateSubscriptionStatus,
    deleteSubscription,
    deleteMultipleSubscriptions,
    exportSubscriptions,
    validateEmail
  };
};
