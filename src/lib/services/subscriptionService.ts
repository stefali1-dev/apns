// lib/subscriptionService.ts
import { supabase } from "@/lib/supabaseClient";

interface Subscription {
  id?: string;
  email: string;
  created_at?: string;
  is_active?: boolean;
  source?: 'modal' | 'ebook_download' | 'unknown';
}

// Subscribes a user. Idempotent: if email exists, we optionally update source if it was 'unknown'.
export async function subscribeUser(
  email: string,
  source: 'modal' | 'ebook_download' | 'unknown' = 'modal'
): Promise<{ success: boolean; message?: string }> {
  try {
    // Check if email already exists
    const { data: existingSubscriptions, error: checkError } = await supabase
      .from('subscriptions')
      .select('id,email,source')
      .eq('email', email);

    if (checkError) {
      console.error('Error checking existing subscription:', checkError);
      return { 
        success: false, 
        message: 'A apărut o eroare la verificarea email-ului.' 
      };
    }

    if (existingSubscriptions && existingSubscriptions.length > 0) {
      // Already subscribed. Optionally update source if previous was unknown and new is more specific.
      const existing = existingSubscriptions[0];
      if (existing.source === 'unknown' && source !== 'unknown') {
        await supabase
          .from('subscriptions')
          .update({ source })
          .eq('email', email);
      }
      return { 
        success: true, 
        message: 'Email existent – abonare deja activă.' 
      };
    }

    // Insert new subscription with source
    const { error } = await supabase
      .from('subscriptions')
      .insert([{ 
        email, 
        is_active: true,
        created_at: new Date().toISOString(),
        source
      }]);

    if (error) {
      console.error('Error subscribing user:', error);
      return { 
        success: false, 
        message: 'A apărut o eroare la înregistrarea pentru newsletter.' 
      };
    }

    return { 
      success: true, 
      message: 'Subscription successful!' 
    };
    
  } catch (error) {
    console.error('Error in subscribeUser:', error);
    return { 
      success: false, 
      message: 'A apărut o eroare la înregistrarea pentru newsletter.' 
    };
  }
}

export async function unsubscribeUser(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ is_active: false })
      .eq('email', email);

    if (error) {
      console.error('Error unsubscribing user:', error);
      return { 
        success: false, 
        message: 'A apărut o eroare la dezabonare.' 
      };
    }

    return { 
      success: true, 
      message: 'Unsubscription successful!' 
    };
    
  } catch (error) {
    console.error('Error in unsubscribeUser:', error);
    return { 
      success: false, 
      message: 'A apărut o eroare la dezabonare.' 
    };
  }
}

export async function getActiveSubscriptions(): Promise<Subscription[]> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getActiveSubscriptions:', error);
    return [];
  }
}
