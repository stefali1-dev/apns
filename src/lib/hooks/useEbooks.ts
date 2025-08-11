import { useState, useEffect, useCallback } from 'react';
import { EBook, Author } from '@/lib/types/ebook';
import { ebookService } from '@/lib/services/ebookService';

export interface EBookFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  toc: string;
  category: string;
  authorIds: number[];
  imageUrl: string;
  fileUrl: string;
  isFree: boolean;
  price?: number;
  pageCount: number;
  publishedDate: string;
  slug: string;
}

export interface AuthorFormData {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export const useEbooks = () => {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all ebooks
  const fetchEbooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ebookService.getEBooks();
      setEbooks(data);
    } catch (err) {
      setError('Eroare la încărcarea ebook-urilor');
      console.error('Error fetching ebooks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all authors
  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ebookService.getAuthors();
      setAuthors(data);
    } catch (err) {
      setError('Eroare la încărcarea autorilor');
      console.error('Error fetching authors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create ebook
  const createEbook = useCallback(async (ebookData: EBookFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { authorIds, ...ebookInfo } = ebookData;
      const newEbook = await ebookService.createEBook({
        ...ebookInfo,
        publishedDate: ebookData.publishedDate || new Date().toISOString(),
      }, authorIds);
      
      if (newEbook) {
        setEbooks(prev => [newEbook, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la crearea ebook-ului');
      console.error('Error creating ebook:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update ebook
  const updateEbook = useCallback(async (id: number, ebookData: Partial<EBookFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { authorIds, ...ebookInfo } = ebookData;
      const updatedEbook = await ebookService.updateEBook(id, ebookInfo, authorIds);
      
      if (updatedEbook) {
        setEbooks(prev => 
          prev.map(ebook => 
            ebook.id === id ? updatedEbook : ebook
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la actualizarea ebook-ului');
      console.error('Error updating ebook:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete ebook
  const deleteEbook = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await ebookService.deleteEBook(id);
      
      if (success) {
        setEbooks(prev => prev.filter(ebook => ebook.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la ștergerea ebook-ului');
      console.error('Error deleting ebook:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create author
  const createAuthor = useCallback(async (authorData: AuthorFormData): Promise<Author | null> => {
    setLoading(true);
    setError(null);
    try {
      const newAuthor = await ebookService.createAuthor(authorData);
      
      if (newAuthor) {
        setAuthors(prev => [newAuthor, ...prev]);
        return newAuthor;
      }
      return null;
    } catch (err) {
      setError('Eroare la crearea autorului');
      console.error('Error creating author:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update author
  const updateAuthor = useCallback(async (id: number, authorData: Partial<AuthorFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedAuthor = await ebookService.updateAuthor(id, authorData);
      
      if (updatedAuthor) {
        setAuthors(prev => 
          prev.map(author => 
            author.id === id ? updatedAuthor : author
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la actualizarea autorului');
      console.error('Error updating author:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete author
  const deleteAuthor = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await ebookService.deleteAuthor(id);
      
      if (success) {
        setAuthors(prev => prev.filter(author => author.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la ștergerea autorului');
      console.error('Error deleting author:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search ebooks
  const searchEbooks = useCallback(async (query: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await ebookService.searchEBooks(query);
      setEbooks(data);
    } catch (err) {
      setError('Eroare la căutarea ebook-urilor');
      console.error('Error searching ebooks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate slug from title
  const generateSlug = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }, []);

  // Validate ebook data
  const validateEbook = useCallback((data: EBookFormData): string[] => {
    const errors: string[] = [];
    
    if (!data.title.trim()) errors.push('Titlul este obligatoriu');
    if (!data.shortDescription.trim()) errors.push('Descrierea scurtă este obligatorie');
    if (!data.fullDescription.trim()) errors.push('Descrierea completă este obligatorie');
    if (!data.category.trim()) errors.push('Categoria este obligatorie');
    if (!data.slug.trim()) errors.push('Slug-ul este obligatoriu');
    if (data.authorIds.length === 0) errors.push('Cel puțin un autor este obligatoriu');
    if (data.pageCount <= 0) errors.push('Numărul de pagini trebuie să fie pozitiv');
    if (!data.isFree && (!data.price || data.price <= 0)) {
      errors.push('Prețul este obligatoriu pentru ebook-urile cu plată');
    }
    
    // Check for invalid characters in slug
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push('Slug-ul poate conține doar litere mici, cifre și liniuțe');
    }
    
    return errors;
  }, []);

  // Validate author data
  const validateAuthor = useCallback((data: AuthorFormData): string[] => {
    const errors: string[] = [];
    
    if (!data.name.trim()) errors.push('Numele este obligatoriu');
    if (!data.title.trim()) errors.push('Titlul este obligatoriu');
    if (!data.bio.trim()) errors.push('Biografia este obligatorie');
    
    return errors;
  }, []);

  // Load ebooks and authors on mount
  useEffect(() => {
    fetchEbooks();
    fetchAuthors();
  }, [fetchEbooks, fetchAuthors]);

  return {
    ebooks,
    authors,
    loading,
    error,
    fetchEbooks,
    fetchAuthors,
    createEbook,
    updateEbook,
    deleteEbook,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    searchEbooks,
    generateSlug,
    validateEbook,
    validateAuthor,
    setError,
  };
};
