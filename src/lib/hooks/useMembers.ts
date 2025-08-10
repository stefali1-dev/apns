import { useState, useEffect, useCallback } from 'react';
import { Member } from '@/lib/types/member';
import { membersService } from '@/lib/services/membersService';

export interface MemberFormData {
  name: string;
  position: string;
  secondaryPosition: string;
  imageUrl: string;
  description: string;
  specializations: string[];
  education: string;
  email: string;
  phone: string;
  priority: number;
  imagePriority: boolean;
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all members
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await membersService.getMembers();
      setMembers(data);
    } catch (err) {
      setError('Eroare la încărcarea membrilor');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create member
  const createMember = useCallback(async (memberData: MemberFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newMember = await membersService.createMember(memberData);
      
      if (newMember) {
        setMembers(prev => [newMember, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la crearea membrului');
      console.error('Error creating member:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update member
  const updateMember = useCallback(async (id: string, memberData: Partial<MemberFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedMember = await membersService.updateMember(id, memberData);
      
      if (updatedMember) {
        setMembers(prev => 
          prev.map(member => 
            member.id === id ? updatedMember : member
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la actualizarea membrului');
      console.error('Error updating member:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete member
  const deleteMember = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await membersService.deleteMember(id);
      
      if (success) {
        setMembers(prev => prev.filter(member => member.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Eroare la ștergerea membrului');
      console.error('Error deleting member:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single member
  const getMember = useCallback(async (id: string): Promise<Member | null> => {
    setLoading(true);
    setError(null);
    try {
      const member = await membersService.getMemberById(id);
      return member;
    } catch (err) {
      setError('Eroare la încărcarea membrului');
      console.error('Error getting member:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search members
  const searchMembers = useCallback(async (query: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await membersService.searchMembers(query);
      setMembers(data);
    } catch (err) {
      setError('Eroare la căutarea membrilor');
      console.error('Error searching members:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate specializations array from string
  const parseSpecializations = useCallback((specializationsString: string): string[] => {
    return specializationsString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, []);

  // Validate member data
  const validateMember = useCallback((data: MemberFormData): string[] => {
    const errors: string[] = [];
    
    if (!data.name.trim()) errors.push('Numele este obligatoriu');
    if (!data.position.trim()) errors.push('Poziția este obligatorie');
    if (!data.description.trim()) errors.push('Descrierea este obligatorie');
    if (!data.imageUrl.trim()) errors.push('Imaginea este obligatorie');
    
    // Validate email format if provided
    if (data.email && data.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push('Adresa de email nu este validă');
      }
    }
    
    // Validate phone format if provided
    if (data.phone && data.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(data.phone)) {
        errors.push('Numărul de telefon nu este valid');
      }
    }
    
    // Validate priority
    if (data.priority < 1) {
      errors.push('Prioritatea trebuie să fie cel puțin 1');
    }
    
    return errors;
  }, []);

  // Load members on mount
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
    getMember,
    searchMembers,
    parseSpecializations,
    validateMember,
    setError,
  };
};
