
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPackage, FiUsers, FiShoppingCart, FiTrendingUp, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export function AdminDashboardPage() {
  const { user } = useAdminAuth();

  const stats = [
    {
      name: 'Total Products',
      value: '156',
      change: '+12%',
      changeType: 'increase',
      icon: FiPackage,
      color: 'bg-blue-500'
    },
    {
      name: 'Orders Today',
      value: '23',
      change: '+18%',
      changeType: 'increase',
      icon: FiShoppingCart,
      color: 'bg-green-500'
    },
    {
      name: 'Customers',
      value: '1,234',
      change: '+5%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Revenue',
      value: 'KES 45,600',
      change: '+25%',
      changeType: 'increase',
      icon: FiTrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  const quickActions = [
    {
      name: 'Add Product',
      description: 'Add a new product to inventory',
      href: '/admin/products/new',
      icon: FiPlus,
      color: 'bg-green-500'
    },
    {
      name: 'Manage Products',
      description: 'Edit existing products',
      href: '/admin/products',
      icon: FiEdit,
      color: 'bg-blue-500'
    },
    {
      name: 'View Orders',
      description: 'Manage customer orders',
      href: '/admin/orders',
      icon: FiShoppingCart,
      color: 'bg-purple-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-primary-100">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
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
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                  <span className="text-gray-600 text-sm ml-2">from last week</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
                >
                  <div className={`${action.color} p-2 rounded-lg mr-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.name}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <FiShoppingCart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New order received</p>
                <p className="text-xs text-gray-600">Order #12345 - KES 15,000</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FiPackage className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Product updated</p>
                <p className="text-xs text-gray-600">Dental Chair Unit - Stock updated</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <FiUsers className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New customer registered</p>
                <p className="text-xs text-gray-600">Dr. Sarah Johnson</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
