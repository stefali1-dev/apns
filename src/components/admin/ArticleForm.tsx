import React, { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { ArticleFormData } from '@/lib/hooks/useArticles';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Alert from '@/components/ui/Alert';
import ImageUpload from '@/components/admin/ImageUpload';

interface ArticleFormProps {
  article?: Article | null;
  onSubmit: (data: ArticleFormData) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
  generateSlug: (title: string) => string;
  validateArticle: (data: ArticleFormData) => string[];
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
  onCancel,
  loading,
  generateSlug,
  validateArticle,
}) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    author: '',
    category: '',
    imageUrl: '',
    slug: '',
    excerpt: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [slugGenerated, setSlugGenerated] = useState(false);

  // Initialize form with article data if editing
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        author: article.author,
        category: article.category,
        imageUrl: article.imageUrl || '',
        slug: article.slug,
        excerpt: article.excerpt || '',
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug when title changes (only for new articles)
    if (name === 'title' && !article && !slugGenerated) {
      const slug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        slug,
      }));
    }

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugGenerated(true);
    handleChange(e);
  };

  const generateSlugFromTitle = () => {
    const slug = generateSlug(formData.title);
    setFormData(prev => ({
      ...prev,
      slug,
    }));
    setSlugGenerated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateArticle(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    const success = await onSubmit(formData);
    if (success) {
      if (!article) {
        // Reset form for new article
        setFormData({
          title: '',
          content: '',
          author: '',
          category: '',
          imageUrl: '',
          slug: '',
          excerpt: '',
        });
        setSlugGenerated(false);
      }
    }
  };

  const commonCategories = [
    'Boli metabolice',
    'Boli reumatologice', 
    'Nutriție maternă',
    'Nutriție sportivă',
    'Nutriție pediatrică',
    'Nutriție generală',
    'Educație nutrițională',
    'Sănătate publică',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <Alert
          type="error"
          message={`Vă rugăm să corectați următoarele erori: ${errors.join(', ')}`}
          onClose={() => setErrors([])}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Titlu"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Introduceți titlul articolului"
        />

        <div>
          <Input
            label="Slug (URL)"
            name="slug"
            value={formData.slug}
            onChange={handleSlugChange}
            required
            placeholder="url-friendly-slug"
          />
          <button
            type="button"
            onClick={generateSlugFromTitle}
            className="mt-1 text-sm text-[#09a252] hover:text-green-700 transition-colors"
          >
            Generează din titlu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Autor"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Numele autorului"
        />

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-green-800 mb-1">
            Categorie <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e as any)}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          >
            <option value="">Selectează categoria</option>
            {commonCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-green-800 mb-2">
          Imagine Articol
        </label>
        <ImageUpload
          currentImage={formData.imageUrl}
          onImageChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
          loading={loading}
        />
      </div>

      <Textarea
        label="Excerpt (Descriere scurtă)"
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        required
        rows={3}
        placeholder="O descriere scurtă a articolului pentru previzualizare"
      />

      <Textarea
        label="Conținut"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        rows={12}
        placeholder="Conținutul articolului (acceptă HTML)"
      />

      <div className="flex justify-end space-x-4">
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
          loading={loading}
          disabled={loading}
        >
          {article ? 'Actualizează Articol' : 'Creează Articol'}
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;
