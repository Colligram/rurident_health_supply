import React from 'react';
import { FiRefreshCw, FiShield, FiPackage, FiClock, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';

export function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hassle-free returns and exchanges with our customer-friendly 30-day policy
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">30-Day Return Policy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              we'll make it right with our comprehensive return policy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">30 Days</h3>
              <p className="text-gray-600">Return window from date of delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Returns</h3>
              <p className="text-gray-600">No cost for defective items</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600">Simple return and exchange process</p>
            </div>
          </div>
        </div>

        {/* Return Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Accepted Returns */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Accepted Return Reasons
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Defective or damaged products</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Wrong item received</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Product not as described</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Size or model doesn't fit needs</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Change of mind (within 7 days)</span>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiPackage className="w-6 h-6 text-red-500 mr-2" />
              Non-Returnable Items
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-red-500">✗</span>
                <span>Personal hygiene products</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">✗</span>
                <span>Custom-made equipment</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">✗</span>
                <span>Software or digital products</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">✗</span>
                <span>Used or opened consumables</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">✗</span>
                <span>Items after 30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Return an Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Call or email us within 30 days of delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Approval</h3>
              <p className="text-gray-600 text-sm">We'll review and approve your return request</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Package Item</h3>
              <p className="text-gray-600 text-sm">Securely package the item with all accessories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Return & Refund</h3>
              <p className="text-gray-600 text-sm">We'll process your return and issue refund</p>
            </div>
          </div>
        </div>

        {/* Return Options */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiRefreshCw className="w-6 h-6 text-blue-500 mr-2" />
                Exchange
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Exchange for different size/model</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Upgrade to higher model</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Different color or specification</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>No additional cost for exchanges</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiPackage className="w-6 h-6 text-green-500 mr-2" />
                Refund
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Full refund to original payment</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Processing within 5-7 business days</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Email confirmation of refund</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Multiple payment method support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Return an Item?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help you with the return process. 
            Contact us today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0703416433" className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Call: 0703 416 433
            </a>
            <a href="mailto:returns@rurident.co.ke" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
              Email Returns Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}