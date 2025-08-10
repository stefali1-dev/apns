import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { articleService } from '@/lib/services/articleService';

export interface ArticleFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  slug: string;
  excerpt: string;
}

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getArticles();
      setArticles(data);
    } catch (err) {
      setError('Eroare la încărcarea articolelor');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create article
  const createArticle = useCallback(async (articleData: ArticleFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newArticle = await articleService.createArticle({
        ...articleData,
        publishDate: new Date().toISOString(),
      });
      
      if (newArticle) {
        setArticles(prev => [newArticle, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la crearea articolului');
      console.error('Error creating article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update article
  const updateArticle = useCallback(async (id: string, articleData: Partial<ArticleFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedArticle = await articleService.updateArticle(id, articleData);
      
      if (updatedArticle) {
        setArticles(prev => 
          prev.map(article => 
            article.id === id ? updatedArticle : article
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la actualizarea articolului');
      console.error('Error updating article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete article
  const deleteArticle = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await articleService.deleteArticle(id);
      
      if (success) {
        setArticles(prev => prev.filter(article => article.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la ștergerea articolului');
      console.error('Error deleting article:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single article
  const getArticle = useCallback(async (id: string): Promise<Article | null> => {
    setLoading(true);
    setError(null);
    try {
      const article = await articleService.getArticleById(id);
      return article;
    } catch (err) {
      setError('Eroare la încărcarea articolului');
      console.error('Error getting article:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search articles
  const searchArticles = useCallback(async (query: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.searchArticles(query);
      setArticles(data);
    } catch (err) {
      setError('Eroare la căutarea articolelor');
      console.error('Error searching articles:', err);
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

  // Validate article data
  const validateArticle = useCallback((data: ArticleFormData): string[] => {
    const errors: string[] = [];
    
    if (!data.title.trim()) errors.push('Titlul este obligatoriu');
    if (!data.content.trim()) errors.push('Conținutul este obligatoriu');
    if (!data.author.trim()) errors.push('Autorul este obligatoriu');
    if (!data.category.trim()) errors.push('Categoria este obligatorie');
    if (!data.slug.trim()) errors.push('Slug-ul este obligatoriu');
    if (!data.excerpt.trim()) errors.push('Excerptul este obligatoriu');
    
    // Check for invalid characters in slug
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push('Slug-ul poate conține doar litere mici, cifre și liniuțe');
    }
    
    return errors;
  }, []);

  // Load articles on mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    searchArticles,
    generateSlug,
    validateArticle,
    setError,
  };
};
