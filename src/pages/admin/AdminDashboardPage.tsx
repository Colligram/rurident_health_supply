
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FiPackage, FiUsers, FiShoppingCart, FiTrendingUp, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProducts } from '../../context/ProductsContext';
import { orderService, Order } from '../../services/orderService';
import { customerService, Customer } from '../../services/customerService';
import { formatPrice } from '../../utils';

export function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const { products } = useProducts();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
        // Play sound if new order
        if (lastOrderCount && data.length > lastOrderCount && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        setLastOrderCount(data.length);
      } catch (err) {
        // handle error
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [lastOrderCount]);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const result = await customerService.getCustomers();
        if (result.success && result.data) {
          setCustomers(result.data);
        }
      } catch (err) {
        // handle error
        console.error('Failed to fetch customers:', err);
      }
    };
    fetchCustomers();
  }, []);

  // Compute stats
  const today = new Date();
  const ordersToday = orders.filter(o => {
    if (!o.createdAt) return false;
    const d = new Date(o.createdAt);
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'completed' ? o.total : 0), 0);

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      change: '',
      changeType: 'increase',
      icon: FiPackage,
      color: 'bg-blue-500'
    },
    {
      name: 'Orders Today',
      value: ordersToday.length,
      change: '',
      changeType: 'increase',
      icon: FiShoppingCart,
      color: 'bg-green-500'
    },
    {
      name: 'Customers',
      value: customers.length,
      change: '',
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Revenue',
      value: formatPrice(totalRevenue),
      change: '',
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

  // Recent activity: show last 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => (b.createdAt && a.createdAt ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : 0))
    .slice(0, 5);

  return (
    <AdminLayout>
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white shadow-xl">
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
              <div key={stat.name} className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-xl p-6 shadow-xl">
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
        <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No recent orders</div>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center p-3 bg-white/40 rounded-lg shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FiShoppingCart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-600">Order #{order.orderId} - {formatPrice(order.total)}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
