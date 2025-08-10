import React, { useState, useRef } from 'react';
import { storageService, StorageBucket } from '@/lib/services/storageService';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  loading?: boolean;
  bucket?: StorageBucket;
  filePrefix?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  loading = false,
  bucket = 'articles',
  filePrefix = 'article',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Tip de fișier invalid. Acceptăm doar JPG, PNG și WebP.';
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'Fișierul este prea mare. Dimensiunea maximă este 5MB.';
    }

    return null;
  };

  const validateImageDimensions = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const minWidth = 400;
        const minHeight = 300;
        
        if (img.width < minWidth || img.height < minHeight) {
          resolve(`Imaginea este prea mică. Dimensiunea minimă este ${minWidth}x${minHeight}px.`);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve('Nu s-a putut încărca imaginea pentru validare.');
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    setError(null);
    
    // Basic validation
    const basicError = validateImage(file);
    if (basicError) {
      setError(basicError);
      return;
    }

    // Dimension validation
    const dimensionError = await validateImageDimensions(file);
    if (dimensionError) {
      setError(dimensionError);
      return;
    }

    setUploading(true);
    
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${filePrefix}_${timestamp}.${extension}`;
      
      // Upload to Supabase storage
      const uploadResult = await storageService.uploadImage(bucket, file, filename);
      
      if (uploadResult.success && uploadResult.url) {
        onImageChange(uploadResult.url);
        setError(null);
      } else {
        setError(uploadResult.error || 'A apărut o eroare la încărcarea imaginii.');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('A apărut o eroare neașteptată la încărcarea imaginii.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleRemoveImage = async () => {
    if (currentImage) {
      try {
        // Extract filename from URL for deletion
        const urlParts = currentImage.split('/');
        const filename = urlParts[urlParts.length - 1];
        
        const success = await storageService.deleteImage(bucket, filename);
        if (success) {
          onImageChange('');
          setError(null);
        } else {
          setError('A apărut o eroare la ștergerea imaginii.');
        }
      } catch (err) {
        console.error('Error deleting image:', err);
        setError('A apărut o eroare la ștergerea imaginii.');
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Current Image Display */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Imagine articol"
            className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={loading || uploading}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            title="Șterge imaginea"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragOver
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={loading || uploading}
        />

        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {uploading ? (
            <p className="text-green-600">Se încarcă imaginea...</p>
          ) : (
            <>
              <p className="text-gray-600">
                <span className="font-medium text-green-600">Dă click pentru a selecta</span> sau
                trage și lasă imaginea aici
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, WebP până la 5MB
              </p>
              <p className="text-xs text-gray-400">
                Dimensiune minimă: 400x300px
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {!currentImage && (
        <Button
          type="button"
          onClick={openFileDialog}
          loading={uploading}
          disabled={loading || uploading}
          variant="secondary"
          className="w-full"
        >
          {uploading ? 'Se încarcă...' : 'Selectează Imagine'}
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
