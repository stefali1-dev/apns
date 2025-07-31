// ==============================================
// FILE: services/ebookService.ts
// LOCATION: src/services/ebookService.ts
// ==============================================

export interface Author {
  id: number;
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface EBook {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  toc: string; // Table of Contents HTML
  category: Category;
  authors: Author[];
  coverImage?: string;
  isFree: boolean;
  price?: number;
  format: 'pdf' | 'epub';
  pageCount: number;
  publishedDate: string;
}

// Mock data
const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'APNS',
    title: '',
    bio: 'Asociația pentru Promovarea Nutriției Sănătoase',
    profileImage: '/images/logo.png'
  }
];

const mockCategories: Category[] = [
  { id: 1, name: '' }
];

export const mockEbooks: EBook[] = [
  {
    id: 1,
    title: 'Spring Restart',
    slug: 'spring-restart',
    shortDescription: 'Slăbește sănătos chiar și în perioadele ocupate cu strategii simple și eficiente.',
    fullDescription: `
      <p class="text-gray-700 leading-relaxed mb-6 text-lg">Ghidul complet pentru persoanele ocupate care vor să slăbească sănătos și să își recapete energia. Descoperă cum să îți accelerezi metabolismul, să integrezi alimentele potrivite și să creezi obiceiuri sustenabile.</p>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <p class="text-gray-900 leading-relaxed mb-4 font-semibold text-lg"><strong>Ce vei descoperi:</strong></p>
        <ul class="space-y-3 list-disc list-inside text-gray-900 leading-relaxed">
          <li><strong>Cum să îți accelerezi metabolismul</strong> cu strategii simple și eficiente</li>
          <li><strong>Rețete rapide și hrănitoare</strong> în mai puțin de 15 minute</li>
          <li><strong>Cum să integrezi mișcarea</strong> în rutina zilnică, chiar dacă nu ajungi la sală</li>
          <li><strong>De ce somnul este aliatul tău</strong> în menținerea unei greutăți optime</li>
          <li><strong>7 alimente care susțin natural</strong> detoxifierea organismului</li>
        </ul>
      </div>
      
      <p class="text-gray-700 leading-relaxed">Un restart complet pentru corpul și mintea ta, perfect adaptat pentru persoanele cu un program încărcat.</p>
    `,
    toc: `
      <ol class="space-y-3 list-decimal list-inside text-gray-700 leading-relaxed">
        <li>Introducere - sănătatea începe din interior</li>
        <li>Metabolismul - mit vs adevăr</li>
        <li>7 superalimente</li>
        <li>Rețete rapide și sănătoase pentru persoane ocupate</li>
        <li>Suplimente și vitamine esențiale</li>
        <li>Sportul & hidratarea - secretul unui corp sănătos</li>
        <li>Somnul - Aliatul tău în regenerarea corpului</li>
        <li>Încheiere - Sănătatea e în mâinile tale</li>
      </ol>
    `,
    category: mockCategories[0],
    authors: [mockAuthors[0]],
    coverImage: '/images/ebook.png',
    isFree: true,
    format: 'pdf',
    pageCount: 14,
    publishedDate: '2025-06-15'
  }
];

class EBookService {
  // Simulează un delay de network
  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAllEBooks(): Promise<EBook[]> {
    await this.delay();
    return [...mockEbooks];
  }

  async getEBookBySlug(slug: string): Promise<EBook | null> {
    await this.delay();
    return mockEbooks.find(ebook => ebook.slug === slug) || null;
  }

  async getEBookById(id: number): Promise<EBook | null> {
    await this.delay();
    return mockEbooks.find(ebook => ebook.id === id) || null;
  }

