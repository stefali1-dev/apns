// types/Member.ts
export interface Member {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    description: string;
    specializations?: string[];
    education?: string;
    experience?: string;
    email?: string;
    phone?: string;
}

// services/membersService.ts
export class MembersService {
    private mockMembers: Member[] = [
        {
            id: '1',
            name: 'Dr. Maria Popescu',
            position: 'Președinte & Medic Nutriționist',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Dr. Maria Popescu este fondatoarea și președinta Asociației pentru Promovarea Nutriției Sănătoase. Cu peste 15 ani de experiență în domeniul nutriției clinice, ea a dedicat cariera sa educării publicului despre importanța unei alimentații echilibrate. Maria a lucrat în cadrul mai multor spitale de top din România și a contribuit la dezvoltarea mai multor ghiduri naționale de nutriție.',
            specializations: ['Nutriție clinică', 'Diabet zaharat', 'Nutriție pediatrică', 'Obezitate'],
            education: 'Doctorat în Medicină - Universitatea de Medicină și Farmacie Carol Davila, București. Specializare în Nutriție Clinică - Spitalul Clinic de Nutriție și Boli Metabolice.',
            experience: '15+ ani în nutriție clinică, fost șef de secție la Spitalul Clinic de Nutriție București.',
            email: 'maria.popescu@apns.ro',
            phone: '0727 590 656'
        },
        {
            id: '3',
            name: 'Dr. Alexandru Gheorghe',
            position: 'Medic Specialist Endocrinologie',
            imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Dr. Alexandru Gheorghe aduce în echipa APNS expertiza sa în endocrinologie și managementul diabetului zaharat. Cu o abordare holistică a sănătății, el integrează tratamentul medical cu sfaturile nutriționale pentru a oferi pacienților o îngrijire completă. Alexandru este un vorbitor frecvent la conferințe medicale și un susținător activ al prevenirii bolilor metabolice prin nutriție.',
            specializations: ['Endocrinologie', 'Diabet zaharat', 'Sindrom metabolic', 'Tiroidă'],
            education: 'Doctor în Medicină - Universitatea de Medicină și Farmacie Carol Davila. Specializare în Endocrinologie la Institutul Nacional de Endocrinologie C.I. Parhon.',
            experience: '12 ani de practică în endocrinologie, consultant la multiple clinici private și de stat.',
            email: 'alexandru.gheorghe@apns.ro'
        },
        {
            id: '6',
            name: 'Lic. Elena Vasilescu',
            position: 'Specialist Nutriție Pediatrică',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Elena Vasilescu se dedică nutriției pentru copii și adolescenți, un domeniu care necesită abordări specifice și sensibilitate deosebită. Ea lucrează cu părinții pentru a crea planuri alimentare care să susțină creșterea și dezvoltarea sănătoasă a copiilor, având în vedere și preferințele acestora. Elena este specializată în gestionarea problemelor alimentare la copii și în educația nutrițională adaptată vârstei.',
            specializations: ['Nutriție pediatrică', 'Diversificare', 'Alergie alimentare la copii', 'Educație nutrițională pentru familie'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie Iuliu Hațieganu, Cluj-Napoca. Specializare în Nutriție Pediatrică.',
            experience: '7 ani de experiență în nutriție pediatrică, colaborări cu clinici pediatrice și grădinițe.',
            email: 'elena.vasilescu@apns.ro'
        },
        {
            id: '8',
            name: 'Lic. Elena Vasilescu',
            position: 'Specialist Nutriție Pediatrică',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Elena Vasilescu se dedică nutriției pentru copii și adolescenți, un domeniu care necesită abordări specifice și sensibilitate deosebită. Ea lucrează cu părinții pentru a crea planuri alimentare care să susțină creșterea și dezvoltarea sănătoasă a copiilor, având în vedere și preferințele acestora. Elena este specializată în gestionarea problemelor alimentare la copii și în educația nutrițională adaptată vârstei.',
            specializations: ['Nutriție pediatrică', 'Diversificare', 'Alergie alimentare la copii', 'Educație nutrițională pentru familie'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie Iuliu Hațieganu, Cluj-Napoca. Specializare în Nutriție Pediatrică.',
            experience: '7 ani de experiență în nutriție pediatrică, colaborări cu clinici pediatrice și grădinițe.',
            email: 'elena.vasilescu@apns.ro'
        },
        {
            id: '9',
            name: 'Lic. Elena Vasilescu',
            position: 'Specialist Nutriție Pediatrică',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Elena Vasilescu se dedică nutriției pentru copii și adolescenți, un domeniu care necesită abordări specifice și sensibilitate deosebită. Ea lucrează cu părinții pentru a crea planuri alimentare care să susțină creșterea și dezvoltarea sănătoasă a copiilor, având în vedere și preferințele acestora. Elena este specializată în gestionarea problemelor alimentare la copii și în educația nutrițională adaptată vârstei.',
            specializations: ['Nutriție pediatrică', 'Diversificare', 'Alergie alimentare la copii', 'Educație nutrițională pentru familie'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie Iuliu Hațieganu, Cluj-Napoca. Specializare în Nutriție Pediatrică.',
            experience: '7 ani de experiență în nutriție pediatrică, colaborări cu clinici pediatrice și grădinițe.',
            email: 'elena.vasilescu@apns.ro'
        },
        {
            id: '89',
            name: 'Lic. Elena Vasilescu',
            position: 'Specialist Nutriție Pediatrică',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            description: 'Elena Vasilescu se dedică nutriției pentru copii și adolescenți, un domeniu care necesită abordări specifice și sensibilitate deosebită. Ea lucrează cu părinții pentru a crea planuri alimentare care să susțină creșterea și dezvoltarea sănătoasă a copiilor, având în vedere și preferințele acestora. Elena este specializată în gestionarea problemelor alimentare la copii și în educația nutrițională adaptată vârstei.',
            specializations: ['Nutriție pediatrică', 'Diversificare', 'Alergie alimentare la copii', 'Educație nutrițională pentru familie'],
            education: 'Licență în Nutriție și Dietetică - Universitatea de Medicină și Farmacie Iuliu Hațieganu, Cluj-Napoca. Specializare în Nutriție Pediatrică.',
            experience: '7 ani de experiență în nutriție pediatrică, colaborări cu clinici pediatrice și grădinițe.',
            email: 'elena.vasilescu@apns.ro'
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