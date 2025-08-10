import React, { useState } from 'react';
import { HiSearch, HiTruck, HiCheckCircle, HiClock, HiLocationMarker } from 'react-icons/hi';

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data - in real app, this would come from API
  const mockTrackingData = {
    orderNumber: 'RUR-20241201-12345',
    orderDate: 'December 1, 2024',
    estimatedDelivery: 'December 3, 2024',
    status: 'In Transit',
    currentLocation: 'Nairobi Distribution Center',
    trackingNumber: 'TRK-123456789',
    timeline: [
      {
        status: 'Order Placed',
        description: 'Your order has been confirmed and is being processed',
        date: 'December 1, 2024',
        time: '10:30 AM',
        completed: true,
        icon: HiCheckCircle
      },
      {
        status: 'Processing',
        description: 'Your order is being prepared and packaged',
        date: 'December 1, 2024',
        time: '2:15 PM',
        completed: true,
        icon: HiCheckCircle
      },
      {
        status: 'Shipped',
        description: 'Your order has been shipped from our warehouse',
        date: 'December 2, 2024',
        time: '9:00 AM',
        completed: true,
        icon: HiTruck
      },
      {
        status: 'In Transit',
        description: 'Your order is on its way to you',
        date: 'December 2, 2024',
        time: '3:45 PM',
        completed: false,
        icon: HiTruck
      },
      {
        status: 'Out for Delivery',
        description: 'Your order is out for delivery today',
        date: 'December 3, 2024',
        time: '8:00 AM',
        completed: false,
        icon: HiLocationMarker
      },
      {
        status: 'Delivered',
        description: 'Your order has been delivered',
        date: 'December 3, 2024',
        time: '2:00 PM',
        completed: false,
        icon: HiCheckCircle
      }
    ]
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated on your order status with real-time tracking. Enter your order number 
            to see the current status and estimated delivery date.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enter Order Details
            </h2>
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., RUR-20241201-12345"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You can find your order number in your order confirmation email or receipt
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !orderNumber.trim()}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Tracking Order...
                  </>
                ) : (
                  'Track Order'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="max-w-4xl mx-auto">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-semibold text-gray-900">{trackingResult.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-semibold text-gray-900">{trackingResult.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-semibold text-gray-900">{trackingResult.estimatedDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="font-semibold text-gray-900">{trackingResult.trackingNumber}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                      {trackingResult.status}
                    </div>
                    <p className="text-gray-600 mt-2">{trackingResult.currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Order Timeline
              </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  {trackingResult.timeline.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="relative flex items-start space-x-6">
                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                          item.completed 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        
                        {/* Timeline Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-lg font-semibold ${
                              item.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {item.status}
                            </h3>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${
                                item.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {item.date}
                              </p>
                              <p className="text-xs text-gray-400">{item.time}</p>
                            </div>
                          </div>
                          <p className={`text-sm ${
                            item.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Delivery Information
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <HiTruck className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Method</h3>
                  <p className="text-gray-600 text-sm">Standard Delivery</p>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <HiClock className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Hours</h3>
                  <p className="text-gray-600 text-sm">8:00 AM - 6:00 PM</p>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <HiLocationMarker className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Area</h3>
                  <p className="text-gray-600 text-sm">Nairobi Metropolitan</p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help with Your Order?
              </h3>
              <p className="text-gray-600 mb-6">
                Our customer service team is here to help with any delivery questions
              </p>
              <div className="space-x-4">
                <a 
                  href="/contact" 
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="tel:0703416433" 
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Call Us: 0703 416 433
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!trackingResult && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Need Help Finding Your Order?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Where to Find Your Order Number</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Order confirmation email</li>
                    <li>• Receipt from your purchase</li>
                    <li>• Account order history</li>
                    <li>• SMS confirmation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Number Format</h3>
                  <p className="text-gray-600 mb-3">
                    Our order numbers follow this format:
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-sm font-mono text-gray-800">
                      RUR-YYYYMMDD-XXXXX
                    </code>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Example: RUR-20241201-12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}