import React from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiChat } from 'react-icons/hi';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help with all your dental supply needs.
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
            <p className="text-orange-600 font-medium">
              Mepalux Plaza, River Road<br/>
              3rd Floor, Suite 304<br/>
              Nairobi, Kenya
            </p>
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
      </div>
    </div>
  );
}