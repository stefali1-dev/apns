import { EBook, Author } from "@/lib/types/ebook";
import { supabase } from "@/lib/supabaseClient";
import { subscribeUser } from "@/lib/services/subscriptionService";

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

    // Simulează un delay de network
    private async delay(ms: number = 300): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendEBookDownload(slug: string, email: string): Promise<{ success: boolean; error?: string }> {
        await this.delay(1000);

        // Validări simple
        if (!email || !email.includes('@')) {
            return { success: false, error: 'Adresa de email nu este validă' };
        }

        const ebook = await this.getEBookBySlug(slug);
        if (!ebook) {
            return { success: false, error: 'E-book-ul nu a fost găsit' };
        }

        if (!ebook.isFree) {
            return { success: false, error: 'Acest e-book nu este gratuit' };
        }

        try {
            // Ensure subscription recorded (idempotent) with ebook_download source
            try {
                await subscribeUser(email, 'ebook_download');
            } catch (e) {
                console.warn('Failed to record ebook_download subscription (continuing):', e);
            }
            // Pentru moment, folosim întotdeauna spring-restart.pdf
            const baseUrl = typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const ebookUrl = `${baseUrl}/ebooks/spring-restart.pdf`;

            // Creează corpul email-ului cu styling consistent
            const htmlContent = this.createEbookEmailTemplate(ebook, ebookUrl);

            // Trimite email-ul folosind API-ul existent
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toEmail: email,
                    subject: `E-book-ul tău gratuit: ${ebook.title}`,
                    htmlContent: htmlContent,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Eroare la trimiterea email-ului:', errorData);
                return { success: false, error: 'Eroare la trimiterea email-ului' };
            }

            console.log(`E-book "${ebook.title}" trimis cu succes către ${email}`);
            return { success: true };
        } catch (error) {
            console.error('Eroare la trimiterea email-ului:', error);
            return { success: false, error: 'A apărut o eroare la trimiterea email-ului' };
        }
    }

    private createEbookEmailTemplate(ebook: EBook, downloadUrl: string): string {
        const currentYear = new Date().getFullYear();

        return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>E-book-ul tău: ${ebook.title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; }
    table { border-collapse: collapse; width: 100%; }
    img { max-width: 100%; height: auto; display: block; }
    
    /* Layout styles */
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .email-wrapper { background-color: #f8f9fa; padding: 20px 0; }
    
    /* Header styles */
    .header { background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 1px solid #e9ecef; }
    .logo { font-size: 24px; font-weight: bold; color: #09a252; margin-bottom: 10px; }
    .header-subtitle { color: #6c757d; font-size: 14px; }
    
    /* Main content styles */
    .main-content { padding: 40px 40px 30px; background-color: #ffffff; }
    .hero-section { text-align: center; margin-bottom: 35px; }
    .hero-title { font-size: 28px; font-weight: bold; color: #2d3748; margin-bottom: 15px; line-height: 1.3; }
    .hero-subtitle { font-size: 16px; color: #4a5568; margin-bottom: 25px; }
    
    /* E-book card styles */
    .ebook-card { background-color: #f8fffe; border: 1px solid #e6f7f3; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center; }
    .ebook-title { font-size: 20px; font-weight: bold; color: #2d3748; margin-bottom: 10px; }
    .ebook-description { color: #4a5568; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }
    .ebook-meta { display: inline-block; background-color: #09a252; color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 25px; }
    
    /* Download button styles */
    .download-button { 
      display: inline-block; 
      background-color: #09a252; 
      color: #ffffff !important; 
      padding: 14px 32px; 
      text-decoration: none; 
      border-radius: 8px; 
      font-weight: 600; 
      font-size: 16px; 
      margin: 20px 0;
      transition: background-color 0.3s ease;
    }
    .download-button:hover { background-color: #078043; color: #ffffff !important; }
    .download-button:visited { color: #ffffff !important; }
    .download-button:link { color: #ffffff !important; }
    .download-button:active { color: #ffffff !important; }
    
    /* Benefits section */
    .benefits { margin: 30px 0; }
    .benefits-title { font-size: 18px; font-weight: bold; color: #2d3748; margin-bottom: 15px; text-align: center; }
    .benefit-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .benefit-icon { color: #09a252; margin-right: 10px; flex-shrink: 0; width: 16px; height: 16px; }
    .benefit-text { color: #4a5568; font-size: 14px; }
    
    /* Footer styles */
    .footer { background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef; }
    .footer-text { color: #6c757d; font-size: 12px; line-height: 1.5; margin-bottom: 15px; }
    .footer-links { margin-bottom: 15px; }
    .footer-link { color: #09a252; text-decoration: none; font-size: 12px; margin: 0 10px; }
    .footer-link:hover { text-decoration: underline; }
    .social-links { margin-top: 20px; }
    .social-link { color: #6c757d; text-decoration: none; margin: 0 8px; font-size: 12px; }
    
    /* Responsive design */
    @media only screen and (max-width: 480px) {
      .email-wrapper { padding: 10px; }
      .header, .main-content, .footer { padding: 20px; }
      .hero-title { font-size: 24px; }
      .download-button { padding: 12px 24px; font-size: 14px; }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .email-container { background-color: #ffffff; }
      .hero-title, .ebook-title, .benefits-title { color: #2d3748; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="logo">APNS</div>
        <div class="header-subtitle">Asociația pentru Promovarea Nutriției Sănătoase</div>
      </div>
      
      <!-- Main Content -->
      <div class="main-content">
        <!-- Hero Section -->
        <div class="hero-section">
          <h1 class="hero-title">E-book-ul tău este gata pentru descărcare!</h1>
          <p class="hero-subtitle">Mulțumim că ai ales să înveți alături de noi despre nutriția sănătoasă.</p>
        </div>
        
        <!-- E-book Card -->
        <div class="ebook-card">
          <h2 class="ebook-title">${ebook.title}</h2>
          <p class="ebook-description">${ebook.shortDescription}</p>
          
          <a href="${downloadUrl}" class="download-button" target="_blank" rel="noopener">
            Descarcă E-book-ul
          </a>

        </div>
        
        <!-- Call to Action -->
        <div style="text-align: center; padding: 20px; margin: 25px 0;">
          <h4 style="color: #2d3748; font-size: 16px; margin-bottom: 10px;">Ai întrebări despre nutriție?</h4>
          <p style="color: #4a5568; font-size: 14px; margin-bottom: 15px;">
            Echipa noastră de specialiști în nutriție este aici să te ajute. Contactează-ne!
          </p>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/contact" 
             style="color: #09a252; text-decoration: none; font-weight: 600; font-size: 14px;">
            Contactează specialiștii →
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p class="footer-text">
          Acest email a fost trimis deoarece ai solicitat descărcarea e-book-ului "${ebook.title}" de pe site-ul nostru.
        </p>
        
        <div class="footer-links">
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/confidentialitate" class="footer-link">Politica de confidențialitate</a>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/contact" class="footer-link">Contact</a>
          <a href="${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || 'https://apns.ro'}/ebooks" class="footer-link">Mai multe e-books</a>
        </div>
        
        <p class="footer-text">
          <strong>APNS - Asociația pentru Promovarea Nutriției Sănătoase</strong><br>
          © ${currentYear} APNS. Toate drepturile rezervate.
        </p>
        
        <p style="color: #9ca3af; font-size: 11px; margin-top: 15px;">
          Dacă nu dorești să mai primești emailuri de la noi, 
          <a href="#" style="color: #9ca3af;">dezabonează-te aici</a>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
    }
}

export const ebookService = new EBookService();
