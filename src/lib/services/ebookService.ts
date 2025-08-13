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
            fileUrl: dbEBook.file_url,
            isFree: dbEBook.is_free,
            price: dbEBook.price,
            pageCount: dbEBook.page_count,
            publishedDate: dbEBook.published_date,
            active: dbEBook.active !== undefined ? dbEBook.active : true
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
        if (ebook.fileUrl !== undefined) dbEBook.file_url = ebook.fileUrl;
        if (ebook.isFree !== undefined) dbEBook.is_free = ebook.isFree;
        if (ebook.price !== undefined) dbEBook.price = ebook.price;
        if (ebook.pageCount !== undefined) dbEBook.page_count = ebook.pageCount;
        if (ebook.publishedDate !== undefined) dbEBook.published_date = ebook.publishedDate;
        if (ebook.active !== undefined) dbEBook.active = ebook.active;
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
                .eq('active', true)
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

    async getAllEBooks(): Promise<EBook[]> {
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
                console.error('Error fetching all ebooks:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToEBook(item));
        } catch (error) {
            console.error('Error in getAllEBooks:', error);
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
                .eq('active', true)
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

    async getEBookBySlugAdmin(slug: string): Promise<EBook | null> {
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
                console.error('Error fetching ebook by slug (admin):', error);
                return null;
            }

            return data ? this.mapDatabaseToEBook(data) : null;
        } catch (error) {
            console.error('Error in getEBookBySlugAdmin:', error);
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
            const dbEbook = this.mapEBookToDatabase(ebook);
            const { data: ebookData, error: ebookError } = await supabase
                .from(this.tableName)
                .insert([dbEbook])
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
            // First, get the current ebook to check for old files that need cleanup
            const currentEbook = await this.getEBookById(id);
            if (!currentEbook) {
                console.error('Ebook not found for update');
                return null;
            }

            const dbUpdates = this.mapEBookToDatabase(updates);
            const { data, error } = await supabase
                .from(this.tableName)
                .update(dbUpdates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating ebook:', error);
                return null;
            }

            // Cleanup old files if they're being replaced
            try {
                const { storageService } = await import('@/lib/services/storageService');
                
                // Cleanup old image if it's being replaced
                if (updates.imageUrl && currentEbook.imageUrl && updates.imageUrl !== currentEbook.imageUrl) {
                    await storageService.deleteImage('ebooks', currentEbook.imageUrl);
                }
                
                // Cleanup old PDF if it's being replaced
                if (updates.fileUrl && currentEbook.fileUrl && updates.fileUrl !== currentEbook.fileUrl) {
                    await storageService.deleteImage('ebook-files', currentEbook.fileUrl);
                }
            } catch (cleanupError) {
                console.warn('Failed to cleanup old files during update:', cleanupError);
                // Continue with update even if cleanup fails
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
            // First, get the ebook to check for files that need cleanup
            const ebook = await this.getEBookById(id);
            if (!ebook) {
                console.error('Ebook not found for deletion');
                return false;
            }

            // Delete files from storage
            try {
                const { storageService } = await import('@/lib/services/storageService');
                
                // Delete image if exists
                if (ebook.imageUrl) {
                    await storageService.deleteImage('ebooks', ebook.imageUrl);
                }
                
                // Delete PDF file if exists
                if (ebook.fileUrl) {
                    await storageService.deleteImage('ebook-files', ebook.fileUrl);
                }
            } catch (cleanupError) {
                console.warn('Failed to cleanup files during deletion:', cleanupError);
                // Continue with deletion even if cleanup fails
            }

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

    // Update just the file URL for an ebook
    async updateEBookFile(id: number, fileUrl: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .update({ file_url: fileUrl })
                .eq('id', id);

            if (error) {
                console.error('Error updating ebook file:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateEBookFile:', error);
            return false;
        }
    }

    // CRUD methods for authors
    async createAuthor(author: Omit<Author, 'id'>): Promise<Author | null> {
        try {
            const dbAuthor = this.mapAuthorToDatabase(author);
            const { data, error } = await supabase
                .from(this.authorsTableName)
                .insert([dbAuthor])
                .select()
                .single();

            if (error) {
                console.error('Error creating author:', error);
                return null;
            }

            return data ? this.mapDatabaseToAuthor(data) : null;
        } catch (error) {
            console.error('Error in createAuthor:', error);
            return null;
        }
    }

    async updateAuthor(id: number, updates: Partial<Author>): Promise<Author | null> {
        try {
            const dbUpdates = this.mapAuthorToDatabase(updates);
            const { data, error } = await supabase
                .from(this.authorsTableName)
                .update(dbUpdates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating author:', error);
                return null;
            }

            return data ? this.mapDatabaseToAuthor(data) : null;
        } catch (error) {
            console.error('Error in updateAuthor:', error);
            return null;
        }
    }

    async deleteAuthor(id: number): Promise<boolean> {
        try {
            // First, get the author to check if they have an image
            const author = await this.getAuthorById(id);
            if (!author) {
                console.error('Author not found for deletion');
                return false;
            }

            // If the author has an image, delete it from storage first
            if (author.imageUrl) {
                try {
                    const { storageService } = await import('@/lib/services/storageService');
                    await storageService.deleteImage('authors', author.imageUrl);
                } catch (imageError) {
                    console.warn('Failed to delete author image from storage:', imageError);
                    // Continue with author deletion even if image deletion fails
                }
            }

            // Delete the author from the database
            const { error } = await supabase
                .from(this.authorsTableName)
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting author:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in deleteAuthor:', error);
            return false;
        }
    }
}

export const ebookService = new EBookService();
