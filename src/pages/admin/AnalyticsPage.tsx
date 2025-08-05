
import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { formatPrice } from '../../utils';
import { 
  FiArrowLeft,
  FiTrendingUp, 
  FiTrendingDown,
  FiUsers, 
  FiShoppingCart, 
  FiPackage,
  FiDollarSign
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      name: 'Total Revenue',
      value: 'KES 2,450,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Orders',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: FiShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Customers',
      value: '89',
      change: '+15.3%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Products Sold',
      value: '234',
      change: '-2.1%',
      changeType: 'decrease',
      icon: FiPackage,
      color: 'bg-orange-500'
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 850000 },
    { month: 'Feb', sales: 920000 },
    { month: 'Mar', sales: 1100000 },
    { month: 'Apr', sales: 980000 },
    { month: 'May', sales: 1350000 },
    { month: 'Jun', sales: 1200000 }
  ];

  const topProducts = [
    { name: 'Premium Dental Chair Unit', sales: 45, revenue: 2025000 },
    { name: 'Digital X-Ray System', sales: 23, revenue: 644000 },
    { name: 'Complete Student Kit', sales: 67, revenue: 1675000 },
    { name: 'Composite Filling Kit', sales: 89, revenue: 756500 },
    { name: 'Sterilization Unit', sales: 34, revenue: 1020000 }
  ];

  const customerSegments = [
    { segment: 'Dental Practices', percentage: 45, count: 78 },
    { segment: 'Students', percentage: 35, count: 61 },
    { segment: 'Hospitals', percentage: 15, count: 26 },
    { segment: 'Clinics', percentage: 5, count: 9 }
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
              {salesData.map((data, index) => {
                const maxSales = Math.max(...salesData.map(d => d.sales));
                const width = (data.sales / maxSales) * 100;
                
                return (
                  <div key={data.month} className="flex items-center space-x-4">
                    <div className="w-8 text-sm text-gray-600">{data.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {formatPrice(data.sales)}
                        </span>
                      </div>
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
              {customerSegments.map((segment, index) => (
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
                      <div className="text-xs text-gray-600">{segment.count} customers</div>
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
                {topProducts.map((product, index) => {
                  const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
                  const performance = (product.revenue / maxRevenue) * 100;
                  
                  return (
                    <tr key={product.name}>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
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
            <p className="text-3xl font-bold text-primary-600">{formatPrice(15730)}</p>
            <p className="text-sm text-gray-600 mt-1">+5.2% vs last period</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-primary-600">12.5%</p>
            <p className="text-sm text-gray-600 mt-1">+2.1% vs last period</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Retention</h3>
            <p className="text-3xl font-bold text-primary-600">78%</p>
            <p className="text-sm text-gray-600 mt-1">+1.8% vs last period</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
