import React, { useState } from 'react';
import { HiChevronDown, HiChevronRight, HiSearch, HiQuestionMarkCircle } from 'react-icons/hi';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const categories = [
    { id: 'general', name: 'General Questions', count: 8 },
    { id: 'products', name: 'Products & Equipment', count: 6 },
    { id: 'ordering', name: 'Ordering & Payment', count: 7 },
    { id: 'delivery', name: 'Delivery & Shipping', count: 5 },
    { id: 'returns', name: 'Returns & Warranty', count: 6 },
    { id: 'support', name: 'Technical Support', count: 4 }
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: 'What is Rurident Health Supplies?',
        answer: 'Rurident Health Supplies is a leading supplier of dental equipment, chairs, consumables, and student kits in Kenya. We serve hospitals, clinics, technicians, and dental students nationwide with quality products and reliable service.'
      },
      {
        id: 2,
        question: 'Where are you located?',
        answer: 'We are located at Mepalux Plaza Nairobi, 3rd Floor, Suite 304, River Road, opposite Bata Mini Price. Our showroom is easily accessible and we welcome visitors during business hours.'
      },
      {
        id: 3,
        question: 'What are your business hours?',
        answer: 'We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 4:00 PM. Sundays we are closed. For urgent matters outside business hours, you can reach us via email.'
      },
      {
        id: 4,
        question: 'Do you ship nationwide?',
        answer: 'Yes, we provide nationwide shipping to all counties in Kenya. We offer same-day delivery in Nairobi and next-day delivery to major cities. Remote areas may take 2-3 business days.'
      },
      {
        id: 5,
        question: 'What payment methods do you accept?',
        answer: 'We accept M-Pesa, bank transfers, cash on delivery, and credit/debit cards. For large orders, we also offer flexible payment terms and installment options for qualified customers.'
      },
      {
        id: 6,
        question: 'Do you offer bulk discounts?',
        answer: 'Yes, we offer competitive bulk pricing for hospitals, clinics, and educational institutions. Contact our sales team for custom quotes and volume discounts on large orders.'
      },
      {
        id: 7,
        question: 'Can I visit your showroom?',
        answer: 'Absolutely! We encourage customers to visit our showroom to see our products in person. Please call ahead to schedule an appointment, and our team will be happy to give you a tour and answer any questions.'
      },
      {
        id: 8,
        question: 'Do you provide training for equipment?',
        answer: 'Yes, we provide comprehensive training for all equipment purchases. Our technical team offers on-site training, video tutorials, and ongoing support to ensure you get the most out of your investment.'
      }
    ],
    products: [
      {
        id: 9,
        question: 'What brands do you carry?',
        answer: 'We carry leading international brands including Dentsply Sirona, KaVo, Planmeca, and many others. We also offer our own Rurident brand for certain products, which provides excellent quality at competitive prices.'
      },
      {
        id: 10,
        question: 'Do you have dental chairs in stock?',
        answer: 'Yes, we maintain a comprehensive inventory of dental chairs including basic models, advanced units with integrated technology, and specialized chairs for different procedures. Contact us for current availability.'
      },
      {
        id: 11,
        question: 'What\'s included in a student kit?',
        answer: 'Our student kits include essential dental instruments, mirrors, explorers, scalers, and basic handpieces. We offer different kit levels (basic, standard, premium) to meet various educational needs and budgets.'
      },
      {
        id: 12,
        question: 'Do you sell consumables?',
        answer: 'Yes, we offer a wide range of dental consumables including gloves, masks, syringes, burs, polishing materials, and more. We source only high-quality products that meet international standards.'
      },
      {
        id: 13,
        question: 'Can you customize equipment orders?',
        answer: 'Yes, we can customize many equipment orders to meet your specific requirements. This includes custom upholstery, color options, additional features, and integration with existing systems.'
      },
      {
        id: 14,
        question: 'Do you offer equipment rental?',
        answer: 'Yes, we offer short-term and long-term rental options for dental equipment. This is ideal for temporary needs, events, or when you want to test equipment before purchasing.'
      }
    ],
    ordering: [
      {
        id: 15,
        question: 'How do I place an order?',
        answer: 'You can place orders through our website, by phone, email, or in person at our showroom. For complex orders or custom requirements, we recommend contacting our sales team directly.'
      },
      {
        id: 16,
        question: 'What information do I need to provide?',
        answer: 'We need your contact information, delivery address, and payment details. For equipment orders, we may also need specifications, installation requirements, and any special customization needs.'
      },
      {
        id: 17,
        question: 'Can I get a quote before ordering?',
        answer: 'Absolutely! We provide detailed quotes for all orders. For equipment and large orders, we can provide comprehensive quotes including delivery, installation, and any additional services.'
      },
      {
        id: 18,
        question: 'Do you offer financing options?',
        answer: 'Yes, we offer flexible financing options for qualified customers. This includes installment payments, equipment leasing, and partnerships with financial institutions for larger purchases.'
      },
      {
        id: 19,
        question: 'What happens after I place an order?',
        answer: 'After placing an order, you\'ll receive an order confirmation with details. We\'ll then process your payment, prepare your order, and contact you to arrange delivery or pickup.'
      },
      {
        id: 20,
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can typically be modified or cancelled within 24 hours of placement, depending on the products and processing status. Contact our customer service team immediately for assistance.'
      },
      {
        id: 21,
        question: 'Do you offer corporate accounts?',
        answer: 'Yes, we offer corporate accounts for hospitals, clinics, and educational institutions. These accounts include special pricing, extended payment terms, and dedicated account management.'
      }
    ],
    delivery: [
      {
        id: 22,
        question: 'How much does delivery cost?',
        answer: 'Delivery costs vary by location and order size. We offer free delivery for orders over KES 50,000 in Nairobi. For other areas, we provide competitive rates based on distance and order volume.'
      },
      {
        id: 23,
        question: 'How long does delivery take?',
        answer: 'Same-day delivery is available in Nairobi for orders placed before 2 PM. Next-day delivery is available for major cities, while remote areas typically take 2-3 business days.'
      },
      {
        id: 24,
        question: 'Do you offer installation services?',
        answer: 'Yes, we provide professional installation services for all equipment purchases. Our trained technicians ensure proper setup, calibration, and testing of your equipment.'
      },
      {
        id: 25,
        question: 'Can I track my delivery?',
        answer: 'Yes, we provide real-time tracking for all deliveries. You\'ll receive updates via SMS and email, and can track your order status through our website or mobile app.'
      },
      {
        id: 26,
        question: 'What if I\'m not home during delivery?',
        answer: 'We\'ll contact you before delivery to confirm a convenient time. If you\'re not available, we can reschedule or arrange for delivery to an alternative address or our local pickup point.'
      }
    ],
    returns: [
      {
        id: 27,
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most products. Items must be in original condition with all packaging and accessories. Some items like custom equipment may have different return terms.'
      },
      {
        id: 28,
        question: 'How do I return an item?',
        answer: 'Contact our customer service team to initiate a return. We\'ll provide a return authorization number and arrange pickup or provide return shipping instructions.'
      },
      {
        id: 29,
        question: 'What about warranty claims?',
        answer: 'Warranty claims are handled directly with the manufacturer. We assist by providing warranty information and helping coordinate with manufacturers, but warranty service is provided by the manufacturer, not by us.'
      },
      {
        id: 30,
        question: 'Do you offer exchanges?',
        answer: 'Yes, we offer exchanges for items of equal value. If you want to exchange for a more expensive item, you\'ll pay the difference. For less expensive items, we\'ll provide a refund for the difference.'
      },
      {
        id: 31,
        question: 'What items cannot be returned?',
        answer: 'Custom equipment, software licenses, and consumables cannot be returned once opened. Additionally, items that have been installed, used, or modified cannot be returned.'
      },
      {
        id: 32,
        question: 'How long do refunds take?',
        answer: 'Refunds are processed within 5-7 business days after we receive and inspect returned items. The time to appear in your account depends on your payment method and financial institution.'
      }
    ],
    support: [
      {
        id: 33,
        question: 'Do you provide technical support?',
        answer: 'Yes, we provide comprehensive technical support for all our products. Our technical team is available during business hours and can assist with installation, troubleshooting, and maintenance questions.'
      },
      {
        id: 34,
        question: 'What if my equipment breaks down?',
        answer: 'For equipment under warranty, we\'ll help coordinate with the manufacturer for repair or replacement. For out-of-warranty items, we offer repair services and can source replacement parts.'
      },
      {
        id: 35,
        question: 'Do you offer maintenance services?',
        answer: 'Yes, we offer preventive maintenance services and can create custom maintenance schedules for your equipment. Regular maintenance helps extend equipment life and prevent costly breakdowns.'
      },
      {
        id: 36,
        question: 'Can you help with equipment training?',
        answer: 'Absolutely! We provide comprehensive training for all equipment purchases. This includes initial setup training, ongoing support, and refresher training for your staff.'
      }
    ]
  };

  const toggleItem = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = Object.entries(faqs).reduce((acc, [category, categoryFAQs]) => {
    if (activeCategory === 'all' || category === activeCategory) {
      const filtered = categoryFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
    }
    return acc;
  }, {} as Record<string, typeof faqs.general>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Find answers to common questions about our products, services, and policies. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {Object.entries(filteredFAQs).map(([category, categoryFAQs]) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {categories.find(cat => cat.id === category)?.name}
                </h2>
                <div className="space-y-4">
                  {categoryFAQs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedItems.has(faq.id) ? (
                          <HiChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <HiChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(filteredFAQs).length === 0 && (
              <div className="text-center py-12">
                <HiQuestionMarkCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help. 
            Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}