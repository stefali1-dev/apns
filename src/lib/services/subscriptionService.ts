// lib/subscriptionService.ts
import { supabase } from "@/lib/supabaseClient";

interface Subscription {
  id?: string;
  email: string;
  created_at?: string;
  is_active?: boolean;
}

export async function subscribeUser(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Check if email already exists
    const { data: existingSubscription, error: checkError } = await supabase
      .from('subscriptions')
      .select('email')
      .eq('email', email)
      .single();

    if (existingSubscription) {
      return { 
        success: false, 
        message: 'Email-ul este deja înregistrat pentru newsletter.' 
      };
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ 
        email, 
        is_active: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

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
