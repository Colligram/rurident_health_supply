import React from 'react';
import { FiShield, FiTool, FiClock, FiCheckCircle, FiPhone, FiMail, FiPackage } from 'react-icons/fi';

export function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty & Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive warranty coverage and professional service support for all your dental equipment
          </p>
        </div>

        {/* Warranty Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manufacturer Warranty</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All our products come with full manufacturer warranties, ensuring your investment is protected 
              and your equipment operates at peak performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Coverage</h3>
              <p className="text-gray-600">Comprehensive warranty on parts and labor</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Extended Terms</h3>
              <p className="text-gray-600">Warranty periods from 1-5 years depending on product</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTool className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Support</h3>
              <p className="text-gray-600">Professional technicians and genuine parts</p>
            </div>
          </div>
        </div>

        {/* Warranty Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Standard Warranty */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 text-blue-500 mr-2" />
              Standard Warranty
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>1-2 years manufacturer warranty</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Parts and labor coverage</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Free repairs during warranty</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Technical support included</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-500">Applies to: Consumables, Basic Equipment</span>
            </div>
          </div>

          {/* Extended Warranty */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 text-green-500 mr-2" />
              Extended Warranty
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>3-5 years extended coverage</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Comprehensive parts coverage</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Priority service support</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Preventive maintenance included</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-500">Applies to: Dental Chairs, Advanced Equipment</span>
            </div>
          </div>
        </div>

        {/* Service Support */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Service Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <FiTool className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Installation Service</h3>
                <p className="text-gray-600 text-sm">Professional installation and setup of all equipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Preventive Maintenance</h3>
                <p className="text-gray-600 text-sm">Regular maintenance to prevent breakdowns</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPackage className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Parts Replacement</h3>
                <p className="text-gray-600 text-sm">Genuine parts replacement service</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiClock className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Repairs</h3>
                <p className="text-gray-600 text-sm">24/7 emergency repair service</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiShield className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Calibration Service</h3>
                <p className="text-gray-600 text-sm">Precision calibration for diagnostic equipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMail className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
                <p className="text-gray-600 text-sm">Expert technical assistance and training</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Process */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Warranty Claim Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Report Issue</h3>
              <p className="text-gray-600 text-sm">Contact us to report the problem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600 text-sm">Our technicians assess the issue</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Repair/Replace</h3>
              <p className="text-gray-600 text-sm">Issue resolved under warranty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Check</h3>
              <p className="text-gray-600 text-sm">Equipment tested and verified</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Warranty Service?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our warranty and service team is ready to help. Contact us for warranty claims, 
            service requests, or technical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0703416433" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Call: 0703 416 433
            </a>
            <a href="mailto:service@rurident.co.ke" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Email Service Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}