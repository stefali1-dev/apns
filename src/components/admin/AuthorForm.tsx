import React, { useState, useEffect } from 'react';
import { Author } from '@/lib/types/ebook';
import { AuthorFormData } from '@/lib/hooks/useEbooks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Alert from '@/components/ui/Alert';
import ImageUpload from '@/components/admin/ImageUpload';

interface AuthorFormProps {
  author?: Author | null;
  onSubmit: (formData: AuthorFormData) => Promise<boolean>;
  onCancel: () => void;
  loading?: boolean;
  validateAuthor: (data: AuthorFormData) => string[];
}

const AuthorForm: React.FC<AuthorFormProps> = ({
  author,
  onSubmit,
  onCancel,
  loading = false,
  validateAuthor,
}) => {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: '',
    title: '',
    bio: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Initialize form with author data if editing
  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        title: author.title,
        bio: author.bio,
        imageUrl: author.imageUrl || '',
      });
    }
  }, [author]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = validateAuthor(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const success = await onSubmit(formData);
      if (success) {
        // Reset form if creating new author
        if (!author) {
          setFormData({
            name: '',
            title: '',
            bio: '',
            imageUrl: '',
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <Alert 
          type="error" 
          message={errors.join('. ')}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Nume complet"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Numele autorului..."
            className="w-full"
          />

          <Input
            label="Titlu/Calificare"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Dr., Prof., Nutriționist, etc..."
            className="w-full"
          />

          <Textarea
            label="Biografia"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Biografia detaliată a autorului..."
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fotografia autorului
            </label>
            <ImageUpload
              currentImage={formData.imageUrl}
              onImageChange={handleImageUpload}
              bucket="authors"
              filePrefix={`author-${Date.now()}`}
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
          {author ? 'Actualizează autorul' : 'Creează autorul'}
        </Button>
      </div>
    </form>
  );
};

export default AuthorForm;
