import { EBook, Author } from "@/lib/types/ebook";
import { supabase } from "@/lib/supabaseClient";

// services/ebookService.ts
export class EBookService {
    private readonly tableName = 'ebooks';
    private readonly authorsTableName = 'authors';

    // Map database columns (snake_case) to EBook interface (camelCase)
    private mapDatabaseToEBook(dbEBook: any): EBook {
        return {
            id: dbEBook.id,
            title: dbEBook.title,
            slug: dbEBook.slug,
            shortDescription: dbEBook.short_description,
            fullDescription: dbEBook.full_description,
            toc: dbEBook.toc,
            category: dbEBook.category,
            authors: dbEBook.ebook_authors?.map((ea: any) => this.mapDatabaseToAuthor(ea.authors)) || [],
            imageUrl: dbEBook.image_url,
            isFree: dbEBook.is_free,
            price: dbEBook.price,
            pageCount: dbEBook.page_count,
            publishedDate: dbEBook.published_date
        };
    }

    // Map database columns (snake_case) to Author interface (camelCase)
    private mapDatabaseToAuthor(dbAuthor: any): Author {
        return {
            id: dbAuthor.id,
            name: dbAuthor.name,
            title: dbAuthor.title,
            bio: dbAuthor.bio,
            imageUrl: dbAuthor.image_url
        };
    }

    // Map EBook interface (camelCase) to database columns (snake_case)
    private mapEBookToDatabase(ebook: Partial<EBook>): any {
        const dbEBook: any = {};
        if (ebook.id !== undefined) dbEBook.id = ebook.id;
        if (ebook.title !== undefined) dbEBook.title = ebook.title;
        if (ebook.slug !== undefined) dbEBook.slug = ebook.slug;
        if (ebook.shortDescription !== undefined) dbEBook.short_description = ebook.shortDescription;
        if (ebook.fullDescription !== undefined) dbEBook.full_description = ebook.fullDescription;
        if (ebook.toc !== undefined) dbEBook.toc = ebook.toc;
        if (ebook.category !== undefined) dbEBook.category = ebook.category;
        if (ebook.imageUrl !== undefined) dbEBook.image_url = ebook.imageUrl;
        if (ebook.isFree !== undefined) dbEBook.is_free = ebook.isFree;
        if (ebook.price !== undefined) dbEBook.price = ebook.price;
        if (ebook.pageCount !== undefined) dbEBook.page_count = ebook.pageCount;
        if (ebook.publishedDate !== undefined) dbEBook.published_date = ebook.publishedDate;
        return dbEBook;
    }

    // Map Author interface (camelCase) to database columns (snake_case)
    private mapAuthorToDatabase(author: Partial<Author>): any {
        const dbAuthor: any = {};
        if (author.id !== undefined) dbAuthor.id = author.id;
        if (author.name !== undefined) dbAuthor.name = author.name;
        if (author.title !== undefined) dbAuthor.title = author.title;
        if (author.bio !== undefined) dbAuthor.bio = author.bio;
        if (author.imageUrl !== undefined) dbAuthor.image_url = author.imageUrl;
        return dbAuthor;
    }

    async getEBooks(): Promise<EBook[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .order('published_date', { ascending: false });

            if (error) {
                console.error('Error fetching ebooks:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToEBook(item));
        } catch (error) {
            console.error('Error in getEBooks:', error);
            return [];
        }
    }

    async getEBookById(id: number): Promise<EBook | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching ebook by id:', error);
                return null;
            }

