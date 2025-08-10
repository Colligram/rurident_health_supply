import React from 'react';
import { HiRefresh, HiShieldCheck, HiClock, HiPhone } from 'react-icons/hi';

export function ReturnsPage() {
  const returnSteps = [
    {
      step: '1',
      title: 'Contact Support',
      description: 'Reach out to our customer service team within 30 days of delivery',
      icon: HiPhone
    },
    {
      step: '2',
      title: 'Get Return Authorization',
      description: 'We\'ll provide you with a return authorization number and shipping label',
      icon: HiShieldCheck
    },
    {
      step: '3',
      title: 'Package & Ship',
      description: 'Securely package the item and ship it back using our provided label',
      icon: HiRefresh
    },
    {
      step: '4',
      title: 'Refund Processed',
      description: 'Once received and inspected, your refund will be processed within 5-7 business days',
      icon: HiClock
    }
  ];

  const returnConditions = [
    {
      title: 'Eligible for Returns',
      items: [
        'Items received damaged or defective',
        'Wrong items shipped',
        'Items not as described',
        'Manufacturing defects'
      ]
    },
    {
      title: 'Not Eligible for Returns',
      items: [
        'Items used or opened (unless defective)',
        'Custom or personalized items',
        'Items purchased on clearance or sale',
        'Consumable items (unless defective)',
        'Items returned after 30 days'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, 
            we offer a hassle-free 30-day return policy with full refund or exchange.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <HiRefresh className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              30-Day Return Policy
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We stand behind the quality of our products. If you're not completely satisfied, 
              return your purchase within 30 days for a full refund or exchange.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Free Returns</h3>
                <p className="text-gray-600 text-sm">We cover return shipping costs</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Full Refund</h3>
                <p className="text-gray-600 text-sm">100% money back guarantee</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Processing</h3>
                <p className="text-gray-600 text-sm">Refunds processed in 5-7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Return an Item
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return Conditions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Return Conditions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {returnConditions.map((condition, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{condition.title}</h3>
                <ul className="space-y-2">
                  {condition.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        index === 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Refund Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Refund Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Original payment method (credit/debit card)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">M-Pesa refund (for M-Pesa payments)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Bank transfer (for bank payments)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Return received: Same day</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Inspection: 1-2 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Refund processed: 5-7 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Exchange Policy
          </h2>
          <div className="text-center">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Prefer to exchange your item instead of getting a refund? We're happy to help! 
              Exchanges are processed the same way as returns, and you can choose any item of equal or lesser value. 
              If the new item costs more, you'll only pay the difference.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <strong>Same Item, Different Size/Color</strong>
                <p className="text-gray-600 mt-1">Free exchange</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>Different Item, Same Value</strong>
                <p className="text-gray-600 mt-1">Free exchange</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>Upgrade to Higher Value</strong>
                <p className="text-gray-600 mt-1">Pay the difference</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Returns?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help with any return-related questions
          </p>
          <div className="space-x-4">
            <a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="tel:0703416433" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Call Us: 0703 416 433
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}