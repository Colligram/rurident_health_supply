
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { orderService, Order } from '../../services/orderService';
import { formatPrice, formatDate } from '../../utils';
import { 
  FiArrowLeft,
  FiEye, 
  FiPhone, 
  FiMail, 
  FiMapPin,
  FiPackage,
  FiClock,
  FiCheck,
  FiX,
  FiRefreshCw
} from 'react-icons/fi';

export function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');

  // Load orders from database
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError('Failed to load orders');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      // Refresh orders list
      await loadOrders();
      // Update selected order if it's open
      if (selectedOrder && selectedOrder.id === orderId) {
        const updatedOrder = orders.find(o => o.id === orderId);
        if (updatedOrder) {
          setSelectedOrder({ ...updatedOrder, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      // You could add a toast notification here
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.deleteOrder(orderId);
        await loadOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setShowModal(false);
          setSelectedOrder(null);
        }
      } catch (err) {
        console.error('Error deleting order:', err);
      }
    }
  };

  // Filter orders based on selected filter
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadOrders}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-gray-600 mt-1">Manage customer orders and deliveries</p>
          </div>
          <button 
            onClick={loadOrders}
            className="btn-secondary flex items-center space-x-2"
          >
            <FiRefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiRefreshCw className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'processing').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'delivered').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerInfo.firstName} {order.customerInfo.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.customerInfo.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt ? formatDate(new Date(order.createdAt)) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Details - {selectedOrder.orderId}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mt-4 space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center">
                      <FiMail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{selectedOrder.customerInfo.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{selectedOrder.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">
                        {selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.county}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 font-bold">
                      <span>Total:</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Management */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Order Status</h4>
                  <div className="flex space-x-2 mb-4">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id!, status)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedOrder.status === status
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    Current status: <span className={`px-2 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-6 border-t mt-6">
                <button
                  onClick={() => deleteOrder(selectedOrder.id!)}
                  className="btn-secondary bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete Order
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