            return data ? this.mapDatabaseToEBook(data) : null;
        } catch (error) {
            console.error('Error in getEBookById:', error);
            return null;
        }
    }

    async getEBookBySlug(slug: string): Promise<EBook | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching ebook by slug:', error);
                return null;
            }

            return data ? this.mapDatabaseToEBook(data) : null;
        } catch (error) {
            console.error('Error in getEBookBySlug:', error);
            return null;
        }
    }

    async getFreeEBooks(): Promise<EBook[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .eq('is_free', true)
                .order('published_date', { ascending: false });

            if (error) {
                console.error('Error fetching free ebooks:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToEBook(item));
        } catch (error) {
            console.error('Error in getFreeEBooks:', error);
            return [];
        }
    }

    async getEBooksByCategory(category: string): Promise<EBook[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .eq('category', category)
                .order('published_date', { ascending: false });

            if (error) {
                console.error('Error fetching ebooks by category:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToEBook(item));
        } catch (error) {
            console.error('Error in getEBooksByCategory:', error);
            return [];
        }
    }

    async searchEBooks(query: string): Promise<EBook[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    ebook_authors!inner(
                        authors(*)
                    )
                `)
                .or(`title.ilike.%${query}%,short_description.ilike.%${query}%,category.ilike.%${query}%`)
                .order('published_date', { ascending: false });

            if (error) {
                console.error('Error searching ebooks:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToEBook(item));
        } catch (error) {
            console.error('Error in searchEBooks:', error);
            return [];
        }
    }

    // Author-related methods
    async getAuthors(): Promise<Author[]> {
        try {
            const { data, error } = await supabase
                .from(this.authorsTableName)
                .select('*')
                .order('name');

            if (error) {
                console.error('Error fetching authors:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToAuthor(item));
        } catch (error) {
            console.error('Error in getAuthors:', error);
            return [];
        }
    }

    async getAuthorById(id: number): Promise<Author | null> {
        try {
            const { data, error } = await supabase
                .from(this.authorsTableName)
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching author by id:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in getAuthorById:', error);
            return null;
        }
    }

    // Admin methods for managing ebooks
    async createEBook(ebook: Omit<EBook, 'id' | 'authors'>, authorIds: number[]): Promise<EBook | null> {
        try {
            const { data: ebookData, error: ebookError } = await supabase
                .from(this.tableName)
                .insert([ebook])
                .select()
                .single();

            if (ebookError) {
                console.error('Error creating ebook:', ebookError);
                return null;
            }

            // Create ebook-author relationships
            if (authorIds.length > 0) {
                const relationships = authorIds.map(authorId => ({
                    ebook_id: ebookData.id,
                    author_id: authorId
                }));

                const { error: relationError } = await supabase
                    .from('ebook_authors')
                    .insert(relationships);

                if (relationError) {
                    console.error('Error creating ebook-author relationships:', relationError);
                }
            }

            // Fetch the complete ebook with authors
            return await this.getEBookById(ebookData.id);
        } catch (error) {
            console.error('Error in createEBook:', error);
            return null;
        }
    }

    async updateEBook(id: number, updates: Partial<Omit<EBook, 'id' | 'authors'>>, authorIds?: number[]): Promise<EBook | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating ebook:', error);
                return null;
            }

            // Update ebook-author relationships if provided
            if (authorIds) {
                // Delete existing relationships
                await supabase
                    .from('ebook_authors')
                    .delete()
                    .eq('ebook_id', id);

                // Create new relationships
                if (authorIds.length > 0) {
                    const relationships = authorIds.map(authorId => ({
                        ebook_id: id,
                        author_id: authorId
                    }));

                    const { error: relationError } = await supabase
                        .from('ebook_authors')
                        .insert(relationships);

                    if (relationError) {
                        console.error('Error updating ebook-author relationships:', relationError);
                    }
                }
            }

            // Fetch the complete ebook with authors
            return await this.getEBookById(id);
        } catch (error) {
            console.error('Error in updateEBook:', error);
            return null;
        }
    }

    async deleteEBook(id: number): Promise<boolean> {
        try {
            // Delete ebook-author relationships first
            await supabase
                .from('ebook_authors')
                .delete()
                .eq('ebook_id', id);

            // Delete the ebook
            const { error } = await supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting ebook:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in deleteEBook:', error);
            return false;
        }
    }

    // Update just the image URL for an ebook
    async updateEBookImage(id: number, imageUrl: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .update({ image_url: imageUrl })
                .eq('id', id);

            if (error) {
                console.error('Error updating ebook image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateEBookImage:', error);
            return false;
        }
    }

    // Update just the image URL for an author
    async updateAuthorImage(id: number, imageUrl: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.authorsTableName)
                .update({ image_url: imageUrl })
                .eq('id', id);

            if (error) {
                console.error('Error updating author image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateAuthorImage:', error);
            return false;
        }
    }
}

export const ebookService = new EBookService();
