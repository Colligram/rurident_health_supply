import React from 'react';
import { HiTruck, HiClock, HiMapPin, HiShieldCheck } from 'react-icons/hi';

export function DeliveryInfoPage() {
  const deliveryZones = [
    {
      zone: 'Nairobi CBD & Surrounding Areas',
      time: 'Same Day Delivery',
      description: 'Orders placed before 2:00 PM will be delivered the same day',
      price: 'Free',
      icon: HiTruck
    },
    {
      zone: 'Nairobi Metropolitan Area',
      time: 'Next Day Delivery',
      description: 'Orders placed before 5:00 PM will be delivered the next business day',
      price: 'KSh 500',
      icon: HiClock
    },
    {
      zone: 'Major Cities (Mombasa, Kisumu, Nakuru)',
      time: '2-3 Business Days',
      description: 'Standard delivery to major cities across Kenya',
      price: 'KSh 1,200',
      icon: HiMapPin
    },
    {
      zone: 'Other Locations',
      time: '3-5 Business Days',
      description: 'Delivery to all other locations within Kenya',
      price: 'KSh 1,500',
      icon: HiShieldCheck
    }
  ];

  const deliveryFeatures = [
    {
      title: 'Real-time Tracking',
      description: 'Track your order from warehouse to doorstep with our advanced tracking system'
    },
    {
      title: 'SMS Notifications',
      description: 'Receive SMS updates at every stage of your delivery process'
    },
    {
      title: 'Flexible Delivery Times',
      description: 'Choose your preferred delivery time slot for better convenience'
    },
    {
      title: 'Secure Packaging',
      description: 'All items are carefully packaged to ensure safe delivery'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Delivery Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fast, reliable, and secure delivery across Kenya. We ensure your dental supplies reach you 
            safely and on time, wherever you are in the country.
          </p>
        </div>

        {/* Delivery Zones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Delivery Zones & Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deliveryZones.map((zone, index) => {
              const IconComponent = zone.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{zone.zone}</h3>
                      <div className="space-y-2">
                        <p className="text-primary-600 font-semibold">{zone.time}</p>
                        <p className="text-gray-600 text-sm">{zone.description}</p>
                        <p className="text-lg font-bold text-gray-900">{zone.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Delivery Service?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deliveryFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Our Delivery Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confirmation</h3>
              <p className="text-gray-600 text-sm">
                Receive confirmation email/SMS with order details and estimated delivery time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-2xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing</h3>
              <p className="text-gray-600 text-sm">
                Your order is carefully packed and prepared for delivery
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-2xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">On the Way</h3>
              <p className="text-gray-600 text-sm">
                Track your delivery in real-time with our tracking system
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-2xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                Receive your order safely at your doorstep
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Important Delivery Notes
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Business Days:</strong> Delivery is available Monday to Friday, excluding public holidays
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Delivery Time:</strong> We deliver between 8:00 AM and 6:00 PM
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Contact Required:</strong> Please ensure someone is available to receive the delivery
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>ID Verification:</strong> Recipients may be asked to provide identification for verification
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Delivery?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help with any delivery-related questions
          </p>
          <div className="space-x-4">
            <a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/track" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Track Your Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}