import React from 'react';
import { FiTruck, FiClock, FiMapPin, FiPackage, FiPhone, FiShield } from 'react-icons/fi';

export function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <FiTruck className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Delivery Information</h1>
              <p className="text-orange-100 mt-1">Fast, reliable delivery across Kenya</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Delivery Zones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiMapPin className="w-6 h-6 text-orange-500 mr-2" />
              Delivery Zones & Timeframes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Nairobi CBD & Surrounding Areas</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>2-4 hours (Same Day)</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CBD, Westlands, Karen, Kilimani</li>
                  <li>• Lavington, Kileleshwa, Parklands</li>
                  <li>• Industrial Area, South B & C</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Greater Nairobi</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>6-24 hours</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kasarani, Kahawa, Thika Road</li>
                  <li>• Ngong Road, Rongai, Kikuyu</li>
                  <li>• Ruiru, Juja, Kiambu</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Major Towns</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>1-3 business days</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mombasa, Kisumu, Nakuru</li>
                  <li>• Eldoret, Thika, Machakos</li>
                  <li>• Nyeri, Meru, Kitale</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Remote Areas</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>3-7 business days</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Rural areas and remote counties</li>
                  <li>• Northern Kenya regions</li>
                  <li>• Coastal towns beyond Mombasa</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery Costs */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiPackage className="w-6 h-6 text-orange-500 mr-2" />
              Delivery Costs
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Standard Delivery</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Nairobi CBD: <span className="font-medium text-green-600">Free for orders ≥ KSH 5,000</span></li>
                    <li>• Nairobi CBD: <span className="font-medium">KSH 300 for orders < KSH 5,000</span></li>
                    <li>• Greater Nairobi: <span className="font-medium">KSH 500 - KSH 800</span></li>
                    <li>• Major Towns: <span className="font-medium">KSH 800 - KSH 1,500</span></li>
                    <li>• Remote Areas: <span className="font-medium">KSH 1,500 - KSH 3,000</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Express Delivery</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Same Day (Nairobi): <span className="font-medium">KSH 1,000</span></li>
                    <li>• Next Day (Major Towns): <span className="font-medium">KSH 1,800</span></li>
                    <li>• Express equipment delivery available</li>
                    <li>• Emergency dental supplies rush service</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Free Delivery:</strong> Orders above KSH 50,000 qualify for free delivery nationwide!
                </p>
              </div>
            </div>
          </section>

          {/* Special Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 text-orange-500 mr-2" />
              Special Delivery Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">White Glove Service</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Premium delivery for dental chairs and large equipment
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Professional installation</li>
                  <li>• Equipment setup & testing</li>
                  <li>• Training included</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Cold Chain</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Temperature-controlled delivery for sensitive materials
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Refrigerated transport</li>
                  <li>• Temperature monitoring</li>
                  <li>• Compliance documentation</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Bulk Orders</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Special handling for large institutional orders
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Scheduled deliveries</li>
                  <li>• Multiple drop-offs</li>
                  <li>• Inventory management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiPhone className="w-6 h-6 text-orange-500 mr-2" />
              Delivery Support
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Get real-time updates on your delivery status
                  </p>
                  <a 
                    href="/track" 
                    className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Track Order
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📞 0703 416 433</p>
                    <p>📞 0795 202 687</p>
                    <p>✉️ delivery@ruridenthealth.co.ke</p>
                    <p>🕒 Mon-Fri: 8:00 AM - 6:00 PM</p>
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