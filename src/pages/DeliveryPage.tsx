import React from 'react';
import { FiTruck, FiMapPin, FiClock, FiPackage, FiShield, FiPhone, FiMail } from 'react-icons/fi';

export function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Delivery Information</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, reliable delivery across Kenya with real-time tracking and professional service
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Express Delivery */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiTruck className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Express Delivery</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4 text-red-500" />
                <span>2-4 hours in Nairobi</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-red-500" />
                <span>Nairobi Metropolitan Area</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPackage className="w-4 h-4 text-red-500" />
                <span>Orders placed before 2 PM</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-red-600">KSH 1,500</span>
            </div>
          </div>

          {/* Standard Delivery */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiTruck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Standard Delivery</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4 text-blue-500" />
                <span>24-48 hours nationwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-blue-500" />
                <span>All counties in Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPackage className="w-4 h-4 text-blue-500" />
                <span>Orders placed any time</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-blue-600">KSH 2,500</span>
            </div>
          </div>

          {/* Free Delivery */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiTruck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Free Delivery</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4 text-green-500" />
                <span>24-48 hours nationwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-green-500" />
                <span>All counties in Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPackage className="w-4 h-4 text-green-500" />
                <span>Orders over KSH 50,000</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-green-600">FREE</span>
            </div>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our Delivery Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Confirmation</h3>
              <p className="text-gray-600 text-sm">Receive instant confirmation via SMS and email</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
              <p className="text-gray-600 text-sm">Your order is prepared and quality-checked</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dispatch</h3>
              <p className="text-gray-600 text-sm">Professional delivery team picks up your order</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">Receive your order with real-time updates</p>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nairobi Metropolitan Area</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Nairobi City</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Westlands</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Kilimani</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Lavington</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Karen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Thika</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Cities & Towns</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Mombasa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Kisumu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Nakuru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Eldoret</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Nyeri</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>All other counties</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Features */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Delivery Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <FiShield className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure & Insured</h3>
                <p className="text-gray-600 text-sm">All deliveries are fully insured and handled with care</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiClock className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
                <p className="text-gray-600 text-sm">Track your order in real-time with SMS updates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPhone className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Driver Contact</h3>
                <p className="text-gray-600 text-sm">Direct contact with delivery driver for coordination</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPackage className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Handling</h3>
                <p className="text-gray-600 text-sm">Trained staff for delicate medical equipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiTruck className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm">Choose your preferred delivery time slot</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMail className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Notifications</h3>
                <p className="text-gray-600 text-sm">SMS and email updates at every step</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Delivery?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our delivery team is here to help. Contact us for any questions about delivery times, 
            tracking, or special arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0703416433" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Call: 0703 416 433
            </a>
            <a href="mailto:support@rurident.co.ke" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}