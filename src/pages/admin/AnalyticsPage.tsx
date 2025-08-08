
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { formatPrice } from '../../utils';
import { FiArrowLeft, FiTrendingUp, FiTrendingDown, FiUsers, FiShoppingCart, FiPackage, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { apiService } from '../../services/database';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [ordersData, productsData] = await Promise.all([
          orderService.getOrders(),
          apiService.getProducts()
        ]);
        setOrders(ordersData || []);
        setProducts(productsData.data || []);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Analytics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.customerInfo?.email)).size;
  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.name]) productSales[item.name] = { sales: 0, revenue: 0 };
      productSales[item.name].sales += item.quantity;
      productSales[item.name].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.entries(productSales)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

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
        </div>
        {loading ? (
          <div className="text-center py-16 text-lg text-gray-500">Loading analytics...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500 p-3 rounded-lg mr-3"><FiDollarSign className="w-6 h-6 text-white" /></div>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</span>
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500 p-3 rounded-lg mr-3"><FiShoppingCart className="w-6 h-6 text-white" /></div>
                  <span className="text-2xl font-bold text-gray-900">{totalOrders}</span>
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-500 p-3 rounded-lg mr-3"><FiUsers className="w-6 h-6 text-white" /></div>
                  <span className="text-2xl font-bold text-gray-900">{totalCustomers}</span>
                </div>
                <div className="text-sm text-gray-600">Unique Customers</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-500 p-3 rounded-lg mr-3"><FiPackage className="w-6 h-6 text-white" /></div>
                  <span className="text-2xl font-bold text-gray-900">{products.length}</span>
                </div>
                <div className="text-sm text-gray-600">Products in Catalog</div>
              </div>
            </div>
            {/* Top Products */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Product</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Units Sold</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr key={product.name}>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                              <span className="text-primary-600 font-semibold text-sm">{index + 1}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-900">{product.sales}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{formatPrice(product.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
