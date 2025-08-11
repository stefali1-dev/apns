import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { PlusIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface AddSubscriptionFormProps {
  onSubmit: (email: string) => Promise<boolean>;
  loading: boolean;
  validateEmail: (email: string) => string | null;
}

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({
  onSubmit,
  loading,
  validateEmail
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const result = await onSubmit(email);
      if (result) {
        setEmail('');
        setSuccess(true);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      // Error will be handled by the parent component
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <PlusIcon className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Adaugă abonat nou</h3>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-4"
        />
      )}

      {success && (
        <Alert
          type="success"
          message="Abonatul a fost adăugat cu succes!"
          onClose={() => setSuccess(false)}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresa de email
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="exemplu@email.com"
              required
              disabled={loading}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Adresa de email va fi adăugată ca abonat activ în newsletter.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={loading}
            disabled={loading || !email.trim()}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Adaugă abonat
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscriptionForm;
