export interface Author {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
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
  imageUrl: string;
  isFree: boolean;
  price?: number;
  pageCount: number;
  publishedDate: string;
}