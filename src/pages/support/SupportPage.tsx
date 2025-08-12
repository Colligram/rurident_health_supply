import React from 'react';
import { FiHeadphones, FiMail, FiPhone, FiMapPin, FiClock, FiTool, FiBook, FiUsers, FiAward } from 'react-icons/fi';

export function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-8 mb-8">
        <div className="text-center">
          <FiHeadphones className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Customer Support</h1>
          <p className="text-xl text-purple-100">We're here to help you succeed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Methods */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FiPhone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-sm text-gray-600">Immediate assistance</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Primary:</strong> 0703 416 433</p>
                  <p><strong>Alternative:</strong> 0795 202 687</p>
                  <p><strong>Emergency:</strong> 0746 280 715</p>
                  <p><strong>Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                    <p className="text-sm text-gray-600">Detailed assistance</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>General:</strong> support@ruridenthealth.co.ke</p>
                  <p><strong>Technical:</strong> service@ruridenthealth.co.ke</p>
                  <p><strong>Sales:</strong> sales@ruridenthealth.co.ke</p>
                  <p><strong>Response:</strong> Within 24 hours</p>
                  <p><strong>Priority:</strong> Within 4 hours</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FiMapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visit Our Office</h3>
                    <p className="text-sm text-gray-600">In-person support</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Mepalux Plaza, 3rd Floor</p>
                  <p>River Road, Suite 304</p>
                  <p>Opposite Bata Mini Price</p>
                  <p>Nairobi, Kenya</p>
                  <p><strong>Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FiTool className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Field Service</h3>
                    <p className="text-sm text-gray-600">On-site support</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Coverage:</strong> Nationwide</p>
                  <p><strong>Response:</strong> 24-48 hours</p>
                  <p><strong>Emergency:</strong> Same day (Nairobi)</p>
                  <p><strong>Services:</strong> Installation, Repair, Maintenance</p>
                  <p><strong>Certified:</strong> All major brands</p>
                </div>
              </div>
            </div>
          </section>

          {/* Support Categories */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Can Help</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Equipment installation and setup</li>
                    <li>• Troubleshooting and diagnostics</li>
                    <li>• Software configuration and updates</li>
                    <li>• Preventive maintenance scheduling</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Emergency repair services</li>
                    <li>• Parts ordering and replacement</li>
                    <li>• Performance optimization</li>
                    <li>• Compliance and safety checks</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Product selection guidance</li>
                    <li>• Compatibility assessments</li>
                    <li>• Feature demonstrations</li>
                    <li>• Training and education</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Usage best practices</li>
                    <li>• Maintenance instructions</li>
                    <li>• Upgrade recommendations</li>
                    <li>• Warranty claims assistance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Practice setup consultation</li>
                    <li>• Equipment financing options</li>
                    <li>• Bulk purchase discounts</li>
                    <li>• Inventory management</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Regulatory compliance guidance</li>
                    <li>• Staff training programs</li>
                    <li>• Workflow optimization</li>
                    <li>• Account management</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Service Level Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Service Commitment</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Response Times</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <FiClock className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-sm text-gray-600">Immediate response during business hours</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <FiMail className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-sm text-gray-600">24-hour response guarantee</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <FiTool className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Field Service</h4>
                    <p className="text-sm text-gray-600">24-48 hour on-site response</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/track" className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Track Your Order
              </a>
              <a href="/warranty" className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Warranty Claim
              </a>
              <a href="/returns" className="block w-full bg-orange-500 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Return Product
              </a>
              <a href="/help" className="block w-full bg-purple-500 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                Browse Help Center
              </a>
            </div>
          </div>

          {/* Support Team */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiUsers className="w-5 h-5 mr-2" />
              Our Support Team
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">Technical Specialists</h4>
                <p>Certified technicians for all major dental equipment brands</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Product Experts</h4>
                <p>Deep knowledge of dental practice workflows and equipment</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Customer Success</h4>
                <p>Dedicated to ensuring your complete satisfaction</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiAward className="w-5 h-5 mr-2" />
              Certifications
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>ISO 9001:2015 Quality Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Authorized Service Centers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Factory Trained Technicians</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Kenya Association of Medical Equipment</span>
              </div>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Emergency Support</h3>
            <p className="text-sm text-red-700 mb-3">
              For critical equipment failures affecting patient care:
            </p>
            <div className="space-y-2 text-sm text-red-700">
              <p><strong>24/7 Hotline:</strong> 0746 280 715</p>
              <p><strong>Emergency Email:</strong> emergency@ruridenthealth.co.ke</p>
              <p><strong>Response:</strong> Within 2 hours (Nairobi)</p>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-xs text-red-600">
                Emergency service charges apply. Critical equipment failures only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}