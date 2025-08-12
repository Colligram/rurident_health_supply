import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronRight, FiHelpCircle, FiShoppingCart, FiPackage, FiCreditCard, FiTruck, FiShield, FiUser, FiSettings } from 'react-icons/fi';

export function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isExpanded = (index: number) => expandedFaqs.includes(index);

  const faqCategories = [
    {
      title: 'Shopping & Orders',
      icon: <FiShoppingCart className="w-6 h-6" />,
      color: 'text-blue-600',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'Browse our products, add items to your cart, and proceed to checkout. You can pay using M-Pesa, bank transfer, or cash on delivery.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept M-Pesa, bank transfers, and cash on delivery for orders within Kenya. International orders can be paid via bank transfer.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. Contact our customer service team immediately for assistance.'
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes, we offer volume discounts for bulk orders. Contact our sales team for custom pricing on large quantities.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: <FiTruck className="w-6 h-6" />,
      color: 'text-green-600',
      faqs: [
        {
          question: 'How long does delivery take?',
          answer: 'Express delivery: 1-2 business days. Standard delivery: 3-5 business days. Free delivery: 5-7 business days for orders over Ksh 50,000.'
        },
        {
          question: 'Which areas do you deliver to?',
          answer: 'We deliver nationwide across Kenya, including major cities like Nairobi, Mombasa, Kisumu, Nakuru, and all county headquarters.'
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we ship to East African countries. International shipping takes 7-14 business days depending on the destination.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Use our order tracking system on the website or contact customer service with your order number for real-time updates.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      icon: <FiPackage className="w-6 h-6" />,
      color: 'text-orange-600',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and accompanied by proof of purchase.'
        },
        {
          question: 'Which items cannot be returned?',
          answer: 'Personal hygiene items, custom-made products, and items marked as non-returnable cannot be returned for health and safety reasons.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned items.'
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes, you can exchange items for different sizes, colors, or models within the 30-day return period.'
        }
      ]
    },
    {
      title: 'Product Information',
      icon: <FiHelpCircle className="w-6 h-6" />,
      color: 'text-purple-600',
      faqs: [
        {
          question: 'Are your products genuine?',
          answer: 'Yes, all our products are 100% genuine and come with manufacturer warranties. We only source from authorized distributors.'
        },
        {
          question: 'Do you offer product warranties?',
          answer: 'All products come with manufacturer warranties. We also offer extended warranty options for additional protection.'
        },
        {
          question: 'Can I get product demonstrations?',
          answer: 'Yes, we offer product demonstrations at our showroom in Nairobi. Contact us to schedule an appointment.'
        },
        {
          question: 'Do you have student discounts?',
          answer: 'Yes, we offer special pricing for dental students. Please provide valid student ID for verification.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: <FiUser className="w-6 h-6" />,
      color: 'text-indigo-600',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" on our website, fill in your details, and verify your email address to activate your account.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Use the "Forgot Password" link on the login page. We\'ll send a reset link to your registered email address.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption to protect your personal and payment information. We never share your data with third parties.'
        },
        {
          question: 'Can I save multiple delivery addresses?',
          answer: 'Yes, you can save multiple delivery addresses in your account and choose the appropriate one during checkout.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: <FiSettings className="w-6 h-6" />,
      color: 'text-teal-600',
      faqs: [
        {
          question: 'How do I get technical support for equipment?',
          answer: 'Contact our technical support team via phone or email. We provide on-site support for major equipment in Nairobi and surrounding areas.'
        },
        {
          question: 'Do you offer equipment maintenance?',
          answer: 'Yes, we offer preventive maintenance services and can arrange for manufacturer technicians when needed.'
        },
        {
          question: 'What if my equipment breaks down?',
          answer: 'Contact our support team immediately. We\'ll assess the issue and provide repair services or replacement under warranty.'
        },
        {
          question: 'Do you provide training for new equipment?',
          answer: 'Yes, we offer training sessions for new equipment purchases. Training can be conducted at your facility or our showroom.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.faqs.some(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions, learn about our services, and get the support you need. 
            Can't find what you're looking for? Contact our customer service team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help topics, questions, or keywords..."
              className="w-full px-6 py-4 pl-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-lg"
            />
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a href="/delivery" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow text-center group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <FiTruck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Delivery Info</h3>
            <p className="text-sm text-gray-600">Learn about shipping options and delivery times</p>
          </a>

          <a href="/returns" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow text-center group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
              <FiPackage className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Returns Policy</h3>
            <p className="text-sm text-gray-600">Understand our return and refund process</p>
          </a>

          <a href="/warranty" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow text-center group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <FiShield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Warranty Info</h3>
            <p className="text-sm text-gray-600">Product warranties and service support</p>
          </a>

          <a href="/track" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow text-center group">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <FiSearch className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Order</h3>
            <p className="text-sm text-gray-600">Track your order status and delivery</p>
          </a>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className={`${category.color}`}>
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                </div>
              </div>

              {/* FAQs */}
              <div className="divide-y divide-gray-200">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  return (
                    <div key={faqIndex} className="px-8 py-6">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full text-left flex items-center justify-between group"
                      >
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors pr-4">
                          {faq.question}
                        </h3>
                        {isExpanded(globalIndex) ? (
                          <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                        ) : (
                          <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded(globalIndex) && (
                        <div className="mt-4 pl-4 border-l-2 border-primary-200">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer service team is here to help. 
            Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Contact Support
            </a>
            <a
              href="tel:+254700000000"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              Call Us: +254 700 000 000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}