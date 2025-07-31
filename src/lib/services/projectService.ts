// types/Project.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

// services/projectService.ts
export class ProjectService {
    private mockProjects: Project[] = [
        {
            id: '1',
            title: 'Sănătate înainte de toate',
            description: 'În cadrul proiectelor organizate de APNS („Nutriție de la mic la mare" și „Sănătate înainte de toate") au fost implementate activități cu caracter educațional și preventiv, desfășurate în unități de învățământ din ciclul primar și gimnazial, cu impact direct asupra populației pediatrice și cu impact indirect asupra cadrelor didactice și părinților copiilor incluși în proiecte.',
            imageUrl: '/images/group.jpeg'
        },
        {
            id: '2',
            title: 'Educație nutrițională în școli și campanii de promovare a unui stil de viață sănătos',
            description: 'În cadrul demersurilor educaționale desfășurate de asociație, promovarea alimentației echilibrate în rândul copiilor și adolescenților reprezintă o direcție prioritară. Astfel, în parteneriat cu unități de învățământ preuniversitar din municipiul Iași, am implementat o serie de activități interactive cu rol educativ.',
            imageUrl: '/images/header.jpg'
        },
        {
            id: '3',
            title: 'Campanii de promovare online și offline',
            description: 'Conștientizarea unui stil de viață sănătos începe cu accesul la informație corectă. De aceea, APNS derulează constant campanii de educație nutrițională în mediul online și offline, pentru a ajunge cât mai aproape de oameni – în școli, dar și în casele lor.',
            imageUrl: '/images/ebook.png'
        }
    ];

    // Simulează un delay de network pentru experiență realistă
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getProjects(): Promise<Project[]> {
        await this.delay(600); // Simulează loading time
        return [...this.mockProjects];
    }

    async getProjectById(id: string): Promise<Project | null> {
        await this.delay(300);
        return this.mockProjects.find(project => project.id === id) || null;
    }

    async searchProjects(query: string): Promise<Project[]> {
        await this.delay(400);
        const lowercaseQuery = query.toLowerCase();
        return this.mockProjects.filter(project =>
            project.title.toLowerCase().includes(lowercaseQuery) ||
            project.description.toLowerCase().includes(lowercaseQuery)
        );
    }
}

export const projectService = new ProjectService();