  async getRelatedEBooks(ebookId: number, limit: number = 4): Promise<EBook[]> {
    await this.delay();
    const currentEBook = mockEbooks.find(ebook => ebook.id === ebookId);
    if (!currentEBook) return [];

    // Găsește eBooks din aceeași categorie
    const related = mockEbooks
      .filter(ebook => 
        ebook.id !== ebookId && 
        ebook.category.id === currentEBook.category.id
      )
      .slice(0, limit);

    // Dacă nu sunt suficiente din aceeași categorie, completează cu altele
    if (related.length < limit) {
      const remaining = mockEbooks
        .filter(ebook => 
          ebook.id !== ebookId && 
          !related.find(r => r.id === ebook.id)
        )
        .slice(0, limit - related.length);
      
      related.push(...remaining);
    }

    return related;
  }

  async sendEBookDownload(slug: string, email: string): Promise<{ success: boolean; error?: string }> {
    await this.delay(1000);

    // Validări simple
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Adresa de email nu este validă' };
    }

    const ebook = await this.getEBookBySlug(slug);
    if (!ebook) {
      return { success: false, error: 'E-book-ul nu a fost găsit' };
    }

    if (!ebook.isFree) {
      return { success: false, error: 'Acest e-book nu este gratuit' };
    }

    try {
      // Pentru moment, folosim întotdeauna spring-restart.pdf
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const ebookUrl = `${baseUrl}/ebooks/spring-restart.pdf`;
      
      // Creează corpul email-ului cu styling consistent
      const htmlContent = this.createEbookEmailTemplate(ebook, ebookUrl);
      
      // Trimite email-ul folosind API-ul existent
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: email,
          subject: `E-book-ul tău gratuit: ${ebook.title}`,
          htmlContent: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Eroare la trimiterea email-ului:', errorData);
        return { success: false, error: 'Eroare la trimiterea email-ului' };
      }

