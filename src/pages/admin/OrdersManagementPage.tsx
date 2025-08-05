
import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
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

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'mpesa' | 'card' | 'cash';
  mpesaCode?: string;
  shippingAddress: string;
  createdAt: string;
  deliveryDate?: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Dr. Sarah Johnson',
    customerEmail: 'sarah@example.com',
    customerPhone: '+254712345678',
    items: [
      { name: 'Premium Dental Chair Unit', quantity: 1, price: 450000 },
      { name: 'Complete Student Kit', quantity: 2, price: 25000 }
    ],
    total: 500000,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'mpesa',
    shippingAddress: 'Nairobi, Kenya',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Dr. Michael Ochieng',
    customerEmail: 'michael@example.com',
    customerPhone: '+254723456789',
    items: [
      { name: 'Digital X-Ray System', quantity: 1, price: 280000 }
    ],
    total: 280000,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'mpesa',
    mpesaCode: 'RK45LMN890',
    shippingAddress: 'Mombasa, Kenya',
    createdAt: '2024-01-14T14:30:00Z'
  }
];

export function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const initiateM_pesaPayment = async (order: Order) => {
    setIsProcessingPayment(order.id);
    
    try {
      // Simulate M-Pesa STK Push API call
      // In production, this would call your backend API which interfaces with Safaricom
      console.log('Initiating M-Pesa payment for:', {
        phoneNumber: order.customerPhone,
        amount: order.total,
        orderId: order.id
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment initiation
      alert(`M-Pesa STK Push sent to ${order.customerPhone}\nAmount: ${formatPrice(order.total)}\nOrder: ${order.id}`);
      
      // Update order status
      setOrders(orders.map(o => 
        o.id === order.id 
          ? { ...o, paymentStatus: 'pending' as const }
          : o
      ));

    } catch (error) {
      alert('Failed to initiate M-Pesa payment. Please try again.');
    } finally {
      setIsProcessingPayment(null);
    }
  };

  const confirmPayment = (orderId: string, mpesaCode: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            paymentStatus: 'paid' as const,
            status: 'confirmed' as const,
            mpesaCode 
          } 
        : order
    ));
  };

  if (selectedOrder) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600">Order #{selectedOrder.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMapPin className="w-5 h-5 text-gray-400" />
                    <span>{selectedOrder.shippingAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Order['status'];
                        updateOrderStatus(selectedOrder.id, newStatus);
                        setSelectedOrder({ ...selectedOrder, status: newStatus });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Payment Status</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>

                  {selectedOrder.mpesaCode && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">M-Pesa Code: </span>
                      <span className="text-sm text-gray-900 font-mono">{selectedOrder.mpesaCode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Actions */}
              {selectedOrder.paymentMethod === 'mpesa' && selectedOrder.paymentStatus === 'pending' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">M-Pesa Payment</h2>
                  <div className="space-y-4">
                    <button
                      onClick={() => initiateM_pesaPayment(selectedOrder)}
                      disabled={isProcessingPayment === selectedOrder.id}
                      className="btn-primary w-full"
                    >
                      {isProcessingPayment === selectedOrder.id ? (
                        <>
                          <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Send M-Pesa STK Push'
                      )}
                    </button>
                    
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manual Payment Confirmation
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="M-Pesa Code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const code = (e.target as HTMLInputElement).value;
                              if (code) {
                                confirmPayment(selectedOrder.id, code);
                                setSelectedOrder({ ...selectedOrder, paymentStatus: 'paid', mpesaCode: code });
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="M-Pesa Code"]') as HTMLInputElement;
                            const code = input?.value;
                            if (code) {
                              confirmPayment(selectedOrder.id, code);
                              setSelectedOrder({ ...selectedOrder, paymentStatus: 'paid', mpesaCode: code });
                            }
                          }}
                          className="btn-secondary text-sm"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="text-gray-900">{formatDate(new Date(selectedOrder.createdAt))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="text-gray-900 capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span className="text-gray-900">{selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage customer orders and payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'confirmed').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <FiX className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'cancelled').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(new Date(order.createdAt))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{order.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Order"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        {order.paymentMethod === 'mpesa' && order.paymentStatus === 'pending' && (
                          <button
                            onClick={() => initiateM_pesaPayment(order)}
                            disabled={isProcessingPayment === order.id}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            title="Send M-Pesa Payment"
                          >
                            {isProcessingPayment === order.id ? (
                              <FiRefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiPhone className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
