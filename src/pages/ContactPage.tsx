import React from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiChat } from 'react-icons/hi';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Information */}
      <div className="container-max py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Quick Support - now top left, includes Email */}
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
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/254703416433"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white mobile-button rounded-lg font-medium hover:bg-green-600 transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.67.96.98-3.58-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.14c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.36.71.24 1.26.38 1.7.48.71.15 1.36.13 1.87.08.57-.06 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/></svg>
                WhatsApp
              </a>
              {/* Email Button */}
              <a
                href="mailto:info@rurident.co.ke"
                className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white mobile-button rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                <HiMail className="h-4 w-4 mr-2" />
                Email Us
              </a>
            </div>
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
            {/* Getting Here */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Here</h3>
              <div className="space-y-3 text-gray-600">
                <p><strong>By Matatu:</strong> Take matatus plying the CBD route and alight at the nearest stage to our location.</p>
                <p><strong>By Car:</strong> We're located opposite Bata Mini Price. Parking is available nearby.</p>
                <p><strong>Landmarks:</strong> Near Bata Mini Price, Suite 304</p>
              </div>
            </div>
            {/* Store Information */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <HiLocationMarker className="text-orange-600 h-5 w-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      Rurident Health Supplies<br />
                      Mepalux Plaza, River Road<br />
                      3rd Floor, Suite 304<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Google Maps Section and Plan Your Visit */}
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
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Get Directions →
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Your Visit</h3>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <a
                  href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Get Directions
                </a>
                {/* Removed CALL US button here */}
                <a
                  href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya&t=k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Satellite View
                </a>
              </div>
              {/* Store Information */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <HiLocationMarker className="text-orange-600 h-5 w-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">
                        Rurident Health Supplies<br />
                        Mepalux Plaza, River Road<br />
                        3rd Floor, Suite 304<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}