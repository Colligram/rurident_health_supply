import React from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiRefreshCw, FiShield, FiMapPin, FiHelpCircle, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with any questions about our products, orders, or services
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Delivery Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiTruck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Delivery Info</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Free delivery over KSH 50,000</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>2-4 hours delivery in Nairobi</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Next day delivery nationwide</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Real-time tracking updates</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/delivery" className="text-blue-600 hover:text-blue-700 font-medium">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Returns */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiRefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Returns & Exchanges</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Free returns for defective items</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Easy exchange process</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Full refund guarantee</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/returns" className="text-green-600 hover:text-green-700 font-medium">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Warranty */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiShield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Warranty & Service</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Manufacturer warranties</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Extended warranty options</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Professional service support</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Parts replacement service</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/warranty" className="text-purple-600 hover:text-purple-700 font-medium">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Track Order */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiMapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Track Your Order</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Real-time order tracking</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>SMS & email updates</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Delivery time estimates</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Driver contact information</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/track-order" className="text-orange-600 hover:text-orange-700 font-medium">
                Track Now →
              </Link>
            </div>
          </div>

          {/* Help Center */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FiHelpCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Help Center</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Comprehensive FAQs</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Product guides & manuals</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Video tutorials</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Installation support</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/help-center" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Get Help →
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiPhone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Contact Support</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4 text-red-500" />
                <span>0703 416 433</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-red-500" />
                <span>support@rurident.co.ke</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4 text-red-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-red-500" />
                <span>Mepalux Plaza, Nairobi</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/contact" className="text-red-600 hover:text-red-700 font-medium">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h3>
              <p className="text-gray-600">Delivery in Nairobi takes 2-4 hours, while nationwide delivery is completed within 24-48 hours.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What is your return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for all products. Defective items can be returned for free replacement or refund.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Do you provide installation support?</h3>
              <p className="text-gray-600">Yes, we provide professional installation and setup services for all equipment. Contact us to schedule installation.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Are your products genuine?</h3>
              <p className="text-gray-600">Absolutely! All our products are 100% genuine and come with manufacturer warranties.</p>
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">Yes, we offer competitive pricing for bulk orders. Contact our sales team for custom quotes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}