import { Article } from "@/lib/types/article";
import { supabase } from "@/lib/supabaseClient";
import { storageService } from "@/lib/services/storageService";

// services/articleService.ts
export class ArticleService {
    private readonly tableName = 'articles';

    // Map database columns (snake_case) to Article interface (camelCase)
    private mapDatabaseToArticle(dbArticle: any): Article {
        return {
            id: dbArticle.id,
            title: dbArticle.title,
            content: dbArticle.content,
            publishDate: dbArticle.publish_date,
            author: dbArticle.author,
            category: dbArticle.category,
            imageUrl: dbArticle.image_url,
            slug: dbArticle.slug,
            excerpt: dbArticle.excerpt
        };
    }

    // Map Article interface (camelCase) to database columns (snake_case)
    private mapArticleToDatabase(article: Partial<Article>): any {
        const dbArticle: any = {};
        if (article.id !== undefined) dbArticle.id = article.id;
        if (article.title !== undefined) dbArticle.title = article.title;
        if (article.content !== undefined) dbArticle.content = article.content;
        if (article.publishDate !== undefined) dbArticle.publish_date = article.publishDate;
        if (article.author !== undefined) dbArticle.author = article.author;
        if (article.category !== undefined) dbArticle.category = article.category;
        if (article.imageUrl !== undefined) dbArticle.image_url = article.imageUrl;
        if (article.slug !== undefined) dbArticle.slug = article.slug;
        if (article.excerpt !== undefined) dbArticle.excerpt = article.excerpt;
        return dbArticle;
    }

    async getArticles(): Promise<Article[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .order('publish_date', { ascending: false });

            if (error) {
                console.error('Error fetching articles:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToArticle(item));
        } catch (error) {
            console.error('Error in getArticles:', error);
            return [];
        }
    }

    async getArticleById(id: string): Promise<Article | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching article by id:', error);
                return null;
            }

            return data ? this.mapDatabaseToArticle(data) : null;
        } catch (error) {
            console.error('Error in getArticleById:', error);
            return null;
        }
    }

    async getArticleBySlug(slug: string): Promise<Article | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching article by slug:', error);
                return null;
            }

            return data ? this.mapDatabaseToArticle(data) : null;
        } catch (error) {
            console.error('Error in getArticleBySlug:', error);
            return null;
        }
    }

    async getArticlesByCategory(category: string): Promise<Article[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('category', category)
                .order('publish_date', { ascending: false });

            if (error) {
                console.error('Error fetching articles by category:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToArticle(item));
        } catch (error) {
            console.error('Error in getArticlesByCategory:', error);
            return [];
        }
    }

    async searchArticles(query: string): Promise<Article[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,author.ilike.%${query}%,category.ilike.%${query}%`)
                .order('publish_date', { ascending: false });

            if (error) {
                console.error('Error searching articles:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToArticle(item));
        } catch (error) {
            console.error('Error in searchArticles:', error);
            return [];
        }
    }

    async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .order('publish_date', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching featured articles:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToArticle(item));
        } catch (error) {
            console.error('Error in getFeaturedArticles:', error);
            return [];
        }
    }

    async getCategories(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('category')
                .order('category');

            if (error) {
                console.error('Error fetching categories:', error);
                return [];
            }

            const categories = [...new Set(data?.map(item => item.category) || [])];
            return categories.sort();
        } catch (error) {
            console.error('Error in getCategories:', error);
            return [];
        }
    }

    // Admin methods for managing articles
    async createArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
        try {
            const dbArticle = this.mapArticleToDatabase(article);
            const { data, error } = await supabase
                .from(this.tableName)
                .insert([dbArticle])
                .select()
                .single();

            if (error) {
                console.error('Error creating article:', error);
                return null;
            }

            return data ? this.mapDatabaseToArticle(data) : null;
        } catch (error) {
            console.error('Error in createArticle:', error);
            return null;
        }
    }

    async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
        try {
            const dbUpdates = this.mapArticleToDatabase(updates);
            
            const { data, error } = await supabase
                .from(this.tableName)
                .update(dbUpdates)
                .eq('id', id)
                .select();

            if (error) {
                console.error('Error updating article:', error);
                return null;
            }
            
            if (!data || data.length === 0) {
                console.error('No article found with ID:', id);
                return null;
            }

            return this.mapDatabaseToArticle(data[0]);
        } catch (error) {
            console.error('Error in updateArticle:', error);
            return null;
        }
    }

    async deleteArticle(id: string): Promise<boolean> {
        try {
            // First, get the article to check if it has an image
            const article = await this.getArticleById(id);
            
            // Delete the article from database
            const { error } = await supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting article:', error);
                return false;
            }

            // If article had an image, delete it from storage
            if (article && article.imageUrl) {
                try {
                    const urlParts = article.imageUrl.split('/');
                    const filename = urlParts[urlParts.length - 1];
                    
                    await storageService.deleteImage('articles', filename);
                } catch (imageError) {
                    console.error('Error deleting article image:', imageError);
                    // Don't fail the entire operation if image deletion fails
                }
            }

            return true;
        } catch (error) {
            console.error('Error in deleteArticle:', error);
            return false;
        }
    }

    // Update just the image URL for an article
    async updateArticleImage(id: string, imageUrl: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .update({ image_url: imageUrl })
                .eq('id', id);

            if (error) {
                console.error('Error updating article image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateArticleImage:', error);
            return false;
        }
    }
}

export const articleService = new ArticleService();
