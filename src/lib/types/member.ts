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
    priority: number; // Display order priority (1 = first, 2 = second, etc.)
    // Image optimization metadata
    imageWidth?: number;
    imageHeight?: number;
    imagePriority?: boolean;
}