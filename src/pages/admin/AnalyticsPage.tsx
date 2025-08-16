
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { formatPrice } from '../../utils';
import { analyticsService, AnalyticsData } from '../../services/analyticsService';
import { 
  FiArrowLeft,
  FiTrendingUp, 
  FiTrendingDown,
  FiUsers, 
  FiShoppingCart, 
  FiPackage,
  FiDollarSign,
  FiRefreshCw,
  FiActivity
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyticsService.getAnalytics();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load analytics data');
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadAnalytics();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center space-x-3">
            <FiRefreshCw className="w-6 h-6 animate-spin text-orange-600" />
            <span className="text-lg text-gray-600">Loading analytics data...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">
              {error || 'Failed to load analytics data'}
            </div>
            <button
              onClick={refreshData}
              className="btn-primary"
            >
              <FiRefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      name: 'Total Revenue',
      value: formatPrice(data.revenue.total),
      change: `${data.revenue.growth > 0 ? '+' : ''}${data.revenue.growth.toFixed(1)}%`,
      changeType: data.revenue.growth >= 0 ? 'increase' : 'decrease',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Orders',
      value: data.orders.total.toString(),
      change: `${data.orders.completed > data.orders.pending ? '+' : ''}${((data.orders.completed / data.orders.total) * 100).toFixed(1)}%`,
      changeType: data.orders.completed > data.orders.pending ? 'increase' : 'decrease',
      icon: FiShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Customers',
      value: data.customers.total.toString(),
      change: `${data.customers.new > 0 ? '+' : ''}${data.customers.new}`,
      changeType: data.customers.new > 0 ? 'increase' : 'decrease',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Products',
      value: data.products.total.toString(),
      change: `${data.products.inStock}/${data.products.total}`,
      changeType: 'increase',
      icon: FiPackage,
      color: 'bg-orange-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your business performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.changeType === 'increase' ? (
                    <FiTrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <FiTrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">vs last period</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h2>
            <div className="space-y-4">
              {data.monthlyData.map((monthData, index) => {
                const maxRevenue = Math.max(...data.monthlyData.map(d => d.revenue));
                const width = (monthData.revenue / maxRevenue) * 100;
                
                return (
                  <div key={monthData.month} className="flex items-center space-x-4">
                    <div className="w-8 text-sm text-gray-600">{monthData.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {formatPrice(monthData.revenue)}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 w-16 text-right">
                      {monthData.orders} orders
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h2>
            <div className="space-y-4">
              {[
                { segment: 'VIP', count: data.customers.total - data.customers.new, revenue: data.revenue.total * 0.6 },
                { segment: 'Premium', count: Math.floor(data.customers.total * 0.3), revenue: data.revenue.total * 0.3 },
                { segment: 'Regular', count: Math.floor(data.customers.total * 0.1), revenue: data.revenue.total * 0.1 }
              ].map((segment, index) => (
                <div key={segment.segment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${index * 60 + 200}, 70%, 50%)` 
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{segment.segment}</div>
                      <div className="text-xs text-gray-600">{segment.count} customers • {formatPrice(segment.revenue)}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {Math.round((segment.count / data.customers.total) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Units Sold</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.topProducts.map((product, index) => {
                  const maxRevenue = Math.max(...data.topProducts.map(p => p.revenue));
                  const performance = (product.revenue / maxRevenue) * 100;
                  
                  return (
                    <tr key={product.id}>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.sales} units sold
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-900">{product.sales}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        {formatPrice(product.revenue)}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${performance}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-10">
                            {Math.round(performance)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Order Value</h3>
            <p className="text-3xl font-bold text-primary-600">
              {formatPrice(Math.round(data.revenue.total / data.orders.total))}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Based on {data.orders.total} total orders
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Growth</h3>
            <p className="text-3xl font-bold text-primary-600">
              +{data.customers.new}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              New customers this month
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Status</h3>
            <p className="text-3xl font-bold text-primary-600">{data.products.inStock}</p>
            <p className="text-sm text-gray-600 mt-1">
              Products in stock ({data.products.lowStock} low stock)
            </p>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Categories by Revenue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.topCategories.map((category, index) => (
              <div key={category.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
                <div className="text-2xl font-bold text-primary-600">
                  {formatPrice(category.revenue)}
                </div>
                <div className="text-sm text-gray-600">
                  {category.sales} sales
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
