import React from 'react';
import { HiShieldCheck, HiInformationCircle, HiPhone, HiMail } from 'react-icons/hi';

export function WarrantyPage() {
  const warrantyTypes = [
    {
      title: 'Manufacturer Warranty',
      description: 'Coverage provided directly by the product manufacturer',
      coverage: [
        'Defects in materials and workmanship',
        'Manufacturing faults',
        'Product functionality issues',
        'Parts replacement (if applicable)'
      ],
      duration: 'Varies by product (typically 1-3 years)',
      provider: 'Product Manufacturer',
      icon: HiShieldCheck
    },
    {
      title: 'Seller Support',
      description: 'Assistance and guidance from Rurident Health Supplies',
      coverage: [
        'Product information and guidance',
        'Installation support',
        'Usage instructions',
        'Technical assistance',
        'Contact with manufacturer'
      ],
      duration: 'Ongoing support',
      provider: 'Rurident Health Supplies',
      icon: HiInformationCircle
    }
  ];

  const warrantyProcess = [
    {
      step: '1',
      title: 'Identify the Issue',
      description: 'Determine if the problem is covered under warranty'
    },
    {
      step: '2',
      title: 'Contact Rurident',
      description: 'Reach out to us for guidance and manufacturer contact information'
    },
    {
      step: '3',
      title: 'Manufacturer Contact',
      description: 'Contact the manufacturer directly with warranty claims'
    },
    {
      step: '4',
      title: 'Follow Manufacturer Process',
      description: 'Complete the manufacturer\'s warranty process and requirements'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Warranty Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding warranty coverage is important. All warranty claims are handled directly 
            by the product manufacturer, while we provide ongoing support and guidance.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start space-x-4">
            <HiInformationCircle className="h-8 w-8 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                Important: Warranty is with Manufacturer, Not Seller
              </h2>
              <p className="text-yellow-700 leading-relaxed">
                <strong>Please note:</strong> All warranty coverage is provided directly by the product manufacturer, 
                not by Rurident Health Supplies. We act as your advocate and provide guidance, but warranty claims, 
                repairs, and replacements are processed through the manufacturer's warranty system.
              </p>
            </div>
          </div>
        </div>

        {/* Warranty Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding Warranty Coverage
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {warrantyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Coverage Includes:</h4>
                    <ul className="space-y-1">
                      {type.coverage.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Duration:</span>
                      <p className="text-gray-600">{type.duration}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Provider:</span>
                      <p className="text-gray-600">{type.provider}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warranty Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Handle Warranty Claims
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-2xl">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do vs What We Don't */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What We Do vs What We Don't Handle
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <HiShieldCheck className="h-6 w-6 mr-2" />
                What We Do Handle
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 text-sm">Provide manufacturer contact information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 text-sm">Guide you through warranty processes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 text-sm">Assist with documentation requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 text-sm">Follow up on your behalf if needed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 text-sm">Provide technical support and guidance</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
                <HiInformationCircle className="h-6 w-6 mr-2" />
                What We Don't Handle
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">Direct warranty repairs or replacements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">Warranty claim decisions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">Product replacement under warranty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">Warranty coverage disputes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-red-700 text-sm">Manufacturer warranty terms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Warranty Questions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Warranty Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Q: Why can't Rurident handle warranty claims directly?
              </h3>
              <p className="text-gray-600">
                A: Warranty coverage is a contract between you and the manufacturer. We don't have the authority 
                to make warranty decisions or provide warranty services. However, we provide full support and 
                guidance throughout the process.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Q: What if the manufacturer denies my warranty claim?
              </h3>
              <p className="text-gray-600">
                A: We can help you understand the manufacturer's decision and explore alternative solutions. 
                In some cases, we may be able to offer special pricing on replacement items.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Q: How long does the warranty process usually take?
              </h3>
              <p className="text-gray-600">
                A: This varies by manufacturer and the nature of the issue. Simple claims may be resolved 
                in a few days, while complex repairs might take several weeks. We'll help you track the progress.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Q: Can you help me understand my warranty coverage?
              </h3>
              <p className="text-gray-600">
                A: Absolutely! We can help you understand what's typically covered under warranty for your 
                specific product and guide you to the manufacturer's warranty documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Warranty?
          </h2>
          <p className="text-gray-600 mb-6">
            We're here to help guide you through the warranty process and provide support
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