import React, { useState } from 'react';
import { FiSearch, FiHelpCircle, FiBook, FiTool, FiPhone, FiMail, FiClock, FiChevronDown, FiChevronRight } from 'react-icons/fi';

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'Orders & Payment',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order through our website by adding items to your cart and proceeding to checkout. You can also call us directly at 0703 416 433 or visit our showroom in Nairobi.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept M-Pesa, bank transfers, credit/debit cards (Visa, Mastercard), and cash on delivery for orders within Nairobi. For institutional orders, we also offer net payment terms.'
        },
        {
          question: 'Can I cancel or modify my order?',
          answer: 'Orders can be cancelled or modified within 2 hours of placement. After this time, please contact our customer service team and we\'ll do our best to accommodate your request.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      faqs: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by location: Nairobi CBD (2-4 hours), Greater Nairobi (6-24 hours), Major towns (1-3 business days), Remote areas (3-7 business days).'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free shipping within Nairobi CBD for orders over KSH 5,000, and free nationwide shipping for orders over KSH 50,000.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely! You\'ll receive a tracking number via SMS and email once your order ships. You can also track your order on our website using your order number.'
        }
      ]
    },
    {
      title: 'Products & Equipment',
      faqs: [
        {
          question: 'Are your products genuine?',
          answer: 'Yes, all our products are 100% genuine and sourced directly from authorized manufacturers and distributors. Every item comes with a manufacturer warranty.'
        },
        {
          question: 'Do you provide installation services?',
          answer: 'Yes, we offer professional installation services for dental chairs, equipment, and complex systems. Installation is included for most major equipment purchases.'
        },
        {
          question: 'What if a product is out of stock?',
          answer: 'If an item is out of stock, you can request to be notified when it\'s available. We typically restock popular items within 1-2 weeks.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'Do you provide technical support?',
          answer: 'Yes, we have certified technicians who provide technical support for all equipment we sell. Support includes phone assistance, on-site service, and emergency repairs.'
        },
        {
          question: 'How do I schedule a service call?',
          answer: 'You can schedule a service call by calling our technical support line at 0703 416 433, emailing service@ruridenthealth.co.ke, or submitting a request through our website.'
        },
        {
          question: 'Do you service equipment not purchased from you?',
          answer: 'Yes, our technicians can service most dental equipment brands, even if not purchased from us. Service rates and parts availability may vary.'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Track Your Order', icon: <FiSearch />, href: '/track', description: 'Get real-time updates on your delivery' },
    { title: 'Returns & Refunds', icon: <FiTool />, href: '/returns', description: 'Learn about our return policy' },
    { title: 'Warranty Information', icon: <FiBook />, href: '/warranty', description: 'Understand your coverage' },
    { title: 'Delivery Information', icon: <FiClock />, href: '/delivery', description: 'Shipping zones and times' }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-8 mb-8">
        <div className="text-center">
          <FiHelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Help Center</h1>
          <p className="text-xl text-green-100">How can we help you today?</p>
        </div>
        
        {/* Search Bar */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, FAQs, or topics..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Links */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-xl">{link.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{link.title}</h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* FAQ Sections */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      return (
                        <div key={faqIndex}>
                          <button
                            onClick={() => toggleFAQ(globalIndex)}
                            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{faq.question}</h4>
                              {expandedFAQ === globalIndex ? (
                                <FiChevronDown className="w-5 h-5 text-gray-500" />
                              ) : (
                                <FiChevronRight className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </button>
                          {expandedFAQ === globalIndex && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone Support</h4>
                  <p className="text-sm text-gray-600">0703 416 433</p>
                  <p className="text-sm text-gray-600">0795 202 687</p>
                  <p className="text-xs text-gray-500">Mon-Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Support</h4>
                  <p className="text-sm text-gray-600">support@ruridenthealth.co.ke</p>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FiClock className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Emergency Support</h4>
                  <p className="text-sm text-gray-600">24/7 for critical equipment</p>
                  <p className="text-xs text-gray-500">Additional charges may apply</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                How to maintain your dental chair
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Setting up your sterilization workflow
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Choosing the right handpiece for your practice
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Understanding dental imaging regulations in Kenya
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Student kit essentials for dental school
              </a>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Services</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Equipment Sales & Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Professional Installation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Technical Support & Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Training & Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Equipment Financing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Practice Setup Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}