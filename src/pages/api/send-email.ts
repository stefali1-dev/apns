import type { NextApiRequest, NextApiResponse } from 'next';

interface SendEmailRequestBody {
  toEmail: string;
  subject: string;
  htmlContent: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Metodă nepermisă. Doar POST este permis.' });
  }

  const { toEmail, subject, htmlContent }: SendEmailRequestBody = req.body;

  if (!toEmail || !subject || !htmlContent) {
    return res.status(400).json({
      message: 'Lipsesc câmpuri esențiale pentru trimiterea emailului (toEmail, subject, htmlContent).',
    });
  }

  const fromEmail = 'no-reply@appns.ro'; // Trebuie să fie o adresă verificată în SelfMailKit
  let apiKey = process.env.SELFMAILKIT_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'SELFMAILKIT_API_KEY lipsă din variabilele de mediu.' });
  }

  // Elimina spațiile sau newline-urile
  apiKey = apiKey.trim();

  const payload = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  try {
    const response = await fetch('https://api.selfmailkit.com/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`[SelfMailKit] Eroare API:`, errorBody);
      return res.status(response.status).json({
        message: 'Eroare la trimiterea emailului prin SelfMailKit.',
        details: errorBody,
      });
    }

    console.log(`[SelfMailKit] Email trimis cu succes către: ${toEmail}`);
    return res.status(200).json({ message: 'Email trimis cu succes!' });

  } catch (error: any) {
    console.error(`[SelfMailKit] Eroare necunoscută:`, error);
    return res.status(500).json({
      message: 'A apărut o eroare necunoscută la trimiterea emailului.',
      details: error.message || 'Verifică log-urile serverului.',
    });
  }
}
