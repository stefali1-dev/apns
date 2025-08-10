import React, { useState, useEffect } from 'react';
import { Member } from '@/lib/types/member';
import { MemberFormData } from '@/lib/hooks/useMembers';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Alert from '@/components/ui/Alert';
import ImageUpload from '@/components/admin/ImageUpload';

interface MemberFormProps {
  member?: Member | null;
  onSubmit: (data: MemberFormData) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
  validateMember: (data: MemberFormData) => string[];
  parseSpecializations: (specializationsString: string) => string[];
}

const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSubmit,
  onCancel,
  loading,
  validateMember,
  parseSpecializations,
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    position: '',
    secondaryPosition: '',
    imageUrl: '',
    description: '',
    specializations: [],
    education: '',
    email: '',
    phone: '',
    priority: 1,
    imagePriority: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [specializationsString, setSpecializationsString] = useState('');

  // Initialize form with member data if editing
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        position: member.position,
        secondaryPosition: member.secondaryPosition || '',
        imageUrl: member.imageUrl,
        description: member.description,
        specializations: member.specializations || [],
        education: member.education || '',
        email: member.email || '',
        phone: member.phone || '',
        priority: member.priority,
        imagePriority: member.imagePriority || false,
      });
      setSpecializationsString((member.specializations || []).join(', '));
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === 'priority') {
      setFormData(prev => ({
        ...prev,
        priority: parseInt(value) || 1,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSpecializationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSpecializationsString(value);
    
    // Parse specializations
    const specializations = parseSpecializations(value);
    setFormData(prev => ({
      ...prev,
      specializations,
    }));

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateMember(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    const success = await onSubmit(formData);
    if (success) {
      if (!member) {
        // Reset form for new member
        setFormData({
          name: '',
          position: '',
          secondaryPosition: '',
          imageUrl: '',
          description: '',
          specializations: [],
          education: '',
          email: '',
          phone: '',
          priority: 1,
          imagePriority: false,
        });
        setSpecializationsString('');
      }
    }
  };

  const commonPositions = [
    'Medic Primar Gastroenterolog',
    'Medic Specialist Gastroenterolog', 
    'Dietetician',
    'Nutriționist',
    'Asistent Medical',
    'Coordonator',
    'Psiholog',
    'Medic Generalist',
  ];

  const commonSpecializations = [
    'Gastroenterologie',
    'Hepatologie',
    'Endoscopie digestivă',
    'Nutriție clinică',
    'Dietetică',
    'Boli inflamatorii intestinale',
    'Oncologie digestivă',
    'Nutriție pediatrică',
    'Psihologie clinică',
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
          label="Nume complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Dr. Ioan Popescu"
        />

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-green-800 mb-1">
            Prioritate afișare <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">1 = primul, 2 = al doilea, etc.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-green-800 mb-1">
            Poziția principală <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={(e) => handleChange(e as any)}
            required
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          >
            <option value="">Selectează poziția</option>
            {commonPositions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Poziția secundară"
          name="secondaryPosition"
          value={formData.secondaryPosition}
          onChange={handleChange}
          placeholder="Coordinator echipă"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
        />

        <Input
          label="Telefon"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+40 123 456 789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-green-800 mb-2">
          Imagine membru <span className="text-red-500 ml-1">*</span>
        </label>
        <ImageUpload
          currentImage={formData.imageUrl}
          onImageChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
          loading={loading}
          bucket="members"
          filePrefix="member"
        />
      </div>

      <Textarea
        label="Descriere"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={4}
        placeholder="Descrierea detaliată a membrului echipei..."
      />

      <div>
        <label htmlFor="specializations" className="block text-sm font-medium text-green-800 mb-1">
          Specializări
        </label>
        <textarea
          id="specializations"
          name="specializations"
          value={specializationsString}
          onChange={handleSpecializationsChange}
          rows={3}
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          placeholder="Gastroenterologie, Hepatologie, Endoscopie digestivă"
        />
        <p className="text-xs text-gray-500 mt-1">
          Separați specializările cu virgulă. Sugestii: {commonSpecializations.slice(0, 3).join(', ')}
        </p>
      </div>

      <Textarea
        label="Educație"
        name="education"
        value={formData.education}
        onChange={handleChange}
        rows={3}
        placeholder="Studii universitare, specializări, cursuri..."
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
          {member ? 'Actualizează Membru' : 'Creează Membru'}
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;
