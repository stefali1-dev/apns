import React, { useState } from 'react';
import { Subscription } from '@/lib/hooks/useSubscriptions';
import Button from '@/components/ui/Button';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  TrashIcon,
  CalendarIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  loading: boolean;
  onStatusToggle: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  onDeleteMultiple: (ids: string[]) => void;
  onSearch: (query: string) => void;
  onFilter: (status: 'all' | 'active' | 'inactive') => void;
  onSort: (sortBy: 'email' | 'created_at' | 'updated_at', sortOrder: 'asc' | 'desc') => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  loading,
  onStatusToggle,
  onDelete,
  onDeleteMultiple,
  onSearch,
  onFilter,
  onSort,
  selectedIds,
  onSelectionChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (status: 'all' | 'active' | 'inactive') => {
    setCurrentFilter(status);
    onFilter(status);
  };

  const handleSort = (field: 'email' | 'created_at' | 'updated_at') => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(subscriptions.map(sub => sub.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (field: 'email' | 'created_at' | 'updated_at') => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="flex-1 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Filters and Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="Caută după email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={currentFilter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFilterChange('all')}
            >
              Toți
            </Button>
            <Button
              variant={currentFilter === 'active' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFilterChange('active')}
            >
              Activi
            </Button>
            <Button
              variant={currentFilter === 'inactive' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFilterChange('inactive')}
            >
              Inactivi
            </Button>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedIds.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedIds.length} abonat{selectedIds.length !== 1 ? 'i' : ''} selectat{selectedIds.length !== 1 ? 'i' : ''}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDeleteMultiple(selectedIds)}
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Șterge selectați
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === subscriptions.length && subscriptions.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('email')}
              >
                Email {getSortIcon('email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('created_at')}
              >
                Data înregistrării {getSortIcon('created_at')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('updated_at')}
              >
                Ultima actualizare {getSortIcon('updated_at')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <EnvelopeIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <p>Nu au fost găsiți abonați</p>
                  </div>
                </td>
              </tr>
            ) : (
              subscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(subscription.id)}
                      onChange={(e) => handleSelectOne(subscription.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {subscription.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onStatusToggle(subscription.id, subscription.is_active)}
                      className="flex items-center"
                    >
                      {subscription.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Activ
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircleIcon className="h-3 w-3 mr-1" />
                          Inactiv
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(subscription.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(subscription.updated_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(subscription.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
