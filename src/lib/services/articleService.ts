import { Article } from "@/lib/types/article";

// services/articleService.ts
export class ArticleService {
    private mockArticles: Article[] = [
        {
            id: '1',
            title: 'Obezitatea - o epidemie modernă și impactul asupra sănătății',
            content: `<p>Obezitatea reprezintă una dintre cele mai mari provocări de sănătate publică ale secolului XXI. Această afecțiune complexă afectează milioane de oameni la nivel global și este asociată cu numeroase complicații medicale grave.</p>
<h3>Ce este obezitatea?</h3>
<p>Obezitatea este definită ca o acumulare anormală sau excesivă de grăsime care poate afecta sănătatea. Se măsoară folosind indicele de masă corporală (IMC), care se calculează împărțind greutatea în kilograme la pătratul înălțimii în metri.</p>
<h3>Cauzele obezității</h3>
<ul>
<li>Debalanța energetică între caloriile consumate și cele cheltuite</li>
<li>Stilul de viață sedentar</li>
<li>Factori genetici și metabolici</li>
<li>Factori psihologici și sociali</li>
</ul>
<h3>Impactul asupra sănătății</h3>
<p>Obezitatea poate duce la dezvoltarea mai multor afecțiuni grave, inclusiv diabetul de tip 2, bolile cardiovasculare, apneea de somn și anumite tipuri de cancer.</p>
<h3>Prevenția și tratamentul</h3>
<p>Abordarea obezității necesită o strategie multimodală care include modificări ale stilului de viață, educație nutrițională și, în unele cazuri, intervenție medicală specializată.</p>`,
            publishDate: '2024-12-15',
            author: 'Dr. Maria Popescu',
            category: 'Boli metabolice',
            imageUrl: '/images/obesity1.png',
            slug: 'obezitatea-epidemie-moderna',
            excerpt: 'Obezitatea reprezintă una dintre cele mai mari provocări de sănătate publică ale secolului XXI, afectând milioane de oameni la nivel global.'
        },
        {
            id: '2',
            title: 'Diabetul zaharat - management nutrițional și prevenție',
            content: `<p>Diabetul zaharat este o boală cronică caracterizată prin hiperglicemie, care rezultă din defecte în secreția sau acțiunea insulinei. Managementul nutrițional joacă un rol crucial în controlul acestei afecțiuni.</p>
<h3>Tipurile de diabet zaharat</h3>
<p>Există mai multe forme de diabet zaharat, cele mai comune fiind diabetul de tip 1 și diabetul de tip 2. Fiecare tip necesită o abordare specifică în ceea ce privește alimentația și stilul de viață.</p>
<h3>Principiile alimentației în diabet</h3>
<ul>
<li>Controlul porțiilor și a indicelui glicemic</li>
<li>Consumul regulat de mese la intervale fixe</li>
<li>Alegerea carbohidraților complecși</li>
<li>Includerea fibrelor în alimentație</li>
</ul>
<h3>Monitorizarea glicemiei</h3>
<p>Monitorizarea regulată a nivelului de glucoză din sânge este esențială pentru persoanele cu diabet. Aceasta permite ajustarea alimentației și medicației în funcție de nevoile individuale.</p>
<h3>Complicațiile diabetului</h3>
<p>Diabetul necontrolat poate duce la complicații grave precum neuropatia diabetică, nefropatia, retinopatia și bolile cardiovasculare.</p>`,
            publishDate: '2024-12-10',
            author: 'Dr. Alexandru Ionescu',
            category: 'Boli metabolice',
            imageUrl: '/images/diabetes1.png',
            slug: 'diabetul-zaharat-management-nutritional',
            excerpt: 'Diabetul zaharat este o boală cronică care necesită un management nutrițional atent și o abordare individualizată pentru controlul glicemiei.'
        },
        {
            id: '3',
            title: 'Guta - rolul alimentației în prevenție și tratament',
            content: `<p>Guta este o formă de artrită inflamatorie cauzată de depozitarea cristalelor de acid uric în articulații. Alimentația joacă un rol fundamental în managementul acestei afecțiuni.</p>
<h3>Ce este guta?</h3>
<p>Guta este rezultatul unui nivel ridicat de acid uric în sânge (hiperuricemie), care duce la formarea și depozitarea cristalelor de urat monosodic în articulații și țesuturi.</p>
<h3>Alimentele de evitat</h3>
<ul>
<li>Carnea roșie și organele (ficat, rinichi)</li>
<li>Fructele de mare și peștele gras</li>
<li>Băuturile alcoolice, în special berea</li>
<li>Băuturile îndulcite cu fructoză</li>
</ul>
<h3>Alimentele recomandate</h3>
<ul>
<li>Fructe și legume bogate în vitamina C</li>
<li>Cereale integrale</li>
<li>Produse lactate cu conținut scăzut de grăsimi</li>
<li>Apa în cantități suficiente</li>
</ul>
<h3>Modificări ale stilului de viață</h3>
<p>Pe lângă modificările alimentare, menținerea unei greutăți corporale sănătoase și exercițiile fizice regulate pot contribui la reducerea riscului de crize de gută.</p>`,
            publishDate: '2024-12-05',
            author: 'Dr. Elena Vasile',
            category: 'Boli reumatologice',
            imageUrl: '/images/gout.png',
            slug: 'guta-rolul-alimentatiei',
            excerpt: 'Guta este o formă de artrită care poate fi gestionată eficient prin modificări ale alimentației și stilului de viață.'
        },
        {
            id: '4',
            title: 'Alimentația în perioada de sarcină - ce trebuie să știi',
            content: `<p>Alimentația în timpul sarcinii are un impact major asupra sănătății mamei și a dezvoltării copilului. O dietă echilibrată și bogată în nutrienți esențiali este crucială pentru o sarcină sănătoasă.</p>
<h3>Nutrienți esențiali în sarcină</h3>
<ul>
<li>Acidul folic - previne defectele de tub neural</li>
<li>Fierul - previne anemia</li>
<li>Calciul - pentru dezvoltarea oaselor și dinților</li>
<li>Omega-3 - pentru dezvoltarea creierului fetal</li>
</ul>
<h3>Alimentele de evitat în sarcină</h3>
<ul>
<li>Peștele cu conținut ridicat de mercur</li>
<li>Carnea și ouăle crude sau insuficient gătite</li>
<li>Brânzeturile moi nepasteurizate</li>
<li>Alcoolul și excesul de cofeină</li>
</ul>
<h3>Creșterea în greutate în sarcină</h3>
<p>Creșterea optimă în greutate depinde de IMC-ul pre-sarcină și poate varia între 11-16 kg pentru femeile cu greutate normală.</p>
<h3>Alăptarea și alimentația</h3>
<p>În perioada alăptării, necesarul caloric și de lichide este crescut, iar calitatea alimentației mamei influențează direct compoziția laptelui matern.</p>`,
            publishDate: '2024-11-28',
            author: 'Dr. Ioana Moldovan',
            category: 'Nutriție maternă',
            imageUrl: '/images/header.jpg',
            slug: 'alimentatia-in-sarcina',
            excerpt: 'Alimentația în timpul sarcinii are un impact major asupra sănătății mamei și a dezvoltării copilului.'
        },
        {
            id: '5',
            title: 'Nutriția în sport - cum să optimizezi performanțele atletice',
            content: `<p>Nutriția sportivă este o ramură specializată care se concentrează pe optimizarea performanțelor atletice prin alimentație adecvată și hidratare corespunzătoare.</p>
<h3>Macronutrienții în sport</h3>
<ul>
<li>Carbohidrații - principala sursă de energie</li>
<li>Proteinele - pentru repararea și construirea mușchilor</li>
<li>Grăsimile - sursă de energie pe termen lung</li>
</ul>
<h3>Hidratarea în activitatea fizică</h3>
<p>Deshidratarea poate afecta semnificativ performanțele sportive. Este important să se mențină echilibrul hidric înainte, în timpul și după antrenament.</p>
<h3>Alimentația pre-antrenament</h3>
<p>Masa pre-antrenament ar trebui să fie bogată în carbohidrați, moderată în proteine și scăzută în grăsimi și fibre pentru a evita disconfortul gastric.</p>
<h3>Recuperarea post-exercițiu</h3>
<p>În primele 30-60 de minute după antrenament, este crucial să se consume carbohidrați și proteine pentru a optimiza recuperarea mușchilor.</p>
<h3>Suplimentele în sport</h3>
<p>Deși o dietă echilibrată poate acoperi majoritatea nevoilor nutriționale, anumite suplimente pot fi benefice pentru sportivii de performanță.</p>`,
            publishDate: '2024-11-20',
            author: 'Dr. Răzvan Dumitrescu',
            category: 'Nutriție sportivă',
            imageUrl: '/images/group2.jpg',
            slug: 'nutritia-in-sport',
            excerpt: 'Nutriția sportivă se concentrează pe optimizarea performanțelor atletice prin alimentație adecvată și hidratare corespunzătoare.'
        },
        {
            id: '6',
            title: 'Alimentația copilului - principii fundamentale pentru o creștere sănătoasă',
            content: `<p>Alimentația copilului în primii ani de viață stabilește bazele pentru o sănătate optimă pe termen lung. O nutriție adecvată susține creșterea, dezvoltarea cognitivă și formarea obiceiurilor alimentare sănătoase.</p>
<h3>Alăptarea exclusivă</h3>
<p>OMS recomandă alăptarea exclusivă în primele 6 luni de viață, urmată de introducerea treptată a alimentelor complementare, menținând alăptarea până la vârsta de 2 ani sau mai mult.</p>
<h3>Introducerea alimentelor complementare</h3>
<ul>
<li>Început la vârsta de 6 luni</li>
<li>Introducerea treptată a unor alimente variate</li>
<li>Evitarea mierii în primul an de viață</li>
<li>Atenție la alergenii alimentari comuni</li>
</ul>
<h3>Necesarul nutrițional al copiilor</h3>
<p>Copiii au nevoie de o densitate nutrițională mare din cauza ritmului rapid de creștere. Fierul, calciul, vitamina D și vitaminele din complexul B sunt deosebit de importante.</p>
<h3>Formarea obiceiurilor alimentare</h3>
<p>Copiii învață prin imitație și experiență directă. Expunerea repetată la alimente variate și exemplul părinților sunt cruciale pentru dezvoltarea preferințelor alimentare sănătoase.</p>`,
            publishDate: '2024-11-15',
            author: 'Dr. Carmen Popescu',
            category: 'Nutriție pediatrică',
            imageUrl: '/images/image1.png',
            slug: 'alimentatia-copilului',
            excerpt: 'Alimentația copilului în primii ani de viață stabilește bazele pentru o sănătate optimă pe termen lung.'
        }
    ];

