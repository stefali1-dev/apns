import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout';
import { useSubscriptions, SubscriptionFilters } from '@/lib/hooks/useSubscriptions';
import SubscriptionList from '@/components/admin/SubscriptionList';
import SubscriptionStatsCards from '@/components/admin/SubscriptionStatsCards';
import AddSubscriptionForm from '@/components/admin/AddSubscriptionForm';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import { 
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const SubscriptionsAdmin: React.FC = () => {
  const router = useRouter();
  const {
    subscriptions,
    stats,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchSubscriptions,
    fetchStats,
    addSubscription,
    updateSubscriptionStatus,
    deleteSubscription,
    deleteMultipleSubscriptions,
    exportSubscriptions,
    validateEmail
  } = useSubscriptions();

  // UI state
  const [showAddForm, setShowAddForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{id: string, email: string} | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<SubscriptionFilters>({
    search: '',
    status: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

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

  // Load data on component mount and filter changes
  useEffect(() => {
    fetchSubscriptions(filters);
  }, [fetchSubscriptions, filters]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Handlers
  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query, page: 1 }));
    setSelectedIds([]);
  };

  const handleFilter = (status: 'all' | 'active' | 'inactive') => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
    setSelectedIds([]);
  };

  const handleSort = (sortBy: 'email' | 'created_at' | 'updated_at', sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    setSelectedIds([]);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    setSelectedIds([]);
  };

  const handleAddSubscription = async (email: string) => {
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await addSubscription(email);
      if (success) {
        setSuccessMessage('Abonatul a fost adăugat cu succes!');
        setShowAddForm(false);
        // Refresh data
        await fetchSubscriptions(filters);
        await fetchStats();
        return true;
      }
      return false;
    } catch (err) {
      setActionError('A apărut o eroare la adăugarea abonatului');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await updateSubscriptionStatus(id, !currentStatus);
      if (success) {
        setSuccessMessage(`Statusul abonatului a fost ${!currentStatus ? 'activat' : 'dezactivat'}!`);
        await fetchStats();
      } else {
        setActionError('A apărut o eroare la actualizarea statusului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteSubscription(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
        setSuccessMessage('Abonatul a fost șters cu succes!');
        await fetchStats();
        setSelectedIds(prev => prev.filter(id => id !== deleteConfirm.id));
      } else {
        setActionError('A apărut o eroare la ștergerea abonatului');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const success = await deleteMultipleSubscriptions(selectedIds);
      if (success) {
        setBulkDeleteConfirm(false);
        setSelectedIds([]);
        setSuccessMessage(`${selectedIds.length} abonați au fost șterși cu succes!`);
        await fetchSubscriptions(filters);
        await fetchStats();
      } else {
        setActionError('A apărut o eroare la ștergerea abonaților');
      }
    } catch (err) {
      setActionError('A apărut o eroare neașteptată');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = async () => {
    setActionLoading(true);
    setActionError(null);
    
    try {
      const blob = await exportSubscriptions(filters);
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `abonati-newsletter-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setSuccessMessage('Datele au fost exportate cu succes!');
      }
    } catch (err) {
      setActionError('A apărut o eroare la exportul datelor');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestiune abonați Newsletter</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gestionează abonamentele la newsletter și vezi statisticile de angajare.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleExport}
              loading={actionLoading}
              disabled={totalCount === 0}
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Adaugă abonat
            </Button>
          </div>
        </div>

        {/* Action Messages */}
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

        {/* Global Error */}
        {error && (
          <Alert
            type="error"
            message={error}
          />
        )}

        {/* Statistics */}
        <SubscriptionStatsCards stats={stats} loading={loading && !stats} />

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddSubscriptionForm
              onSubmit={handleAddSubscription}
              loading={actionLoading}
              validateEmail={validateEmail}
            />
          </div>
        )}

        {/* Subscriptions List */}
        <SubscriptionList
          subscriptions={subscriptions}
          loading={loading}
          onStatusToggle={handleStatusToggle}
          onDelete={(id) => {
            const subscription = subscriptions.find(s => s.id === id);
            if (subscription) {
              setDeleteConfirm({ id, email: subscription.email });
            }
          }}
          onDeleteMultiple={() => setBulkDeleteConfirm(true)}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          loading={loading}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirmă ștergerea"
          size="sm"
        >
          {deleteConfirm && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-gray-600">
                    Ești sigur că vrei să ștergi abonarea pentru <strong>{deleteConfirm.email}</strong>?
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Această acțiune nu poate fi anulată.
                  </p>
                </div>
              </div>
              
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
                  onClick={handleDelete}
                  loading={actionLoading}
                  disabled={actionLoading}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Șterge
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Bulk Delete Confirmation Modal */}
        <Modal
          isOpen={bulkDeleteConfirm}
          onClose={() => setBulkDeleteConfirm(false)}
          title="Confirmă ștergerea în bloc"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-gray-600">
                  Ești sigur că vrei să ștergi <strong>{selectedIds.length}</strong> abonat{selectedIds.length !== 1 ? 'i' : ''}?
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Această acțiune nu poate fi anulată.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setBulkDeleteConfirm(false)}
                disabled={actionLoading}
              >
                Anulează
              </Button>
              <Button
                variant="danger"
                onClick={handleBulkDelete}
                loading={actionLoading}
                disabled={actionLoading}
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Șterge {selectedIds.length} abonat{selectedIds.length !== 1 ? 'i' : ''}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionsAdmin;
