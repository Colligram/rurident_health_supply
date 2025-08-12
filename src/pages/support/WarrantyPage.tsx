import React from 'react';
import { FiShield, FiTool, FiClock, FiCheckCircle, FiPhone, FiFileText } from 'react-icons/fi';

export function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <FiShield className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Warranty Information</h1>
              <p className="text-green-100 mt-1">Comprehensive coverage for your dental equipment</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Warranty Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 text-green-500 mr-2" />
              Our Warranty Promise
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-700 mb-4">
                Rurident Health Supplies offers comprehensive warranty coverage on all dental equipment and instruments. 
                We partner with leading manufacturers to ensure you receive the best possible protection for your investment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <FiCheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Manufacturer Warranty</h3>
                  <p className="text-sm text-gray-600">Full factory warranty included</p>
                </div>
                <div className="text-center">
                  <FiTool className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Expert Service</h3>
                  <p className="text-sm text-gray-600">Certified technicians for all brands</p>
                </div>
                <div className="text-center">
                  <FiClock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Quick Response</h3>
                  <p className="text-sm text-gray-600">24-48 hour service response</p>
                </div>
              </div>
            </div>
          </section>

          {/* Warranty Periods by Category */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Coverage by Product Category</h2>
            <div className="space-y-4">
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Dental Chairs & Units</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Coverage Period</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Electric/Hydraulic Systems: 2-3 years</li>
                      <li>• Upholstery: 1-2 years</li>
                      <li>• Electronics: 1-3 years</li>
                      <li>• Accessories: 1 year</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">What's Covered</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Manufacturing defects</li>
                      <li>• Motor and pump failures</li>
                      <li>• Electronic component issues</li>
                      <li>• Free parts and labor</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3">Dental Equipment & Handpieces</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Coverage Period</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• High-speed Handpieces: 1-2 years</li>
                      <li>• Low-speed Handpieces: 1-2 years</li>
                      <li>• Surgical Equipment: 1-3 years</li>
                      <li>• Scalers & Polishers: 1-2 years</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">What's Covered</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Motor and bearing defects</li>
                      <li>• Electronic malfunctions</li>
                      <li>• Manufacturing flaws</li>
                      <li>• Calibration issues</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-3">Imaging & Diagnostic Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Coverage Period</h4>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• X-Ray Units: 2-5 years</li>
                      <li>• Intraoral Cameras: 1-3 years</li>
                      <li>• CBCT Scanners: 3-5 years</li>
                      <li>• Software: 1 year</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">What's Covered</h4>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• Hardware components</li>
                      <li>• Sensor and detector issues</li>
                      <li>• Software bugs and updates</li>
                      <li>• Calibration services</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-3">Sterilization Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">Coverage Period</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Autoclaves: 2-3 years</li>
                      <li>• Ultrasonic Cleaners: 1-2 years</li>
                      <li>• Sealing Machines: 1-2 years</li>
                      <li>• UV Sterilizers: 1 year</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">What's Covered</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Heating elements</li>
                      <li>• Pressure systems</li>
                      <li>• Control electronics</li>
                      <li>• Safety mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Warranty Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Claim Warranty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Warranty Claim Process</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">1</span>
                    <div>
                      <strong>Contact Support:</strong> Call our warranty hotline or email service department
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">2</span>
                    <div>
                      <strong>Provide Information:</strong> Share purchase details, model number, and issue description
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">3</span>
                    <div>
                      <strong>Schedule Service:</strong> We'll arrange on-site or pickup service
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">4</span>
                    <div>
                      <strong>Diagnosis & Repair:</strong> Certified technician will diagnose and fix the issue
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold mr-3 mt-0.5">5</span>
                    <div>
                      <strong>Quality Check:</strong> Equipment tested and returned to service
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Required Documentation</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                  <div className="flex items-center">
                    <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Original purchase invoice</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Warranty registration (if applicable)</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Product serial number</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Description of the problem</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Photos/videos of the issue (if helpful)</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 mt-6">Service Options</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>On-site Service:</strong> For large equipment and installations</p>
                  <p><strong>Pickup & Return:</strong> For portable equipment and instruments</p>
                  <p><strong>Express Service:</strong> Priority handling for critical equipment</p>
                  <p><strong>Remote Diagnosis:</strong> Software and connectivity issues</p>
                </div>
              </div>
            </div>
          </section>

          {/* What's NOT Covered */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Exclusions</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium mb-3">
                Please note that the following items are NOT covered under warranty:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Damage due to misuse or abuse</li>
                  <li>• Normal wear and tear items</li>
                  <li>• Damage from improper installation</li>
                  <li>• Unauthorized repairs or modifications</li>
                  <li>• Acts of nature (floods, earthquakes)</li>
                </ul>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Consumable parts (belts, filters, bulbs)</li>
                  <li>• Damage from power surges</li>
                  <li>• Software issues due to user error</li>
                  <li>• Cosmetic damage not affecting function</li>
                  <li>• Equipment used beyond specifications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Extended Warranty */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Extended Warranty Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Silver Plan</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Extends manufacturer warranty by 1 additional year
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Extended parts coverage</li>
                  <li>• Priority service scheduling</li>
                  <li>• Phone support included</li>
                  <li>• Annual maintenance check</li>
                </ul>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Gold Plan</h3>
                <p className="text-sm text-blue-600 mb-3">
                  Comprehensive coverage with preventive maintenance
                </p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Extended parts & labor</li>
                  <li>• Bi-annual maintenance</li>
                  <li>• On-site service included</li>
                  <li>• Loaner equipment available</li>
                </ul>
              </div>
              
              <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Platinum Plan</h3>
                <p className="text-sm text-purple-600 mb-3">
                  Complete protection with upgrade options
                </p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• Comprehensive coverage</li>
                  <li>• Quarterly maintenance</li>
                  <li>• Equipment upgrades</li>
                  <li>• 24/7 emergency support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Support</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <FiPhone className="w-5 h-5 text-green-500 mr-2" />
                    Warranty Hotline
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📞 0703 416 433 (Primary)</p>
                    <p>📞 0795 202 687 (Alternative)</p>
                    <p>✉️ warranty@ruridenthealth.co.ke</p>
                    <p>🕒 Mon-Fri: 8:00 AM - 6:00 PM</p>
                    <p>🕒 Sat: 9:00 AM - 2:00 PM</p>
                    <p>🆘 Emergency: 24/7 for critical equipment</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Centers</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">Nairobi Service Center</p>
                      <p>Mepalux Plaza, River Road</p>
                      <p>Suite 304, 3rd Floor</p>
                    </div>
                    <div>
                      <p className="font-medium">Mobile Service</p>
                      <p>On-site service available</p>
                      <p>Covering entire Kenya</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}