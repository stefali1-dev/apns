import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import { useArticles } from '@/lib/hooks/useArticles';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Article } from '@/lib/types/article';

const ArticlesAdmin: React.FC = () => {
  const router = useRouter();
  const {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    searchArticles,
    generateSlug,
    validateArticle,
  } = useArticles();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Article | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
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

  const handleCreateArticle = async (formData: any) => {
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await createArticle(formData);
      if (success) {
        setShowCreateModal(false);
        setSuccessMessage('Articolul a fost creat cu succes!');
        await fetchArticles(); // Refresh the list
        return true;
      } else {
        setActionError('A apărut o eroare la crearea articolului');
        return false;
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateArticle = async (formData: any) => {
    if (!editingArticle) return false;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await updateArticle(editingArticle.id, formData);
      if (success) {
        setEditingArticle(null);
        setSuccessMessage('Articolul a fost actualizat cu succes!');
        await fetchArticles(); // Refresh the list
        return true;
      } else {
        setActionError('A apărut o eroare la actualizarea articolului');
        return false;
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    if (!deleteConfirm) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteArticle(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        setSuccessMessage('Articolul a fost șters cu succes!');
        await fetchArticles(); // Refresh the list
      } else {
        setActionError('A apărut o eroare la ștergerea articolului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
  };

  const handleDeleteClick = (article: Article) => {
    setDeleteConfirm(article);
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await searchArticles(query);
    } else {
      await fetchArticles();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Management Articole
            </h1>
            <p className="text-green-600 mt-1">
              Administrează articolele din secțiunea de conținut
            </p>
          </div>
          
          <Button
            onClick={() => setShowCreateModal(true)}
            size="lg"
          >
            + Articol Nou
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
            message={`Eroare la încărcarea articolelor: ${error}`}
          />
        )}

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
          <ArticleList
            articles={articles}
            loading={loading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onSearch={handleSearch}
          />
        </div>

        {/* Create Article Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={handleCancelCreate}
          title="Creează Articol Nou"
          size="xl"
        >
          <ArticleForm
            onSubmit={handleCreateArticle}
            onCancel={handleCancelCreate}
            loading={actionLoading}
            generateSlug={generateSlug}
            validateArticle={validateArticle}
          />
        </Modal>

        {/* Edit Article Modal */}
        <Modal
          isOpen={!!editingArticle}
          onClose={handleCancelEdit}
          title="Editează Articol"
          size="xl"
        >
          {editingArticle && (
            <ArticleForm
              article={editingArticle}
              onSubmit={handleUpdateArticle}
              onCancel={handleCancelEdit}
              loading={actionLoading}
              generateSlug={generateSlug}
              validateArticle={validateArticle}
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
                Ești sigur că vrei să ștergi articolul{' '}
                <span className="font-semibold">"{deleteConfirm.title}"</span>?
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
                  onClick={handleDeleteArticle}
                  loading={actionLoading}
                  disabled={actionLoading}
                >
                  Șterge Articol
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ArticlesAdmin;
