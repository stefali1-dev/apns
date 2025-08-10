export interface Author {
  id: number;
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
}

export interface EBook {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  toc: string; // Table of Contents HTML
  category: string;
  authors: Author[];
  coverImage?: string;
  isFree: boolean;
  price?: number;
  pageCount: number;
  publishedDate: string;
}