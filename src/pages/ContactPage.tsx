import React from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiChat, HiMap } from 'react-icons/hi';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Contact Us & Visit Our Store
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
              Get in touch with our team or visit our store in Nairobi. We're here to help with all your dental supply needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {/* Contact Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiPhone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4 mobile-friendly">Speak directly with our team</p>
            <a 
              href="tel:0703416433" 
              className="text-orange-600 hover:text-orange-700 font-medium text-lg sm:text-xl"
            >
              0703 416 433
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiMail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4 mobile-friendly">Send us your inquiries</p>
            <a 
              href="mailto:info@rurident.co.ke" 
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              info@rurident.co.ke
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiLocationMarker className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4 mobile-friendly">Come to our physical store</p>
            <div className="text-orange-600 font-medium space-y-1">
              <p>Rurident Health Supplies</p>
              <p>Mepalux Plaza, River Road</p>
              <p>3rd Floor, Suite 304</p>
              <p>Nairobi, Kenya</p>
              <div className="mt-3 space-y-1 text-sm">
                <p>Additional Phones:</p>
                <a href="tel:0795202687" className="block hover:text-orange-700">0795 202 687</a>
                <a href="tel:0746280715" className="block hover:text-orange-700">0746 280 715</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input-field"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input-field"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input-field"
                  placeholder="+254 700 000 000"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="input-field"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell us about your dental supply needs..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium mobile-button rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-6 lg:space-y-8">
            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <HiClock className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2 mobile-friendly">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <HiChat className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Quick Support</h3>
              </div>
              <p className="text-gray-600 mb-4 mobile-friendly">
                Need immediate assistance? Our team is ready to help with product recommendations, 
                orders, and technical support.
              </p>
              <div className="space-y-3">
                <a 
                  href="tel:0703416433"
                  className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white mobile-button rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  <HiPhone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a 
                  href="mailto:info@rurident.co.ke"
                  className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white mobile-button rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <HiMail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Location Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Find Us on the Map
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Nairobi for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-96 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819592693573!2d36.82194717475143!3d-1.2864447353544657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22c4e4d49%3A0x186a8b2f2b15a5b9!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rurident Health Supplies Location"
                  ></iframe>
                </div>
                
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Click map to open in Google Maps</span>
                    <a
                      href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Here & Quick Actions */}
            <div className="space-y-6">
              {/* Getting Here */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <HiMap className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Getting Here</h3>
                </div>
                <div className="space-y-3 text-sm mobile-friendly">
                  <p><strong>By Matatu:</strong> Take matatus plying the CBD route and alight at the nearest stage to our location.</p>
                  <p><strong>By Car:</strong> We're located opposite Bata Mini Price. Parking is available nearby.</p>
                  <p><strong>Landmarks:</strong> Near Bata Mini Price, Suite 304</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Your Visit</h3>
                <div className="space-y-3">
                  <a
                    href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white mobile-button rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                  >
                    <HiLocationMarker className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                  
                  <a
                    href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya&t=k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 text-white mobile-button rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
                  >
                    <HiMap className="h-4 w-4 mr-2" />
                    Satellite View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}