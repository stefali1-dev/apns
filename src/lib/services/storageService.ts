import { supabase } from '@/lib/supabaseClient';

export type StorageBucket = 'articles' | 'members' | 'ebooks' | 'authors' | 'ebook-files';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class StorageService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  /**
   * Upload an image to a specific bucket
   */
  async uploadImage(
    bucket: StorageBucket,
    file: File,
    fileName?: string
  ): Promise<UploadResult> {
    try {
      // Generate unique filename if not provided
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
      }

      const url = this.getPublicUrl(bucket, data.path);
      return { success: true, url };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: 'Failed to upload image' };
    }
  }

  /**
   * Delete an image from storage
   */
  async deleteImage(bucket: StorageBucket, filePath: string): Promise<boolean> {
    try {
      // Extract filename from URL if a full URL is provided
      const fileName = filePath.includes('/') ? filePath.split('/').pop() || filePath : filePath;
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }

  /**
   * Get public URL for a stored image
   */
  getPublicUrl(bucket: StorageBucket, filePath: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /**
   * Replace an existing image with a new one
   */
  async replaceImage(
    bucket: StorageBucket,
    oldImageUrl: string,
    newFile: File,
    newFileName?: string
  ): Promise<UploadResult> {
    try {
      // Upload new image first
      const uploadResult = await this.uploadImage(bucket, newFile, newFileName);
      
      if (!uploadResult.success) {
        return uploadResult;
      }

      // Delete old image (only if it's from our storage, not external URLs)
      if (oldImageUrl.includes(this.baseUrl || '')) {
        const oldFileName = this.extractFileNameFromUrl(oldImageUrl);
        if (oldFileName) {
          await this.deleteImage(bucket, oldFileName);
        }
      }

      return uploadResult;
    } catch (error) {
      console.error('Replace image error:', error);
      return { success: false, error: 'Failed to replace image' };
    }
  }

  /**
   * Extract filename from a Supabase storage URL
   */
  private extractFileNameFromUrl(url: string): string | null {
    try {
      // Handle both old format URLs and new storage URLs
      if (url.includes('/storage/v1/object/public/')) {
        const parts = url.split('/storage/v1/object/public/')[1];
        const pathParts = parts.split('/');
        return pathParts.slice(1).join('/'); // Remove bucket name, keep the rest
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * List all images in a bucket
   */
  async listImages(bucket: StorageBucket, folder?: string): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

      if (error) {
        console.error('List images error:', error);
        return [];
      }

      return data?.map(file => this.getPublicUrl(bucket, folder ? `${folder}/${file.name}` : file.name)) || [];
    } catch (error) {
      console.error('List images error:', error);
      return [];
    }
  }

  /**
   * Validate image file
   */
  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please select a valid image file (JPEG, PNG, or WebP)' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'Image size must be less than 5MB' };
    }

    return { valid: true };
  }

  /**
   * Upload a PDF file to ebook-files bucket
   */
  async uploadPDF(
    file: File,
    fileName?: string
  ): Promise<UploadResult> {
    try {
      // Validate PDF file
      const validation = this.validatePDFFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename if not provided
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from('ebook-files')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('PDF upload error:', error);
        return { success: false, error: error.message };
      }

      const url = this.getPublicUrl('ebook-files', data.path);
      return { success: true, url };
    } catch (error) {
      console.error('PDF upload error:', error);
      return { success: false, error: 'Failed to upload PDF file' };
    }
  }

  /**
   * Validate PDF file
   */
  validatePDFFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['application/pdf'];

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please select a valid PDF file' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'PDF file size must be less than 50MB' };
    }

    return { valid: true };
  }

  /**
   * Replace an existing PDF file with a new one
   */
  async replacePDF(
    oldFileUrl: string,
    newFile: File,
    newFileName?: string
  ): Promise<UploadResult> {
    try {
      // Upload new PDF first
      const uploadResult = await this.uploadPDF(newFile, newFileName);
      
      if (!uploadResult.success) {
        return uploadResult;
      }

      // Delete old PDF (only if it's from our storage, not external URLs)
      if (oldFileUrl.includes(this.baseUrl || '')) {
        const oldFileName = this.extractFileNameFromUrl(oldFileUrl);
        if (oldFileName) {
          await this.deleteImage('ebook-files', oldFileName);
        }
      }

      return uploadResult;
    } catch (error) {
      console.error('Replace PDF error:', error);
      return { success: false, error: 'Failed to replace PDF file' };
    }
  }
}

export const storageService = new StorageService();
