
import React from 'react';
import { HiLocationMarker, HiPhone, HiClock, HiMail } from 'react-icons/hi';

export function LocationPage() {
  return (
    <div className="container-max section-padding">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Visit Our Store
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find us at our convenient location in Nairobi. We're here to serve all your dental supply needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Store Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <HiLocationMarker className="text-primary-600 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    Rurident Health Supplies<br />
                    Opp. Bata Mini Price, Suite 304<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HiPhone className="text-primary-600 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                  <div className="space-y-1">
                    <a href="tel:0703416433" className="text-gray-600 hover:text-primary-600 block">
                      0703 416 433
                    </a>
                    <a href="tel:0795202687" className="text-gray-600 hover:text-primary-600 block">
                      0795 202 687
                    </a>
                    <a href="tel:0746280715" className="text-gray-600 hover:text-primary-600 block">
                      0746 280 715
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HiClock className="text-primary-600 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HiMail className="text-primary-600 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:info@ruridenthealth.co.ke" className="text-gray-600 hover:text-primary-600">
                    info@ruridenthealth.co.ke
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Here</h3>
            <div className="space-y-3 text-gray-600">
              <p><strong>By Matatu:</strong> Take matatus plying the CBD route and alight at the nearest stage to our location.</p>
              <p><strong>By Car:</strong> We're located opposite Bata Mini Price. Parking is available nearby.</p>
              <p><strong>Landmarks:</strong> Near Bata Mini Price, Suite 304</p>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="card overflow-hidden">
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
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Controls */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Your Visit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center"
          >
            Get Directions
          </a>
          
          <a
            href="tel:0703416433"
            className="btn-secondary text-center"
          >
            Call Us
          </a>
          
          <a
            href="https://maps.google.com/?q=Rurident+Health+Supplies+Nairobi+Kenya&t=k"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center"
          >
            Satellite View
          </a>
        </div>
      </div>
    </div>
  );
}
