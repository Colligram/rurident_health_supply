import React, { useState } from 'react';
import { HiSearch, HiQuestionMarkCircle, HiPhone, HiMail, HiChat, HiBookOpen } from 'react-icons/hi';

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const helpCategories = [
    { id: 'all', name: 'All Topics', icon: HiBookOpen },
    { id: 'ordering', name: 'Ordering', icon: HiQuestionMarkCircle },
    { id: 'payment', name: 'Payment', icon: HiQuestionMarkCircle },
    { id: 'delivery', name: 'Delivery', icon: HiQuestionMarkCircle },
    { id: 'returns', name: 'Returns', icon: HiQuestionMarkCircle },
    { id: 'account', name: 'Account', icon: HiQuestionMarkCircle }
  ];

  const faqs = [
    {
      category: 'ordering',
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide your contact information and choose a payment method. We accept M-Pesa and credit/debit cards.'
    },
    {
      category: 'ordering',
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement by contacting our customer service team. After that, changes may not be possible as orders are processed quickly.'
    },
    {
      category: 'ordering',
      question: 'What if an item is out of stock?',
      answer: 'If an item is out of stock, it will be clearly marked on the product page. You can sign up for stock notifications, and we\'ll email you when the item becomes available again.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa mobile money payments and major credit/debit cards (Visa, Mastercard). All payments are processed securely through our payment partners.'
    },
    {
      category: 'payment',
      question: 'Is it safe to pay online?',
      answer: 'Yes, all online payments are processed through secure, encrypted payment gateways. We never store your payment information and use industry-standard security measures.'
    },
    {
      category: 'payment',
      question: 'When will I be charged for my order?',
      answer: 'For M-Pesa payments, you\'ll be charged immediately when you complete the payment. For card payments, your card will be authorized at checkout and charged when the order ships.'
    },
    {
      category: 'delivery',
      question: 'How long does delivery take?',
      answer: 'Delivery times vary by location: Same day for Nairobi CBD, next day for Nairobi metropolitan area, 2-3 days for major cities, and 3-5 days for other locations.'
    },
    {
      category: 'delivery',
      question: 'Do you deliver outside Nairobi?',
      answer: 'Yes, we deliver nationwide across Kenya. Delivery fees and times vary by location. Contact us for specific delivery information to your area.'
    },
    {
      category: 'delivery',
      question: 'Can I track my delivery?',
      answer: 'Yes, you\'ll receive tracking information via SMS and email. You can also track your order on our website using your order number.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Returns are free and we provide full refunds or exchanges.'
    },
    {
      category: 'returns',
      question: 'How do I return an item?',
      answer: 'Contact our customer service team within 30 days of delivery. We\'ll provide a return authorization number and shipping label. Returns are processed within 5-7 business days.'
    },
    {
      category: 'returns',
      question: 'What items cannot be returned?',
      answer: 'Custom items, consumables (unless defective), and items purchased on clearance cannot be returned. Used or opened items are also not eligible unless defective.'
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'You can create an account during checkout or by visiting the "Sign Up" page. You\'ll need to provide your email address and create a password.'
    },
    {
      category: 'account',
      question: 'Can I view my order history?',
      answer: 'Yes, once you\'re logged in, you can view your complete order history, track current orders, and manage your account information.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password securely.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const contactMethods = [
    {
      title: 'Phone Support',
      description: 'Speak directly with our customer service team',
      contact: '0703 416 433',
      icon: HiPhone,
      action: 'tel:0703416433'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll respond within 24 hours',
      contact: 'support@rurident.com',
      icon: HiMail,
      action: 'mailto:support@rurident.com'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team during business hours',
      contact: 'Available 8 AM - 6 PM',
      icon: HiChat,
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions, learn about our services, and get the support you need. 
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help topics, questions, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
            <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {helpCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HiQuestionMarkCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all categories
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {method.title === 'Live Chat' ? 'Start Chat' : 'Contact Now'}
                  </a>
                  <p className="text-sm text-gray-500 mt-2">{method.contact}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Help Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/delivery" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-1">Delivery Info</h3>
              <p className="text-sm text-gray-600">Shipping & delivery details</p>
            </a>
            <a href="/returns" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-1">Returns</h3>
              <p className="text-sm text-gray-600">Return policy & process</p>
            </a>
            <a href="/warranty" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-1">Warranty</h3>
              <p className="text-sm text-gray-600">Product warranty information</p>
            </a>
            <a href="/track" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-1">Track Order</h3>
              <p className="text-sm text-gray-600">Track your delivery</p>
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Service Hours
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is available to help you during these hours:
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="font-semibold text-gray-900">Weekdays</h3>
                <p className="text-gray-600">Monday - Friday</p>
                <p className="text-gray-600">8:00 AM - 6:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Weekends</h3>
                <p className="text-gray-600">Saturday</p>
                <p className="text-gray-600">9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}