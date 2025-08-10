import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import { useMembers } from '@/lib/hooks/useMembers';
import MemberList from '@/components/admin/MemberList';
import MemberForm from '@/components/admin/MemberForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Member } from '@/lib/types/member';
import { storageService } from '@/lib/services/storageService';

const MembersAdmin: React.FC = () => {
  const router = useRouter();
  const {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
    searchMembers,
    parseSpecializations,
    validateMember,
  } = useMembers();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Member | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (actionError) {
      const timer = setTimeout(() => setActionError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionError]);

  const handleCreateMember = async (formData: any) => {
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await createMember(formData);
      if (success) {
        setShowCreateModal(false);
        setSuccessMessage('Membrul a fost creat cu succes!');
        return true;
      } else {
        setActionError('A apărut o eroare la crearea membrului');
        return false;
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateMember = async (formData: any) => {
    if (!editingMember) return false;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await updateMember(editingMember.id, formData);
      if (success) {
        setEditingMember(null);
        setSuccessMessage('Membrul a fost actualizat cu succes!');
        return true;
      } else {
        setActionError('A apărut o eroare la actualizarea membrului');
        return false;
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!deleteConfirm) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteMember(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        setSuccessMessage('Membrul a fost șters cu succes!');
      } else {
        setActionError('A apărut o eroare la ștergerea membrului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
  };

  const handleDeleteClick = (member: Member) => {
    setDeleteConfirm(member);
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  const handleCancelCreate = async () => {
    // Clean up temporary image if it exists
    if (tempImageUrl) {
      try {
        const urlParts = tempImageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        await storageService.deleteImage('members', filename);
      } catch (err) {
        console.error('Error cleaning up temporary image:', err);
      }
      setTempImageUrl(null);
    }
    setShowCreateModal(false);
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await searchMembers(query);
    } else {
      await fetchMembers();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Management Membri
            </h1>
            <p className="text-green-600 mt-1">
              Administrează membrii echipei APNS
            </p>
          </div>
          
          <Button
            onClick={() => setShowCreateModal(true)}
            size="lg"
          >
            + Membru Nou
          </Button>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        {actionError && (
          <Alert
            type="error"
            message={actionError}
            onClose={() => setActionError(null)}
          />
        )}

        {error && (
          <Alert
            type="error"
            message={`Eroare la încărcarea membrilor: ${error}`}
          />
        )}

        {/* Members List */}
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
          <MemberList
            members={members}
            loading={loading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onSearch={handleSearch}
          />
        </div>

        {/* Create Member Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={handleCancelCreate}
          title="Creează Membru Nou"
          size="xl"
        >
          <MemberForm
            onSubmit={handleCreateMember}
            onCancel={handleCancelCreate}
            loading={actionLoading}
            validateMember={validateMember}
            parseSpecializations={parseSpecializations}
          />
        </Modal>

        {/* Edit Member Modal */}
        <Modal
          isOpen={!!editingMember}
          onClose={handleCancelEdit}
          title="Editează Membru"
          size="xl"
        >
          {editingMember && (
            <MemberForm
              member={editingMember}
              onSubmit={handleUpdateMember}
              onCancel={handleCancelEdit}
              loading={actionLoading}
              validateMember={validateMember}
              parseSpecializations={parseSpecializations}
            />
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirmă Ștergerea"
          size="md"
        >
          {deleteConfirm && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Ești sigur că vrei să ștergi membrul{' '}
                <span className="font-semibold">"{deleteConfirm.name}"</span>?
              </p>
              <p className="text-sm text-red-600">
                Această acțiune nu poate fi anulată.
              </p>
              
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteConfirm(null)}
                  disabled={actionLoading}
                >
                  Anulează
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteMember}
                  loading={actionLoading}
                  disabled={actionLoading}
                >
                  Șterge Membru
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default MembersAdmin;
