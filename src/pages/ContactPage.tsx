import React, { useState } from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiChat, HiUser, HiDeviceMobile } from 'react-icons/hi';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const contactMethods = [
    {
      icon: HiPhone,
      title: 'Phone',
      details: [
        { label: 'Main Office', value: '0703 416 433' },
        { label: 'Sales Team', value: '0795 202 687' },
        { label: 'Support', value: '0746 280 715' }
      ],
      action: 'Call Now',
      actionType: 'phone'
    },
    {
      icon: HiMail,
      title: 'Email',
      details: [
        { label: 'General Inquiries', value: 'info@rurident.co.ke' },
        { label: 'Sales', value: 'sales@rurident.co.ke' },
        { label: 'Support', value: 'support@rurident.co.ke' }
      ],
      action: 'Send Email',
      actionType: 'email'
    },
    {
      icon: HiLocationMarker,
      title: 'Visit Us',
      details: [
        { label: 'Address', value: 'Mepalux Plaza Nairobi' },
        { label: 'Floor', value: '3rd Floor, Suite 304' },
        { label: 'Location', value: 'River Road, Opp. Bata Mini Price' }
      ],
      action: 'Get Directions',
      actionType: 'location'
    },
    {
      icon: HiClock,
      title: 'Business Hours',
      details: [
        { label: 'Monday - Friday', value: '8:00 AM - 6:00 PM' },
        { label: 'Saturday', value: '9:00 AM - 4:00 PM' },
        { label: 'Sunday', value: 'Closed' }
      ],
      action: 'Schedule Visit',
      actionType: 'schedule'
    }
  ];

  const departments = [
    {
      name: 'Sales Department',
      description: 'For product inquiries, quotes, and orders',
      contact: 'sales@rurident.co.ke',
      phone: '0795 202 687',
      responseTime: 'Within 2 hours'
    },
    {
      name: 'Technical Support',
      description: 'For equipment installation, training, and maintenance',
      contact: 'support@rurident.co.ke',
      phone: '0746 280 715',
      responseTime: 'Within 4 hours'
    },
    {
      name: 'Customer Service',
      description: 'For general inquiries and account management',
      contact: 'info@rurident.co.ke',
      phone: '0703 416 433',
      responseTime: 'Within 24 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help with all your dental equipment 
              and supply needs. Reach out through any of our contact methods below.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                                                        <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <HiDeviceMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="support">Technical Support</option>
                      <option value="delivery">Delivery & Shipping</option>
                      <option value="returns">Returns & Warranty</option>
                      <option value="partnership">Partnership & Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <HiChat className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-full p-3 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{method.title}</h3>
                      <div className="space-y-2 mb-4">
                        {method.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex justify-between">
                            <span className="text-gray-600 text-sm">{detail.label}:</span>
                            <span className="text-gray-900 font-medium text-sm">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                        {method.action}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Contacts */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Contact Our Departments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="text-sm">
                    <span className="text-gray-600">Email: </span>
                    <span className="font-medium text-primary-600">{dept.contact}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Phone: </span>
                    <span className="font-medium text-gray-900">{dept.phone}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Response Time: </span>
                    <span className="font-medium text-green-600">{dept.responseTime}</span>
                  </div>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  Contact {dept.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <HiLocationMarker className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Interactive Map Coming Soon</p>
                <p className="text-sm">We're working on adding an interactive map to help you find us easily.</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> Mepalux Plaza Nairobi, 3rd Floor, Suite 304
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> River Road, opposite Bata Mini Price
              </p>
              <p className="text-gray-600">
                <strong>Landmark:</strong> Near River Road Market, accessible via public transport
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Need immediate assistance with critical equipment? Our emergency support team is available 
            24/7 for urgent technical issues that affect patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0746280715"
              className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Emergency Hotline: 0746 280 715
            </a>
            <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition-colors">
              Report Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}