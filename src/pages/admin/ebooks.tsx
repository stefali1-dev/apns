import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import { useEbooks } from '@/lib/hooks/useEbooks';
import EbookList from '@/components/admin/EbookList';
import EbookForm from '@/components/admin/EbookForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { EBook } from '@/lib/types/ebook';

const EbooksAdmin: React.FC = () => {
  const router = useRouter();
  const {
    ebooks,
    authors,
    loading,
    error,
    fetchEbooks,
    fetchAuthors,
    createEbook,
    updateEbook,
    deleteEbook,
    createAuthor,
    searchEbooks,
    generateSlug,
    validateEbook,
    validateAuthor,
  } = useEbooks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEbook, setEditingEbook] = useState<EBook | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<EBook | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

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

  // Load ebooks and authors on component mount
  useEffect(() => {
    fetchEbooks();
    fetchAuthors();
  }, [fetchEbooks, fetchAuthors]);

  const handleCreateEbook = async (formData: any) => {
    setActionLoading(true);
    setModalError(null);
    
    try {
      const success = await createEbook(formData);
      if (success) {
        setShowCreateModal(false);
        setSuccessMessage('Ebook-ul a fost creat cu succes!');
        return true;
      } else {
        setModalError('A apărut o eroare la crearea ebook-ului');
        return false;
      }
    } catch (err) {
      setModalError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateEbook = async (formData: any) => {
    if (!editingEbook) return false;
    
    setActionLoading(true);
    setModalError(null);
    
    try {
      const success = await updateEbook(editingEbook.id, formData);
      if (success) {
        setEditingEbook(null);
        setSuccessMessage('Ebook-ul a fost actualizat cu succes!');
        return true;
      } else {
        setModalError('A apărut o eroare la actualizarea ebook-ului');
        return false;
      }
    } catch (err) {
      setModalError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEbook = async () => {
    if (!deleteConfirm) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteEbook(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        setSuccessMessage('Ebook-ul a fost șters cu succes!');
      } else {
        setActionError('A apărut o eroare la ștergerea ebook-ului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateAuthor = async (authorData: any) => {
    try {
      const newAuthor = await createAuthor(authorData);
      return newAuthor;
    } catch (err) {
      console.error('Error creating author:', err);
      return null;
    }
  };

  const handleEditClick = (ebook: EBook) => {
    setEditingEbook(ebook);
  };

  const handleDeleteClick = (ebook: EBook) => {
    setDeleteConfirm(ebook);
  };

  const handleCancelEdit = () => {
    setEditingEbook(null);
    setModalError(null);
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setModalError(null);
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await searchEbooks(query);
    } else {
      await fetchEbooks();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Managementul ebook-urilor</h1>
            <p className="text-gray-600 mt-1">Gestionează ebook-urile și conținutul digital</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => router.push('/admin/authors')}
            >
              Gestionează autori
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
              disabled={loading}
            >
              Adaugă ebook nou
            </Button>
          </div>
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

        {/* Ebooks List */}
        <EbookList
          ebooks={ebooks}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSearch={handleSearch}
        />

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={handleCancelCreate}
          title="Adaugă ebook nou"
          size="xl"
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
          <EbookForm
            authors={authors}
            onSubmit={handleCreateEbook}
            onCancel={handleCancelCreate}
            onCreateAuthor={handleCreateAuthor}
            loading={actionLoading}
            generateSlug={generateSlug}
            validateEbook={validateEbook}
            validateAuthor={validateAuthor}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingEbook}
          onClose={handleCancelEdit}
          title="Editează ebook-ul"
          size="xl"
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
          {editingEbook && (
            <EbookForm
              ebook={editingEbook}
              authors={authors}
              onSubmit={handleUpdateEbook}
              onCancel={handleCancelEdit}
              onCreateAuthor={handleCreateAuthor}
              loading={actionLoading}
              generateSlug={generateSlug}
              validateEbook={validateEbook}
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
                Ești sigur că vrei să ștergi ebook-ul <strong>{deleteConfirm.title}</strong>?
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
                  onClick={handleDeleteEbook}
                  loading={actionLoading}
                  disabled={actionLoading}
                >
                  Șterge ebook-ul
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default EbooksAdmin;
