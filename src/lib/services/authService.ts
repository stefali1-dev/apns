import { supabase } from '@/lib/supabaseClient';
import { User, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  app_metadata?: any;
  user_metadata?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

export class AuthService {
  
  /**
   * Sign in with email and password
   */
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          user: null,
          error: this.getErrorMessage(error)
        };
      }

      return {
        user: data.user ? this.mapUser(data.user) : null,
        error: null
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        user: null,
        error: 'A apărut o eroare la autentificare. Vă rugăm să încercați din nou.'
      };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: this.getErrorMessage(error) };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { error: 'A apărut o eroare la deconectare.' };
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return { session: null, error: this.getErrorMessage(error) };
      }

      return { 
        session, 
        user: session?.user ? this.mapUser(session.user) : null,
        error: null 
      };
    } catch (error: any) {
      console.error('Get session error:', error);
      return { session: null, user: null, error: 'Eroare la verificarea sesiunii.' };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        return { user: null, error: this.getErrorMessage(error) };
      }

      return { 
        user: user ? this.mapUser(user) : null, 
        error: null 
      };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return { user: null, error: 'Eroare la obținerea utilizatorului curent.' };
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ? this.mapUser(session.user) : null;
      callback(user);
    });
  }

  /**
   * Check if user is admin
   */
  isAdmin(user: AuthUser | null): boolean {
    if (!user) return false;
    
    // Check if user email is admin email
    if (user.email === 'admin@apns.ro') return true;
    
    // Check if user has admin role in app_metadata
    if (user.app_metadata?.role === 'admin') return true;
    
    return false;
  }

  /**
   * Map Supabase User to our AuthUser interface
   */
  private mapUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email || '',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || user.created_at,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata
    };
  }

  /**
   * Convert Supabase auth errors to user-friendly messages
   */
  private getErrorMessage(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Email sau parolă incorectă. Vă rugăm să încercați din nou.';
      case 'Email not confirmed':
        return 'Email-ul nu a fost confirmat. Vă rugăm să verificați căsuța poștală.';
      case 'Too many requests':
        return 'Prea multe încercări. Vă rugăm să așteptați câteva minute și să încercați din nou.';
      case 'User not found':
        return 'Contul nu a fost găsit. Verificați email-ul introdus.';
      case 'Invalid email':
        return 'Email-ul introdus nu este valid.';
      case 'Password is too weak':
        return 'Parola este prea slabă. Vă rugăm să alegeți o parolă mai puternică.';
      default:
        console.error('Auth error:', error);
        return 'A apărut o eroare la autentificare. Vă rugăm să încercați din nou.';
    }
  }
}

export const authService = new AuthService();
