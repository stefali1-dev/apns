import type { NextApiRequest, NextApiResponse } from 'next';
import { subscribeUser } from '@/lib/services/subscriptionService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalid' });
  }

  try {
    const result = await subscribeUser(email);
    
    if (result.success) {
      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return res.status(500).json({ error: 'A apărut o eroare la procesarea cererii' });
  }
}
