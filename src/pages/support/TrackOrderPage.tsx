import React, { useState } from 'react';
import { FiSearch, FiPackage, FiTruck, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      const mockTrackingData = {
        orderNumber: orderNumber.toUpperCase(),
        status: 'in-transit',
        estimatedDelivery: '2024-01-15',
        currentLocation: 'Nairobi Distribution Center',
        trackingSteps: [
          {
            status: 'order-placed',
            title: 'Order Placed',
            description: 'Your order has been received and is being processed',
            timestamp: '2024-01-12 10:30 AM',
            completed: true
          },
          {
            status: 'order-confirmed',
            title: 'Order Confirmed',
            description: 'Payment verified and order confirmed',
            timestamp: '2024-01-12 11:15 AM',
            completed: true
          },
          {
            status: 'processing',
            title: 'Processing',
            description: 'Items are being picked and prepared for shipment',
            timestamp: '2024-01-12 02:00 PM',
            completed: true
          },
          {
            status: 'shipped',
            title: 'Shipped',
            description: 'Your order has been dispatched from our warehouse',
            timestamp: '2024-01-13 09:00 AM',
            completed: true
          },
          {
            status: 'in-transit',
            title: 'In Transit',
            description: 'Your order is on the way to the delivery address',
            timestamp: '2024-01-14 08:00 AM',
            completed: true,
            current: true
          },
          {
            status: 'out-for-delivery',
            title: 'Out for Delivery',
            description: 'Your order is out for delivery',
            timestamp: 'Expected: 2024-01-15 10:00 AM',
            completed: false
          },
          {
            status: 'delivered',
            title: 'Delivered',
            description: 'Your order has been delivered',
            timestamp: 'Expected: 2024-01-15 by 6:00 PM',
            completed: false
          }
        ],
        items: [
          { name: 'Dental Chair Unit - Model DX200', quantity: 1, status: 'shipped' },
          { name: 'High Speed Handpiece Set', quantity: 2, status: 'shipped' },
          { name: 'Dental Sterilization Kit', quantity: 1, status: 'shipped' }
        ],
        deliveryInfo: {
          address: 'Westlands Medical Center, Nairobi',
          contact: '+254 700 000 000',
          instructions: 'Deliver to main reception desk'
        }
      };
      
      setTrackingResult(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, completed: boolean, current: boolean = false) => {
    if (current) return <FiTruck className="w-5 h-5 text-blue-500" />;
    if (completed) return <FiCheckCircle className="w-5 h-5 text-green-500" />;
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>;
  };

  const getStatusColor = (completed: boolean, current: boolean = false) => {
    if (current) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (completed) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-gray-500 bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <FiPackage className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Track Your Order</h1>
              <p className="text-blue-100 mt-1">Get real-time updates on your delivery</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Tracking Form */}
          <section className="mb-8">
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., RH2024001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., +254 700 000 000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !orderNumber.trim()}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <FiSearch className="w-5 h-5" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Summary */}
              <section className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Order Number</h3>
                    <p className="text-gray-600">{trackingResult.orderNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Current Status</h3>
                    <div className="flex items-center space-x-2">
                      <FiTruck className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600 font-medium capitalize">
                        {trackingResult.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                    <p className="text-gray-600">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
              </section>

              {/* Tracking Timeline */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Timeline</h2>
                <div className="space-y-4">
                  {trackingResult.trackingSteps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(step.status, step.completed, step.current)}
                      </div>
                      <div className={`flex-1 border rounded-lg p-4 ${getStatusColor(step.completed, step.current)}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm mt-1">{step.description}</p>
                          </div>
                          <div className="text-sm font-medium">
                            {step.timestamp}
                          </div>
                        </div>
                        {step.current && (
                          <div className="mt-2 flex items-center text-sm">
                            <FiMapPin className="w-4 h-4 mr-1" />
                            <span>Current Location: {trackingResult.currentLocation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Order Items */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {trackingResult.items.map((item: any, index: number) => (
                    <div key={index} className={`p-4 ${index !== trackingResult.items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'shipped' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Delivery Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                      <p className="text-gray-600">{trackingResult.deliveryInfo.address}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Number</h3>
                      <p className="text-gray-600">{trackingResult.deliveryInfo.contact}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-gray-900 mb-2">Special Instructions</h3>
                      <p className="text-gray-600">{trackingResult.deliveryInfo.instructions}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Help Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <FiAlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  Common Issues
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Order number not found? Check your email confirmation</li>
                  <li>• Tracking not updating? Wait 24 hours after shipment</li>
                  <li>• Delivery delayed? Check for weather/traffic updates</li>
                  <li>• Wrong address? Contact us immediately</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <FiClock className="w-5 h-5 text-blue-500 mr-2" />
                  Delivery Support
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📞 0703 416 433</p>
                  <p>📞 0795 202 687</p>
                  <p>✉️ delivery@ruridenthealth.co.ke</p>
                  <p>🕒 Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>🕒 Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}