    // Simulează un delay de network pentru experiență realistă
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getArticles(): Promise<Article[]> {
        await this.delay(800); // Simulează loading time
        // Sortează articolele după data publicării (cele mai noi primul)
        return [...this.mockArticles].sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    }

    async getArticleById(id: string): Promise<Article | null> {
        await this.delay(300);
        return this.mockArticles.find(article => article.id === id) || null;
    }

    async getArticleBySlug(slug: string): Promise<Article | null> {
        await this.delay(300);
        return this.mockArticles.find(article => article.slug === slug) || null;
    }

    async getArticlesByCategory(category: string): Promise<Article[]> {
        await this.delay(400);
        return this.mockArticles.filter(article => 
            article.category.toLowerCase() === category.toLowerCase()
        ).sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    }

    async searchArticles(query: string): Promise<Article[]> {
        await this.delay(500);
        const lowercaseQuery = query.toLowerCase();
        return this.mockArticles.filter(article =>
            article.title.toLowerCase().includes(lowercaseQuery) ||
            article.excerpt?.toLowerCase().includes(lowercaseQuery) ||
            article.author.toLowerCase().includes(lowercaseQuery) ||
            article.category.toLowerCase().includes(lowercaseQuery)
        ).sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    }

    async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
        await this.delay(400);
        // Returnează primele articole ca fiind featured
        return this.mockArticles.slice(0, limit).sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    }

    async getCategories(): Promise<string[]> {
        await this.delay(200);
        const categories = [...new Set(this.mockArticles.map(article => article.category))];
        return categories.sort();
    }
}

export const articleService = new ArticleService();
