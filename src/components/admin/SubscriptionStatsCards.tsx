import React from 'react';
import { SubscriptionStats } from '@/lib/hooks/useSubscriptions';
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface SubscriptionStatsProps {
  stats: SubscriptionStats | null;
  loading: boolean;
}

const SubscriptionStatsCards: React.FC<SubscriptionStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const activePercentage = stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
  const inactivePercentage = stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0;

  const statCards = [
    {
      name: 'Total abonați',
      value: stats.total.toLocaleString('ro-RO'),
      icon: UserGroupIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: null
    },
    {
      name: 'Abonați activi',
      value: stats.active.toLocaleString('ro-RO'),
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: `${activePercentage}% din total`
    },
    {
      name: 'Abonați inactivi',
      value: stats.inactive.toLocaleString('ro-RO'),
      icon: XCircleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: `${inactivePercentage}% din total`
    },
    {
      name: 'Rata de activitate',
      value: `${activePercentage}%`,
      icon: ChartBarIcon,
      color: activePercentage >= 80 ? 'text-green-600' : activePercentage >= 60 ? 'text-yellow-600' : 'text-red-600',
      bgColor: activePercentage >= 80 ? 'bg-green-100' : activePercentage >= 60 ? 'bg-yellow-100' : 'bg-red-100',
      change: 'Abonați activi vs total'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                  {stat.change && (
                    <dd className="text-xs text-gray-600 mt-1">
                      {stat.change}
                    </dd>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionStatsCards;
