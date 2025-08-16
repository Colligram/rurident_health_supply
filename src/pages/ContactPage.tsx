import React, { useState } from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiChat, HiGlobe, HiUser, HiOfficeBuilding } from 'react-icons/hi';

export function ContactPage() {
  const [activeTab, setActiveTab] = useState('location');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container-max py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Get in touch with Kenya's leading dental equipment specialists. We're here to help with all your dental supply needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-12">
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiPhone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-3">Call us for immediate assistance</p>
            <a 
              href="tel:+254703416433" 
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              +254 703 416 433
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiMail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-3">Send us your inquiries</p>
            <a 
              href="mailto:info@ruridenthealth.co.ke" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Email Us
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.67.96.98-3.58-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.14c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.36.71.24 1.26.38 1.7.48.71.15 1.36.13 1.87.08.57-.06 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-3">Chat with us instantly</p>
            <a 
              href="https://wa.me/254703416433" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-green-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              Chat Now
            </a>
          </div>

          {/* Visit Us */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiLocationMarker className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-3">Mepalux Plaza, River Road</p>
            <a 
              href="https://maps.google.com/?q=Mepalux+Plaza+River+Road+Nairobi+Kenya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
        {/* Tabbed Content Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('location')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'location'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Location & Directions
              </button>
              <button
                onClick={() => setActiveTab('hours')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'hours'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Business Hours
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'location' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Showroom</h3>
                
                {/* Map */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819592693573!2d36.82194717475143!3d-1.2864447353544657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22c4e4d49%3A0x186a8b2f2b15a5b9!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rurident Health Supplies Location"
                  ></iframe>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Getting Here</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800">By Public Transport</h5>
                        <p className="text-gray-600 text-sm">Take matatus along River Road or CBD routes. Alight at the nearest stage to Mepalux Plaza.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">By Private Vehicle</h5>
                        <p className="text-gray-600 text-sm">We're located opposite Bata Mini Price. Limited parking available nearby.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Landmarks</h5>
                        <p className="text-gray-600 text-sm">Near Bata Mini Price, River Road, Nairobi CBD</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Full range of dental equipment on display</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Expert consultation and product demonstrations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Same-day pickup for in-stock items</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Professional technical support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Business Hours</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Monday - Friday</span>
                      <span className="text-gray-900 font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Saturday</span>
                      <span className="text-gray-900 font-semibold">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">Sunday</span>
                      <span className="text-red-600 font-semibold">Closed</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Emergency Support</h4>
                  <p className="text-blue-700">
                    For urgent dental equipment needs outside business hours, please call our emergency line: 
                    <a href="tel:+254703416433" className="font-semibold underline ml-1">+254 703 416 433</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}