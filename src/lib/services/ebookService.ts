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

const mockEbooks: EBook[] = [
  {
    id: 1,
    title: 'Ghidul complet al alimentației sănătoase',
    slug: 'ghidul-complet-alimentatie-sanatoasa',
    shortDescription: 'Totul despre nutriția echilibrată și beneficiile unei alimentații corecte pentru sănătate.',
    fullDescription: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed text-gray-700">
          Acest <strong class="text-green-700">ghid complet</strong> vă oferă toate informațiile necesare pentru a adopta un stil de viață alimentar sănătos și echilibrat. Veți descoperi principiile fundamentale ale nutriției moderne, bazate pe cele mai recente cercetări științifice.
        </p>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-green-800 mb-3">🎯 Ce veți învăța din acest e-book:</h4>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Principiile de bază ale unei <em>alimentații echilibrate</em></span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Rolul <strong>macronutrienților și micronutrienților</strong> în organism</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Cum să planificați mesele pentru o nutriție optimă</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Strategii pentru menținerea unei <strong class="text-blue-600">greutăți sănătoase</strong></span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Alimente funcționale și beneficiile lor pentru sănătate</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">✓</span>
              <span>Cum să citiți și să interpretați <em>etichetele alimentare</em></span>
            </li>
          </ul>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-blue-800 mb-3">📚 Conținut practic inclus:</h4>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h5 class="font-medium text-blue-700 mb-2">Ghiduri practice:</h5>
              <ul class="space-y-1">
                <li>• Exemple de meniuri zilnice</li>
                <li>• Liste de cumpărături optimizate</li>
                <li>• Planificator săptămânal de mese</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-blue-700 mb-2">Sfaturi culinare:</h5>
              <ul class="space-y-1">
                <li>• Tehnici de preparare sănătoasă</li>
                <li>• Conservarea valorii nutriționale</li>
                <li>• Substituții alimentare inteligente</li>
              </ul>
            </div>
          </div>
        </div>
        
        <blockquote class="border-l-4 border-gray-300 pl-6 italic text-gray-600 bg-gray-50 p-4 rounded-r-lg">
          "Sănătatea nu este doar absența bolii, ci o stare de bine fizic, mental și social complet." 
          <footer class="text-sm font-medium text-gray-500 mt-2">— Organizația Mondială a Sănătății</footer>
        </blockquote>
        
        <p class="text-gray-700 leading-relaxed">
          <strong class="text-green-700">Ideal pentru:</strong> începători care doresc să își îmbunătățească alimentația, 
          dar și pentru cei care vor să își aprofundeze cunoștințele în domeniul nutriției. Ghidul este structurat 
          progresiv, de la concepte de bază la aplicații practice avansate.
        </p>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-800">
            <strong>💡 Bonus:</strong> Acces la comunitatea online APNS pentru întrebări și suport continuu în parcursul dvs. către o alimentație mai sănătoasă.
          </p>
        </div>
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
    coverImage: '/images/ebooks/ghid-alimentatie.jpg',
    isFree: true,
    format: 'pdf',
    pageCount: 120,
    publishedDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Prevenirea diabetului prin alimentație',
    slug: 'prevenirea-diabetului-alimentatie',
    shortDescription: 'Ghid practic pentru prevenirea și managementul diabetului prin nutriție adaptată și controlul glicemiei.',
    fullDescription: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed text-gray-700">
          <strong class="text-red-600">Diabetul zaharat</strong> reprezintă una dintre cele mai răspândite boli cronice la nivel mondial. 
          Acest ghid specializat vă oferă informații complete despre <em class="text-blue-600">rolul crucial al alimentației</em> 
          în prevenirea și managementul diabetului.
        </p>
        
        <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-red-800 mb-4">⚠️ Date alarmante:</h4>
          <div class="grid md:grid-cols-3 gap-4 text-center">
            <div class="bg-white p-4 rounded-lg">
              <div class="text-2xl font-bold text-red-600">11.6%</div>
              <div class="text-sm text-gray-600">din adulții români au diabet</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <div class="text-2xl font-bold text-red-600">50%</div>
              <div class="text-sm text-gray-600">nu sunt diagnosticați</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <div class="text-2xl font-bold text-red-600">30%</div>
              <div class="text-sm text-gray-600">risc de reducere prin dietă</div>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-green-800 mb-3">🎯 Beneficiile acestui ghid:</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">🧠</span>
                <span>Înțelegerea <strong>mecanismelor diabetului</strong> și rolul alimentației</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">🛡️</span>
                <span>Strategii alimentare pentru <em>prevenirea diabetului de tip 2</em></span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">📋</span>
                <span>Planuri de meniu adaptate pentru diferite stadii</span>
              </li>
            </ul>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">📊</span>
                <span>Tehnici de <strong>monitorizare a glicemiei</strong> prin alimentație</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">🍽️</span>
                <span>Rețete delicioase și sănătoase pentru diabetici</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-1">🚨</span>
                <span>Sfaturi pentru <em>gestionarea crizelor glicemice</em></span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-blue-800 mb-3">📖 Ce include ghidul:</h4>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-4 rounded-lg">
              <h5 class="font-medium text-blue-700 mb-2">📚 Teorie aplicată</h5>
              <ul class="space-y-1 text-gray-600">
                <li>• Studii de caz reale</li>
                <li>• Cercetări științifice recente</li>
                <li>• Ghiduri internaționale</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h5 class="font-medium text-blue-700 mb-2">🛠️ Instrumente practice</h5>
              <ul class="space-y-1 text-gray-600">
                <li>• Planuri alimentare personalizabile</li>
                <li>• Calculator carbohidrați</li>
                <li>• Jurnal glicemic</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h5 class="font-medium text-blue-700 mb-2">📈 Monitorizare progres</h5>
              <ul class="space-y-1 text-gray-600">
                <li>• Indicatori cheie</li>
                <li>• Grafice de urmărire</li>
                <li>• Obiective SMART</li>
              </ul>
            </div>
          </div>
        </div>
        
        <blockquote class="border-l-4 border-blue-300 pl-6 italic text-gray-700 bg-blue-50 p-4 rounded-r-lg">
          "Prevenția este cea mai bună medicină. Alimentația corectă poate fi cheia pentru o viață fără diabet." 
          <footer class="text-sm font-medium text-blue-600 mt-2">— Prof. Dr. Alexandru Ionescu, Endocrinolog</footer>
        </blockquote>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-800">
            <strong class="text-yellow-900">👥 Recomandat pentru:</strong> persoanele cu risc de diabet, 
            cele deja diagnosticate care doresc să își îmbunătățească controlul glicemic, 
            și familiile care vor să adopte un stil de viață preventiv.
          </p>
        </div>
      </div>
    `,
    toc: `
      <ol class="space-y-3">
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">1. Înțelegerea Diabetului Zaharat</span>
            <span class="text-gray-500 text-sm">Pagina 1</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">2. Rolul Alimentației în Diabet</span>
            <span class="text-gray-500 text-sm">Pagina 18</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">3. Planificarea Meselor pentru Diabetici</span>
            <span class="text-gray-500 text-sm">Pagina 35</span>
          </div>
          <ul class="ml-6 mt-3 space-y-2 text-gray-600 text-sm">
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              3.1. Metoda farfuriei
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              3.2. Calculul carbohidraților
            </li>
            <li class="flex items-center">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              3.3. Indicele glicemic
            </li>
          </ul>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">4. Alimente Recomandate și Interzise</span>
            <span class="text-gray-500 text-sm">Pagina 52</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">5. Planuri de Meniu Săptămânale</span>
            <span class="text-gray-500 text-sm">Pagina 68</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">6. Rețete Adaptate pentru Diabetici</span>
            <span class="text-gray-500 text-sm">Pagina 85</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3">
            <span class="font-medium text-gray-800">7. Monitorizarea și Ajustarea Dietei</span>
            <span class="text-gray-500 text-sm">Pagina 102</span>
          </div>
        </li>
      </ol>
    `,
    category: mockCategories[5],
    authors: [mockAuthors[1], mockAuthors[2]],
    coverImage: '/images/ebooks/diabet-preventie.jpg',
    isFree: true,
    format: 'pdf',
    pageCount: 110,
    publishedDate: '2024-06-01'
  },
  {
    id: 3,
    title: 'Dieta mediteraneană modernă',
    slug: 'dieta-mediteraneana-moderna',
    shortDescription: 'Principiile dietei mediteraneene adaptate stilului de viață contemporan pentru o sănătate optimă.',
    fullDescription: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed text-gray-700">
          <strong class="text-blue-600">Dieta mediteraneană</strong> este recunoscută la nivel mondial ca fiind unul dintre 
          cele mai sănătoase tipuri de alimentație. Acest ghid modern vă arată cum să adaptați 
          <em class="text-green-600">principiile tradiționale</em> ale dietei mediteraneene la stilul de viață contemporan.
        </p>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <h4 class="text-lg font-semibold text-blue-800 mb-4">🏆 Avantajele științific dovedite:</h4>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-red-600 font-bold text-lg">❤️</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Sănătate cardiovasculară</div>
                  <div class="text-sm text-gray-600">Reducere cu <strong class="text-red-600">30%</strong> a riscului</div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-purple-600 font-bold text-lg">🧠</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Funcții cognitive</div>
                  <div class="text-sm text-gray-600">Prevenirea demenței și Alzheimer</div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-green-600 font-bold text-lg">⚖️</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Control greutate</div>
                  <div class="text-sm text-gray-600">Menținere pe termen lung</div>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-orange-600 font-bold text-lg">🔥</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Anti-inflamator</div>
                  <div class="text-sm text-gray-600">Reducerea inflamației sistemice</div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-blue-600 font-bold text-lg">🦠</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Sănătate digestivă</div>
                  <div class="text-sm text-gray-600">Îmbunătățirea microbiotei</div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-yellow-600 font-bold text-lg">⏰</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">Longevitate</div>
                  <div class="text-sm text-gray-600">Creșterea calității vieții</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-green-800 mb-4">🍽️ Piramida alimentară mediteraneană modernă:</h4>
          <div class="space-y-3">
            <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <div class="flex justify-between items-center">
                <span class="font-medium text-green-800">Zilnic:</span>
                <span class="text-sm text-gray-600">Consumul de bază</span>
              </div>
              <p class="text-sm text-gray-700 mt-2">Legume, fructe, cereale integrale, nuci, semințe, ulei de măsline, ierburi aromatice</p>
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <div class="flex justify-between items-center">
                <span class="font-medium text-blue-800">Săptămânal:</span>
                <span class="text-sm text-gray-600">2-3 porții</span>
              </div>
              <p class="text-sm text-gray-700 mt-2">Pește și fructe de mare, carne albă de păsări, ouă, leguminoase</p>
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <div class="flex justify-between items-center">
                <span class="font-medium text-orange-800">Ocazional:</span>
                <span class="text-sm text-gray-600">Consumul limitat</span>
              </div>
              <p class="text-sm text-gray-700 mt-2">Carne roșie, dulciuri procesate, alimente ultra-procesate</p>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-yellow-800 mb-3">⚡ Adaptări pentru viața modernă:</h4>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 class="font-medium text-yellow-700 mb-2">🏃‍♂️ Pentru oamenii activi:</h5>
              <ul class="space-y-1 text-gray-700">
                <li>• Meal prep mediteranean</li>
                <li>• Gustări rapide și sănătoase</li>
                <li>• Adaptări pentru călătorii</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-yellow-700 mb-2">👨‍👩‍👧‍👦 Pentru familii:</h5>
              <ul class="space-y-1 text-gray-700">
                <li>• Rețete kid-friendly</li>
                <li>• Mese în familie</li>
                <li>• Educarea copiilor</li>
              </ul>
            </div>
          </div>
        </div>
        
        <blockquote class="border-l-4 border-blue-300 pl-6 italic text-gray-700 bg-blue-50 p-4 rounded-r-lg">
          "Dieta mediteraneană nu este doar despre mâncare, este un stil de viață care celebrează comunitatea, tradițiile și plăcerea de a mânca sănătos." 
          <footer class="text-sm font-medium text-blue-600 mt-2">— Dr. Maria Popescu, Nutriționist</footer>
        </blockquote>
        
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-gray-800 mb-3">🇷🇴 Adaptat pentru România:</h4>
          <p class="text-gray-700 leading-relaxed">
            Ghidul include <strong>adaptări specifice</strong> pentru realitățile alimentare din România, 
            cu ingrediente locale și de sezon, <em>prețuri accesibile</em> și sfaturi pentru găsirea 
            alternativelor mediteraneene în supermarketurile românești.
          </p>
        </div>
      </div>
    `,
    toc: `
      <ol class="space-y-3">
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">1. Istoricul și Principiile Dietei Mediteraneene</span>
            <span class="text-gray-500 text-sm">Pagina 1</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">2. Beneficiile Științific Demonstrate</span>
            <span class="text-gray-500 text-sm">Pagina 22</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">3. Piramida Alimentară Mediteraneană</span>
            <span class="text-gray-500 text-sm">Pagina 38</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">4. Adaptarea la Stilul de Viață Modern</span>
            <span class="text-gray-500 text-sm">Pagina 55</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">5. Planuri de Meniu și Rețete</span>
            <span class="text-gray-500 text-sm">Pagina 75</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">6. Ghid de Cumpărături și Ingrediente</span>
            <span class="text-gray-500 text-sm">Pagina 120</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="font-medium text-gray-800">7. Integrarea în Viața de Familie</span>
            <span class="text-gray-500 text-sm">Pagina 145</span>
          </div>
        </li>
        <li>
          <div class="flex justify-between items-center py-3">
            <span class="font-medium text-gray-800">8. Monitorizarea Progresului</span>
            <span class="text-gray-500 text-sm">Pagina 165</span>
          </div>
        </li>
      </ol>
    `,
    category: mockCategories[1],
    authors: [mockAuthors[0], mockAuthors[2]],
    coverImage: '/images/ebooks/dieta-mediteraneana.jpg',
    isFree: false,
    price: 29.99,
    format: 'epub',
    pageCount: 180,
    publishedDate: '2024-02-20'
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