// types/Member.ts
export interface Member {
    id: string;
    name: string;
    position: string;
    secondaryPosition?: string; // Poziția secundară (opțională)
    imageUrl: string;
    description: string;
    specializations?: string[];
    education?: string;
    email?: string;
    phone?: string;
    // Image optimization metadata
    imageWidth?: number;
    imageHeight?: number;
    imagePriority?: boolean;
}

// services/membersService.ts
export class MembersService {
    private mockMembers: Member[] = [
        {
            id: '1',
            name: 'Drd. Corina Bogdănici',
            position: 'Președinte APNS',
            secondaryPosition: 'Dietetician autorizat',
            imageUrl: '/images/volunteers/1.jpeg',
            description: 'Drd. Corina Bogdănici este președinta și fondatoarea Asociației pentru Promovarea Nutriției Sănătoase. Cu o pasiune profundă pentru educația nutrițională și promovarea unui stil de viață sănătos, Corina și-a dedicat cariera dezvoltării programelor de conștientizare despre importanța unei alimentații echilibrate. Ea coordonează echipa de specialiști și supervizează toate activitățile asociației, având o viziune clară asupra viitorului nutriției în România.',
            specializations: ['Dietetică clinică', 'Educație nutrițională', 'Management în sănătate', 'Promovarea sănătății publice'],
            education: 'Doctorand în Nutriție și Dietetică - Universitatea de Medicină și Farmacie „Grigore T. Popa", Iași. Licență în Nutriție și Dietetică.',
            email: 'corina.bogdanici@apns.ro',
            phone: '0727 590 656',
            imageWidth: 400,
            imageHeight: 400,
            imagePriority: true
        },
        {
            id: '2',
            name: 'Alexandra Dobârcianu',
            position: 'Dietetician autorizat',
            imageUrl: '/images/volunteers/2.jpeg',
            description: 'Alexandra Dobârcianu este un dietetician experimentat, specializat în nutriția terapeutică și managementul greutății. Cu o abordare personalizată pentru fiecare pacient, Alexandra dezvoltă planuri alimentare adaptate nevoilor individuale și condițiilor medicale specifice. Ea este recunoscută pentru capacitatea sa de a motiva pacienții și de a-i ajuta să adopte schimbări sustenabile în stilul de viață.',
            specializations: ['Nutriție terapeutică', 'Management al greutății', 'Planificare alimentară personalizată', 'Sindrom metabolic'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie „Grigore T. Popa", Iași. Certificare în Dietetică Clinică.',
            email: 'alexandra.dobarcianu@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        },
        {
            id: '3',
            name: 'Gianina Mihalache',
            position: 'Dietetician autorizat',
            secondaryPosition: 'Asistent medical',
            imageUrl: '/images/volunteers/3.jpeg',
            description: 'Gianina Mihalache se specializează în nutriția sportivă și optimizarea performanței prin alimentație. Cu experiență în lucrul cu atleți de performanță și persoane active, ea dezvoltă strategii nutriționale care susțin antrenamentul și recuperarea. Gianina este pasionată de cercetarea în domeniul nutriției sportive și aplică cele mai recente descoperiri științifice în practica sa clinică.',
            specializations: ['Nutriție sportivă', 'Optimizarea performanței', 'Planificare alimentară pentru atleți', 'Suplimentare sportivă'],
            education: 'Licență în Nutriție și Dietetică - Universitatea Ștefan cel Mare, Suceava. Specializare în Nutriție Sportivă.',
            email: 'gianina.mihalache@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        },
        {
            id: '4',
            name: 'Andra Palade',
            position: 'Dietetician autorizat',
            imageUrl: '/images/volunteers/4.jpeg',
            description: 'Andra Palade este specializată în nutriția pediatrică și promovarea obiceiurilor alimentare sănătoase la copii și adolescenți. Cu o sensibilitate deosebită pentru nevoile familiilor, ea lucrează îndeaproape cu părinții pentru a crea medii alimentare pozitive și de susținere. Andra este expertă în gestionarea problemelor alimentare specifice vârstei de dezvoltare și în educația nutrițională adaptată copiilor.',
            specializations: ['Nutriție pediatrică', 'Alimentația copilului', 'Educație nutrițională pentru familie', 'Prevenirea obezității infantile'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie Grigore T. Popa, Iași. Specializare în Nutriție Pediatrică.',
            email: 'andra.palade@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        },
        {
            id: '5',
            name: 'Mădălina Tărăbuță',
            position: 'Licențiată în nutriție și dietetică',
            imageUrl: '/images/volunteers/5.jpeg',
            description: 'Mădălina Tărăbuță este o tânără specialistă în nutriție, pasionată de educația nutrițională și promovarea stilului de viață sănătos în comunitate. Ea se concentrează pe dezvoltarea programelor educaționale pentru tineri și pe utilizarea tehnologiei moderne pentru a face informația nutrițională mai accesibilă. Mădălina aduce o perspectivă fresh și inovatoare în echipa APNS.',
            specializations: ['Educație nutrițională', 'Nutriție pentru tineri', 'Tehnologie în nutriție', 'Comunicare în sănătate'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie „Grigore T. Popa", Iași.',
            email: 'madalina.tarabuta@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        },
        {
            id: '6',
            name: 'Bianca Dascălu',
            position: 'Antrenor fitness',
            secondaryPosition: 'Licențiată în nutriție și dietetică',
            imageUrl: '/images/volunteers/6.jpeg',
            description: 'Bianca Dascălu combină expertiza în fitness cu principiile unei alimentații sănătoase pentru a oferi o abordare holistică asupra sănătății. Ca antrenor fitness certificat, ea înțelege importanța sincronizării dintre exercițiul fizic și nutriție pentru atingerea obiectivelor de sănătate. Bianca dezvoltă programe integrate care includ atât antrenament, cât și consiliere nutrițională de bază.',
            specializations: ['Fitness și nutriție', 'Antrenament funcțional', 'Motivație și coaching', 'Stilul de viață activ'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie „Grigore T. Popa", Iași. Certificare Antrenor Fitness - Federația Română de Fitness. Cursuri de specializare în Nutriția Sportivă.',
            email: 'bianca.dascalu@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        },
        {
            id: '7',
            name: 'Eni Victoria',
            position: 'Licențiată în nutriție și dietetică',
            imageUrl: '/images/volunteers/7.jpeg',
            description: 'Eni Victoria este specializată în nutriția clinică și managementul condițiilor cronice prin intervenții nutriționale. Cu o abordare bazată pe evidențe științifice, ea lucrează cu pacienții pentru a dezvolta strategii alimentare care să susțină tratamentul medical și să îmbunătățească calitatea vieții. Eni este dedicată cercetării și implementării celor mai noi terapii nutriționale.',
            specializations: ['Nutriție clinică', 'Boli cronice', 'Terapie nutrițională', 'Cercetare în nutriție'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie „Grigore T. Popa", Iași. Cursuri de perfecționare în Nutriție Clinică.',
            email: 'eni.victoria@apns.ro',
            imageWidth: 400,
            imageHeight: 400
        }
    ];

    // Simulează un delay de network pentru experiență realistă
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getMembers(): Promise<Member[]> {
        await this.delay(800); // Simulează loading time
        return [...this.mockMembers];
    }

    async getMemberById(id: string): Promise<Member | null> {
        await this.delay(300);
        return this.mockMembers.find(member => member.id === id) || null;
    }

    async getMembersByPosition(position: string): Promise<Member[]> {
        await this.delay(500);
        return this.mockMembers.filter(member =>
            member.position.toLowerCase().includes(position.toLowerCase())
        );
    }

    async searchMembers(query: string): Promise<Member[]> {
        await this.delay(400);
        const lowercaseQuery = query.toLowerCase();
        return this.mockMembers.filter(member =>
            member.name.toLowerCase().includes(lowercaseQuery) ||
            member.position.toLowerCase().includes(lowercaseQuery) ||
            member.specializations?.some(spec =>
                spec.toLowerCase().includes(lowercaseQuery)
            )
        );
    }
}

export const membersService = new MembersService();