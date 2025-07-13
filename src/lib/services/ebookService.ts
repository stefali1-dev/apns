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
    name: 'Dr. Maria Popescu',
    title: 'Nutriționist specialist, PhD în Științe Medicale',
    bio: 'Dr. Maria Popescu este nutriționist cu peste 15 ani de experiență în domeniul nutriției clinice și preventive. A lucrat în spitale de top din România și a publicat numeroase studii despre rolul alimentației în prevenirea bolilor cronice. Este membră a Societății Române de Nutriție și autoare a mai multor cărți de specialitate.',
    profileImage: '/images/authors/maria-popescu.jpg'
  },
  {
    id: 2,
    name: 'Prof. Dr. Alexandru Ionescu',
    title: 'Profesor universitrar, specialist în endocrinologie și nutriție',
    bio: 'Profesor la Universitatea de Medicină din București, cu specializare în endocrinologie și boli metabolice. Are o vastă experiență în tratamentul diabetului și a publicat peste 100 de articole științifice în reviste internaționale. Este consultant pentru mai multe organizații de sănătate publică.',
    profileImage: '/images/authors/alexandru-ionescu.jpg'
  },
  {
    id: 3,
    name: 'Elena Dumitrescu',
    title: 'Nutriționist clinian, specialist în diete terapeutice',
    bio: 'Nutriționist cu specializare în diete terapeutice pentru diverse afecțiuni. A dezvoltat planuri alimentare pentru peste 1000 de pacienți și colaborează cu echipe medicale multidisciplinare. Este certificată în consiliere nutrițională și educație pentru sănătate.',
    profileImage: '/images/authors/elena-dumitrescu.jpg'
  }
];

const mockCategories: Category[] = [
  { id: 1, name: 'Nutriție de bază' },
  { id: 2, name: 'Diete speciale' },
  { id: 3, name: 'Rețete sănătoase' },
  { id: 4, name: 'Nutriție sportivă' },
  { id: 5, name: 'Sănătate digestivă' },
  { id: 6, name: 'Prevenție boli' }
];

export const mockEbooks: EBook[] = [
  {
    id: 1,
    title: 'Ghidul complet al alimentației sănătoase',
    slug: 'ghidul-complet-alimentatie-sanatoasa',
    shortDescription: 'Totul despre nutriția echilibrată și beneficiile unei alimentații corecte pentru sănătate.',
    fullDescription: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed text-gray-700">
          Acest <strong class="text-[#09a252]">ghid complet</strong> vă oferă toate informațiile necesare pentru a adopta un stil de viață alimentar sănătos și echilibrat. Veți descoperi principiile fundamentale ale nutriției moderne, bazate pe cele mai recente cercetări științifice.
        </p>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-green-800 mb-3">🎯 Ce veți învăța din acest e-book:</h4>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Principiile de bază ale unei <em>alimentații echilibrate</em></span>
            </li>
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Rolul <strong>macronutrienților și micronutrienților</strong> în organism</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Cum să planificați mesele pentru o nutriție optimă</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Strategii pentru menținerea unei <strong class="text-blue-600">greutăți sănătoase</strong></span>
            </li>
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Alimente funcționale și beneficiile lor pentru sănătate</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#09a252] mr-2 mt-1">✓</span>
              <span>Cum să citiți și să interpretați <em>etichetele alimentare</em></span>
            </li>
          </ul>
        </div>
        
        
        <p class="text-gray-700 leading-relaxed">
          <strong class="text-[#09a252]">Ideal pentru:</strong> începători care doresc să își îmbunătățească alimentația, 
          dar și pentru cei care vor să își aprofundeze cunoștințele în domeniul nutriției. Ghidul este structurat 
          progresiv, de la concepte de bază la aplicații practice avansate.
        </p>
        
      </div>
    `,
    toc: `
      <ol class="space-y-3">
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">1. Introducere în Nutriția Modernă</span>
            <span class="text-gray-500 text-sm">Pagina 1</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">2. Macronutrienții - Combustibilul Corpului</span>
            <span class="text-gray-500 text-sm">Pagina 15</span>
          </div>
          <ul class="ml-6 mt-3 space-y-2 text-gray-600 text-sm">
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              2.1. Carbohidrații - Energia de bază
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              2.2. Proteinele - Materialul de construcție
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              2.3. Lipidele - Energia de rezervă
            </li>
          </ul>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">3. Micronutrienții Esențiali</span>
            <span class="text-gray-500 text-sm">Pagina 35</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">4. Planificarea Meselor Echilibrate</span>
            <span class="text-gray-500 text-sm">Pagina 55</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">5. Alimente Funcționale și Superalimente</span>
            <span class="text-gray-500 text-sm">Pagina 75</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">6. Ghid Practic pentru Cumpărături</span>
            <span class="text-gray-500 text-sm">Pagina 95</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3">
            <span class="font-medium text-gray-800">7. Meniuri Model și Rețete</span>
            <span class="text-gray-500 text-sm">Pagina 105</span>
          </div>
        </li>
      </ol>
    `,
    category: mockCategories[0],
    authors: [mockAuthors[0]],
    coverImage: '/images/ebook.png',
    isFree: true,
    format: 'pdf',
    pageCount: 120,
    publishedDate: '2024-01-15'
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
    await this.delay(1000); // Simulează procesarea email-ului

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

    // Simulează trimiterea email-ului
    console.log(`Sending ebook "${ebook.title}" to ${email}`);
    
    return { success: true };
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