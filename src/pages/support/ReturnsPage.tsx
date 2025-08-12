import React from 'react';
import { FiRotateCcw, FiClock, FiPackage, FiCheckCircle, FiAlertCircle, FiShield } from 'react-icons/fi';

export function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <FiRotateCcw className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Returns & Refunds</h1>
              <p className="text-blue-100 mt-1">Easy returns with 30-day guarantee</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Return Policy Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 text-blue-500 mr-2" />
              Our Return Policy
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700 mb-4">
                At Rurident Health Supplies, we stand behind the quality of our products. We offer a comprehensive 30-day return policy for most items, with special conditions for certain product categories.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <FiClock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">30-Day Window</h3>
                  <p className="text-sm text-gray-600">Return items within 30 days of delivery</p>
                </div>
                <div className="text-center">
                  <FiPackage className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Original Packaging</h3>
                  <p className="text-sm text-gray-600">Items must be in original, unopened packaging</p>
                </div>
                <div className="text-center">
                  <FiCheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Quick Processing</h3>
                  <p className="text-sm text-gray-600">Refunds processed within 5-7 business days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Categories */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Eligibility by Category</h2>
            <div className="space-y-4">
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <FiCheckCircle className="w-5 h-5 mr-2" />
                  Fully Returnable (30 Days)
                </h3>
                <ul className="text-sm text-green-700 space-y-1 ml-7">
                  <li>• Dental instruments (unopened)</li>
                  <li>• Dental chairs and equipment (unused)</li>
                  <li>• Orthodontic supplies (sealed packaging)</li>
                  <li>• Laboratory equipment</li>
                  <li>• Student kits (complete, unopened)</li>
                </ul>
              </div>
              
              <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <FiAlertCircle className="w-5 h-5 mr-2" />
                  Restricted Returns (14 Days)
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1 ml-7">
                  <li>• Sterilization equipment (unused, original packaging)</li>
                  <li>• Imaging equipment (subject to inspection)</li>
                  <li>• Software and digital products</li>
                  <li>• Custom-ordered items</li>
                </ul>
              </div>
              
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                  <FiAlertCircle className="w-5 h-5 mr-2" />
                  Non-Returnable Items
                </h3>
                <ul className="text-sm text-red-700 space-y-1 ml-7">
                  <li>• Disposable consumables (gloves, masks, etc.)</li>
                  <li>• Opened pharmaceutical products</li>
                  <li>• Personalized or engraved items</li>
                  <li>• Items with broken seals or used</li>
                  <li>• Final sale items</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Return Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Step-by-Step Process</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">1</span>
                    <div>
                      <strong>Contact Us:</strong> Call 0703 416 433 or email returns@ruridenthealth.co.ke
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">2</span>
                    <div>
                      <strong>Get RMA Number:</strong> We'll provide a Return Merchandise Authorization number
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">3</span>
                    <div>
                      <strong>Package Items:</strong> Use original packaging and include RMA number
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">4</span>
                    <div>
                      <strong>Ship or Drop-off:</strong> Send to our facility or arrange pickup
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">5</span>
                    <div>
                      <strong>Receive Refund:</strong> Processed within 5-7 business days after inspection
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Return Address</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <p className="font-semibold">Rurident Health Supplies</p>
                  <p>Returns Department</p>
                  <p>Mepalux Plaza, 3rd Floor</p>
                  <p>River Road, Suite 304</p>
                  <p>Nairobi, Kenya</p>
                  <p className="mt-2 text-gray-600">
                    <strong>Note:</strong> Include RMA number on package
                  </p>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 mt-6">Refund Methods</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Original payment method (cards)</li>
                  <li>• M-Pesa (for M-Pesa payments)</li>
                  <li>• Bank transfer (for bank payments)</li>
                  <li>• Store credit (optional)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Special Circumstances */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Special Circumstances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Damaged Items</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Items damaged during shipping are eligible for immediate return/replacement.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Report within 48 hours of delivery</li>
                  <li>• Photo documentation required</li>
                  <li>• Free return shipping provided</li>
                  <li>• Priority replacement processing</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Wrong Item Sent</h3>
                <p className="text-sm text-gray-600 mb-2">
                  If we sent the wrong item, we'll make it right immediately.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Free return and replacement</li>
                  <li>• Expedited shipping for correct item</li>
                  <li>• No restocking fees</li>
                  <li>• Compensation for inconvenience</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Equipment Installation Issues</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Professional support for equipment setup problems.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Free technical support</li>
                  <li>• On-site assistance available</li>
                  <li>• Return if unresolvable</li>
                  <li>• Alternative product recommendations</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Bulk Order Returns</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Special handling for institutional and bulk purchases.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Extended return window</li>
                  <li>• Partial returns accepted</li>
                  <li>• Account manager support</li>
                  <li>• Custom return arrangements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help with Returns?</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Returns Hotline</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📞 0703 416 433 (Primary)</p>
                    <p>📞 0795 202 687 (Alternative)</p>
                    <p>✉️ returns@ruridenthealth.co.ke</p>
                    <p>🕒 Mon-Fri: 8:00 AM - 6:00 PM</p>
                    <p>🕒 Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What You'll Need</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Order number</li>
                    <li>• Item SKU or product name</li>
                    <li>• Reason for return</li>
                    <li>• Photos (if damaged/defective)</li>
                    <li>• Original packaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}