      console.log(`E-book "${ebook.title}" trimis cu succes către ${email}`);
      return { success: true };
    } catch (error) {
      console.error('Eroare la trimiterea email-ului:', error);
      return { success: false, error: 'A apărut o eroare la trimiterea email-ului' };
    }
  }

  private createEbookEmailTemplate(ebook: EBook, downloadUrl: string): string {
    const currentYear = new Date().getFullYear();
    
    return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>E-book-ul tău: ${ebook.title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; }
    table { border-collapse: collapse; width: 100%; }
    img { max-width: 100%; height: auto; display: block; }
    
    /* Layout styles */
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .email-wrapper { background-color: #f8f9fa; padding: 20px 0; }
    
    /* Header styles */
    .header { background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 1px solid #e9ecef; }
    .logo { font-size: 24px; font-weight: bold; color: #09a252; margin-bottom: 10px; }
    .header-subtitle { color: #6c757d; font-size: 14px; }
    
    /* Main content styles */
    .main-content { padding: 40px 40px 30px; background-color: #ffffff; }
    .hero-section { text-align: center; margin-bottom: 35px; }
    .hero-title { font-size: 28px; font-weight: bold; color: #2d3748; margin-bottom: 15px; line-height: 1.3; }
    .hero-subtitle { font-size: 16px; color: #4a5568; margin-bottom: 25px; }
    
    /* E-book card styles */
    .ebook-card { background-color: #f8fffe; border: 1px solid #e6f7f3; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center; }
    .ebook-title { font-size: 20px; font-weight: bold; color: #2d3748; margin-bottom: 10px; }
    .ebook-description { color: #4a5568; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }
    .ebook-meta { display: inline-block; background-color: #09a252; color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 25px; }
    
    /* Download button styles */
    .download-button { 
      display: inline-block; 
      background-color: #09a252; 
      color: #ffffff !important; 
      padding: 14px 32px; 
      text-decoration: none; 
      border-radius: 8px; 
      font-weight: 600; 
      font-size: 16px; 
      margin: 20px 0;
      transition: background-color 0.3s ease;
    }
    .download-button:hover { background-color: #078043; color: #ffffff !important; }
    .download-button:visited { color: #ffffff !important; }
    .download-button:link { color: #ffffff !important; }
    .download-button:active { color: #ffffff !important; }
    
    /* Benefits section */
    .benefits { margin: 30px 0; }
    .benefits-title { font-size: 18px; font-weight: bold; color: #2d3748; margin-bottom: 15px; text-align: center; }
    .benefit-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .benefit-icon { color: #09a252; margin-right: 10px; flex-shrink: 0; width: 16px; height: 16px; }
    .benefit-text { color: #4a5568; font-size: 14px; }
    
    /* Footer styles */
    .footer { background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef; }
    .footer-text { color: #6c757d; font-size: 12px; line-height: 1.5; margin-bottom: 15px; }
    .footer-links { margin-bottom: 15px; }
    .footer-link { color: #09a252; text-decoration: none; font-size: 12px; margin: 0 10px; }
    .footer-link:hover { text-decoration: underline; }
    .social-links { margin-top: 20px; }
    .social-link { color: #6c757d; text-decoration: none; margin: 0 8px; font-size: 12px; }
    
    /* Responsive design */
    @media only screen and (max-width: 480px) {
      .email-wrapper { padding: 10px; }
      .header, .main-content, .footer { padding: 20px; }
      .hero-title { font-size: 24px; }
      .download-button { padding: 12px 24px; font-size: 14px; }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .email-container { background-color: #ffffff; }
      .hero-title, .ebook-title, .benefits-title { color: #2d3748; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="logo">APNS</div>
        <div class="header-subtitle">Asociația pentru Promovarea Nutriției Sănătoase</div>
      </div>
      
      <!-- Main Content -->
      <div class="main-content">
        <!-- Hero Section -->
        <div class="hero-section">
          <h1 class="hero-title">E-book-ul tău este gata pentru descărcare!</h1>
          <p class="hero-subtitle">Mulțumim că ai ales să înveți alături de noi despre nutriția sănătoasă.</p>
        </div>
        
        <!-- E-book Card -->
        <div class="ebook-card">
          <h2 class="ebook-title">${ebook.title}</h2>
          <p class="ebook-description">${ebook.shortDescription}</p>
          
          <a href="${downloadUrl}" class="download-button" target="_blank" rel="noopener">
            Descarcă E-book-ul
          </a>

        </div>
        
        <!-- Call to Action -->
        <div style="text-align: center; padding: 20px; margin: 25px 0;">
          <h4 style="color: #2d3748; font-size: 16px; margin-bottom: 10px;">Ai întrebări despre nutriție?</h4>
          <p style="color: #4a5568; font-size: 14px; margin-bottom: 15px;">
            Echipa noastră de specialiști în nutriție este aici să te ajute. Contactează-ne!
          </p>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/contact" 
             style="color: #09a252; text-decoration: none; font-weight: 600; font-size: 14px;">
            Contactează specialiștii →
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p class="footer-text">
          Acest email a fost trimis deoarece ai solicitat descărcarea e-book-ului "${ebook.title}" de pe site-ul nostru.
        </p>
        
        <div class="footer-links">
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/confidentialitate" class="footer-link">Politica de confidențialitate</a>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/contact" class="footer-link">Contact</a>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/ebooks" class="footer-link">Mai multe e-books</a>
        </div>
        
        <p class="footer-text">
          <strong>APNS - Asociația pentru Promovarea Nutriției Sănătoase</strong><br>
          © ${currentYear} APNS. Toate drepturile rezervate.
        </p>
        
        <p style="color: #9ca3af; font-size: 11px; margin-top: 15px;">
          Dacă nu dorești să mai primești emailuri de la noi, 
          <a href="#" style="color: #9ca3af;">dezabonează-te aici</a>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  async getAllCategories(): Promise<Category[]> {
    await this.delay(100);
    return [...mockCategories];
  }

  async getAllAuthors(): Promise<Author[]> {
    await this.delay(100);
    return [...mockAuthors];
  }
}

export const ebookService = new EBookService();