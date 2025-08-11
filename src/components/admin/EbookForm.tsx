import React, { useState, useEffect } from 'react';
import { EBook, Author } from '@/lib/types/ebook';
import { EBookFormData, AuthorFormData } from '@/lib/hooks/useEbooks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import AuthorForm from '@/components/admin/AuthorForm';

interface EbookFormProps {
  ebook?: EBook | null;
  authors: Author[];
  onSubmit: (formData: EBookFormData) => Promise<boolean>;
  onCancel: () => void;
  onCreateAuthor: (authorData: AuthorFormData) => Promise<Author | null>;
  loading?: boolean;
  generateSlug: (title: string) => string;
  validateEbook: (data: EBookFormData) => string[];
  validateAuthor: (data: AuthorFormData) => string[];
}

// File upload component for PDFs
interface FileUploadProps {
  label: string;
  currentFileUrl?: string;
  onFileUpload: (url: string) => void;
  bucket: string;
  filePrefix: string;
  acceptedFileTypes: string[];
  maxFileSize: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  currentFileUrl,
  onFileUpload,
  bucket,
  filePrefix,
  acceptedFileTypes,
  maxFileSize,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFileTypes.includes(file.type)) {
      return 'Tip de fișier invalid. Acceptăm doar PDF.';
    }
    if (file.size > maxFileSize) {
      return `Fișierul este prea mare. Mărimea maximă este ${Math.round(maxFileSize / (1024 * 1024))}MB.`;
    }
    return null;
  };

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { storageService } = await import('@/lib/services/storageService');
      const fileName = `${filePrefix}-${Date.now()}.pdf`;
      const result = await storageService.uploadPDF(file, fileName);

      if (result.success && result.url) {
        onFileUpload(result.url);
      } else {
        setError(result.error || 'Eroare la încărcarea fișierului');
      }
    } catch (err) {
      setError('Eroare neașteptată la încărcarea fișierului');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {currentFileUrl ? (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">PDF încărcat cu succes</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-sm text-purple-600 hover:text-purple-500"
              disabled={uploading}
            >
              Schimbă fișierul
            </button>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {uploading ? 'Se încarcă...' : 'Clic pentru a încărca PDF-ul'}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
              disabled={uploading}
            >
              {uploading ? 'Se încarcă...' : 'Selectează fișier'}
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
    </div>
  );
};

const EbookForm: React.FC<EbookFormProps> = ({
  ebook,
  authors,
  onSubmit,
  onCancel,
  onCreateAuthor,
  loading = false,
  generateSlug,
  validateEbook,
  validateAuthor,
}) => {
  const [formData, setFormData] = useState<EBookFormData>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    toc: '',
    category: '',
    authorIds: [],
    imageUrl: '',
    fileUrl: '',
    isFree: true,
    price: undefined,
    pageCount: 0,
    publishedDate: new Date().toISOString().split('T')[0],
    slug: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [authorCreationError, setAuthorCreationError] = useState<string | null>(null);
  const [slugGenerated, setSlugGenerated] = useState(false);
  const [showCreateAuthor, setShowCreateAuthor] = useState(false);
  const [createAuthorLoading, setCreateAuthorLoading] = useState(false);

  // Initialize form with ebook data if editing
  useEffect(() => {
    if (ebook) {
      setFormData({
        title: ebook.title,
        shortDescription: ebook.shortDescription,
        fullDescription: ebook.fullDescription,
        toc: ebook.toc,
        category: ebook.category,
        authorIds: ebook.authors.map(a => a.id),
        imageUrl: ebook.imageUrl || '',
        fileUrl: ebook.fileUrl || '',
        isFree: ebook.isFree,
        price: ebook.price,
        pageCount: ebook.pageCount,
        publishedDate: ebook.publishedDate.split('T')[0],
        slug: ebook.slug,
      });
      setSlugGenerated(true);
    }
  }, [ebook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'pageCount') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else if (name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || undefined
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Auto-generate slug from title
    if (name === 'title' && !slugGenerated) {
      const newSlug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        slug: newSlug
      }));
    }
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleAuthorSelection = (authorId: number) => {
    setFormData(prev => ({
      ...prev,
      authorIds: prev.authorIds.includes(authorId)
        ? prev.authorIds.filter(id => id !== authorId)
        : [...prev.authorIds, authorId]
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const handleFileUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      fileUrl: url
    }));
  };

  const handleCreateAuthorSubmit = async (authorData: AuthorFormData) => {
    setCreateAuthorLoading(true);
    setAuthorCreationError(null);
    try {
      const newAuthor = await onCreateAuthor(authorData);
      if (newAuthor) {
        setFormData(prev => ({
          ...prev,
          authorIds: [...prev.authorIds, newAuthor.id]
        }));
        setShowCreateAuthor(false);
        return true;
      } else {
        setAuthorCreationError('A apărut o eroare la crearea autorului');
        return false;
      }
    } catch (err) {
      setAuthorCreationError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setCreateAuthorLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = validateEbook(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const success = await onSubmit(formData);
      if (success) {
        // Reset form if creating new ebook
        if (!ebook) {
          setFormData({
            title: '',
            shortDescription: '',
            fullDescription: '',
            toc: '',
            category: '',
            authorIds: [],
            imageUrl: '',
            fileUrl: '',
            isFree: true,
            price: undefined,
            pageCount: 0,
            publishedDate: new Date().toISOString().split('T')[0],
            slug: '',
          });
          setSlugGenerated(false);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.length > 0 && (
          <Alert 
            type="error" 
            message={errors.join('. ')}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <Input
              label="Titlu"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Titlul ebook-ului..."
            />

            <Input
              label="Slug URL"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => {
                handleChange(e);
                setSlugGenerated(true);
              }}
              required
              placeholder="slug-url-ebook"
            />
            <p className="text-xs text-gray-500 mt-1">URL-ul ebook-ului (doar litere mici, cifre și liniuțe)</p>

            <Input
              label="Categorie"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Nutriție, Dietetică, Sănătate..."
            />

            <Textarea
              label="Descriere scurtă"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Descrierea scurtă care va apărea în listă..."
            />

            <Textarea
              label="Descriere completă"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Descrierea detaliată a ebook-ului..."
            />

            <Textarea
              label="Cuprins (HTML)"
              name="toc"
              value={formData.toc}
              onChange={handleChange}
              required
              rows={6}
              placeholder="<ul><li>Capitolul 1: ...</li><li>Capitolul 2: ...</li></ul>"
            />
            <p className="text-xs text-gray-500 mt-1">Folosește HTML pentru formatarea cuprinsului</p>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Authors Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autori
              </label>
              <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                {authors.map(author => (
                  <label key={author.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={formData.authorIds.includes(author.id)}
                      onChange={() => handleAuthorSelection(author.id)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">{author.name} - {author.title}</span>
                  </label>
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowCreateAuthor(true);
                  setAuthorCreationError(null);
                }}
                className="mt-2"
              >
                + Adaugă autor nou
              </Button>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coperta ebook-ului
              </label>
              <ImageUpload
                currentImage={formData.imageUrl}
                onImageChange={handleImageUpload}
                bucket="ebooks"
                filePrefix={`ebook-${Date.now()}`}
              />
            </div>

            {/* File Upload */}
            <FileUpload
              label="Fișier PDF"
              currentFileUrl={formData.fileUrl}
              onFileUpload={handleFileUpload}
              bucket="ebook-files"
              filePrefix={`ebook-${Date.now()}`}
              acceptedFileTypes={['application/pdf']}
              maxFileSize={50 * 1024 * 1024} // 50MB
            />

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                  Ebook gratuit
                </label>
              </div>

              {!formData.isFree && (
                <Input
                  label="Preț (RON)"
                  name="price"
                  type="text"
                  value={formData.price?.toString() || ''}
                  onChange={handleChange}
                  placeholder="29.99"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Număr pagini"
                name="pageCount"
                type="text"
                value={formData.pageCount.toString()}
                onChange={handleChange}
                required
                placeholder="100"
              />

              <Input
                label="Data publicării"
                name="publishedDate"
                type="date"
                value={formData.publishedDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Anulează
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {ebook ? 'Actualizează ebook-ul' : 'Creează ebook-ul'}
          </Button>
        </div>
      </form>

      {/* Create Author Modal */}
      <Modal
        isOpen={showCreateAuthor}
        onClose={() => {
          setShowCreateAuthor(false);
          setAuthorCreationError(null);
        }}
        title="Adaugă autor nou"
        size="lg"
      >
        {authorCreationError && (
          <div className="mb-4">
            <Alert
              type="error"
              message={authorCreationError}
              onClose={() => setAuthorCreationError(null)}
            />
          </div>
        )}
        <AuthorForm
          onSubmit={handleCreateAuthorSubmit}
          onCancel={() => {
            setShowCreateAuthor(false);
            setAuthorCreationError(null);
          }}
          loading={createAuthorLoading}
          validateAuthor={validateAuthor}
        />
      </Modal>
    </>
  );
};

export default EbookForm;
