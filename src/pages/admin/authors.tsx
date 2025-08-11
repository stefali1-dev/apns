import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import { useEbooks } from '@/lib/hooks/useEbooks';
import AuthorList from '@/components/admin/AuthorList';
import AuthorForm from '@/components/admin/AuthorForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Author } from '@/lib/types/ebook';

const AuthorsAdmin: React.FC = () => {
  const router = useRouter();
  const {
    authors,
    loading,
    error,
    fetchAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    validateAuthor,
  } = useEbooks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Author | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  // Load authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleCreateAuthor = async (formData: any) => {
    setActionLoading(true);
    setModalError(null);
    
    try {
      const newAuthor = await createAuthor(formData);
      if (newAuthor) {
        setShowCreateModal(false);
        setSuccessMessage('Autorul a fost creat cu succes!');
        return true;
      } else {
        setModalError('A apărut o eroare la crearea autorului');
        return false;
      }
    } catch (err) {
      setModalError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateAuthor = async (formData: any) => {
    if (!editingAuthor) return false;
    
    setActionLoading(true);
    setModalError(null);
    
    try {
      const success = await updateAuthor(editingAuthor.id, formData);
      if (success) {
        setEditingAuthor(null);
        setSuccessMessage('Autorul a fost actualizat cu succes!');
        return true;
      } else {
        setModalError('A apărut o eroare la actualizarea autorului');
        return false;
      }
    } catch (err) {
      setModalError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAuthor = async () => {
    if (!deleteConfirm) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteAuthor(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        setSuccessMessage('Autorul a fost șters cu succes!');
      } else {
        setActionError('A apărut o eroare la ștergerea autorului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (author: Author) => {
    setEditingAuthor(author);
  };

  const handleDeleteClick = (author: Author) => {
    setDeleteConfirm(author);
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
    setModalError(null);
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setModalError(null);
  };

  const handleSearch = async (query: string) => {
    // For now, we'll just filter locally since we don't have search in the service
    // You can implement server-side search later if needed
    await fetchAuthors();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Managementul autorilor</h1>
            <p className="text-gray-600 mt-1">Gestionează autorii pentru ebook-uri</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            disabled={loading}
          >
            Adaugă autor nou
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        {/* Error Message */}
        {actionError && (
          <Alert
            type="error"
            message={actionError}
            onClose={() => setActionError(null)}
          />
        )}

        {/* Global Error */}
        {error && (
          <Alert
            type="error"
            message={error}
          />
        )}

        {/* Authors List */}
        <AuthorList
          authors={authors}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSearch={handleSearch}
        />

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={handleCancelCreate}
          title="Adaugă autor nou"
          size="lg"
        >
          {modalError && (
            <div className="mb-4">
              <Alert
                type="error"
                message={modalError}
                onClose={() => setModalError(null)}
              />
            </div>
          )}
          <AuthorForm
            onSubmit={handleCreateAuthor}
            onCancel={handleCancelCreate}
            loading={actionLoading}
            validateAuthor={validateAuthor}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingAuthor}
          onClose={handleCancelEdit}
          title="Editează autorul"
          size="lg"
        >
          {modalError && (
            <div className="mb-4">
              <Alert
                type="error"
                message={modalError}
                onClose={() => setModalError(null)}
              />
            </div>
          )}
          {editingAuthor && (
            <AuthorForm
              author={editingAuthor}
              onSubmit={handleUpdateAuthor}
              onCancel={handleCancelEdit}
              loading={actionLoading}
              validateAuthor={validateAuthor}
            />
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirmă ștergerea"
          size="sm"
        >
          {deleteConfirm && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Ești sigur că vrei să ștergi autorul <strong>{deleteConfirm.name}</strong>?
                Această acțiune nu poate fi anulată.
              </p>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteConfirm(null)}
                  disabled={actionLoading}
                >
                  Anulează
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteAuthor}
                  loading={actionLoading}
                  disabled={actionLoading}
                >
                  Șterge autorul
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AuthorsAdmin;
