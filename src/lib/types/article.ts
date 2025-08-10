// types/Article.ts
export interface Article {
    id: string;
    title: string;
    content: string; // HTML content
    publishDate: string; // ISO date string
    author: string;
    category: string;
    imageUrl: string;
    slug: string;
    excerpt?: string; // Short description for preview
}