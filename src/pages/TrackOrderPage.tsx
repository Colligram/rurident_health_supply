import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;

    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: '2024-01-25',
        currentLocation: 'Nairobi Distribution Center',
        trackingHistory: [
          {
            date: '2024-01-20',
            time: '10:30 AM',
            status: 'Order Placed',
            location: 'Online Store',
            description: 'Your order has been confirmed and is being processed'
          },
          {
            date: '2024-01-21',
            time: '2:15 PM',
            status: 'Processing',
            location: 'Warehouse',
            description: 'Items are being picked and packed'
          },
          {
            date: '2024-01-22',
            time: '9:45 AM',
            status: 'Shipped',
            location: 'Shipping Center',
            description: 'Package has been shipped via Express Delivery'
          },
          {
            date: '2024-01-23',
            time: '11:20 AM',
            status: 'In Transit',
            location: 'Nairobi Distribution Center',
            description: 'Package is out for delivery'
          }
        ]
      });
      setIsTracking(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return 'text-blue-600 bg-blue-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Shipped':
        return 'text-purple-600 bg-purple-100';
      case 'In Transit':
        return 'text-orange-600 bg-orange-100';
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'Processing':
        return <FiClock className="w-5 h-5" />;
      case 'Shipped':
        return <FiPackage className="w-5 h-5" />;
      case 'In Transit':
        return <FiTruck className="w-5 h-5" />;
      case 'Delivered':
        return <FiCheckCircle className="w-5 h-5" />;
      default:
        return <FiClock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated on your order status with real-time tracking information. 
            Enter your order number and email to get started.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tracking Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Tracking</h2>
            
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your order number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isTracking}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isTracking ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          </div>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Order #{trackingResult.orderNumber}</h3>
                    <p className="text-primary-100">Estimated Delivery: {trackingResult.estimatedDelivery}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                      {getStatusIcon(trackingResult.status)}
                      <span className="ml-2">{trackingResult.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="p-8 border-b border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trackingResult.currentLocation}</p>
                    <p className="text-sm text-gray-600">Package is currently at this location</p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h4>
                <div className="space-y-6">
                  {trackingResult.trackingHistory.map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{event.status}</p>
                          <div className="text-sm text-gray-500">
                            {event.date} at {event.time}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                        <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Call Us</h4>
                <p className="text-sm text-gray-600">+254 700 000 000</p>
                <p className="text-xs text-gray-500">Mon-Fri, 8AM-6PM</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                <p className="text-sm text-gray-600">support@rurident.com</p>
                <p className="text-xs text-gray-500">24/7 Response</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPackage className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600">Available on website</p>
                <p className="text-xs text-gray-500">Instant Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}