
import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { formatPrice } from '../../utils';
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
import { useAnalytics } from '../../context/AnalyticsContext';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { data, loading, error, timeRange, setTimeRange, refreshData } = useAnalytics();

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
      value: formatPrice(data.totalRevenue),
      change: `${data.revenueChange > 0 ? '+' : ''}${data.revenueChange.toFixed(1)}%`,
      changeType: data.revenueChange >= 0 ? 'increase' : 'decrease',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Orders',
      value: data.totalOrders.toString(),
      change: `${data.ordersChange > 0 ? '+' : ''}${data.ordersChange.toFixed(1)}%`,
      changeType: data.ordersChange >= 0 ? 'increase' : 'decrease',
      icon: FiShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Customers',
      value: data.totalCustomers.toString(),
      change: `${data.customersChange > 0 ? '+' : ''}${data.customersChange.toFixed(1)}%`,
      changeType: data.customersChange >= 0 ? 'increase' : 'decrease',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Products Sold',
      value: data.productsSold.toString(),
      change: `${data.productsSoldChange > 0 ? '+' : ''}${data.productsSoldChange.toFixed(1)}%`,
      changeType: data.productsSoldChange >= 0 ? 'increase' : 'decrease',
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h2>
            <div className="space-y-4">
              {data.salesByMonth.map((monthData, index) => {
                const maxSales = Math.max(...data.salesByMonth.map(d => d.sales));
                const width = (monthData.sales / maxSales) * 100;
                
                return (
                  <div key={monthData.month} className="flex items-center space-x-4">
                    <div className="w-8 text-sm text-gray-600">{monthData.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {formatPrice(monthData.sales)}
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
              {data.customerSegments.map((segment, index) => (
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
                    {segment.percentage}%
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
                {data.topProducts.slice(0, 5).map((product, index) => {
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
                              {product.category}
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
              {formatPrice(Math.round(data.totalRevenue / data.totalOrders))}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {data.revenueChange > data.ordersChange ? '+' : ''}{(data.revenueChange - data.ordersChange).toFixed(1)}% vs last period
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Products per Order</h3>
            <p className="text-3xl font-bold text-primary-600">
              {(data.productsSold / data.totalOrders).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {data.productsSoldChange > data.ordersChange ? '+' : ''}{(data.productsSoldChange - data.ordersChange).toFixed(1)}% vs last period
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-3xl font-bold text-primary-600">{data.recentActivity.length}</p>
            <p className="text-sm text-gray-600 mt-1">events in last 72 hours</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <FiActivity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {data.recentActivity.slice(0, 8).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'order' ? 'bg-green-500' : 
                  activity.type === 'customer' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {activity.amount && (
                      <span className="text-xs font-medium text-green-600">
                        {formatPrice(activity.amount)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
