import React from 'react';
import { FiShield, FiEye, FiLock, FiDatabase, FiUsers, FiGlobe } from 'react-icons/fi';

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <div className="flex items-center space-x-4">
            <FiShield className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-purple-100 mt-2 text-lg">Your Data Protection Rights & Our Commitments</p>
              <p className="text-purple-200 text-sm mt-1">Last Updated: January 2024 | Effective Date: January 1, 2024</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Data Collection Consent Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FiDatabase className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Collection Consent Agreement</h3>
                <p className="text-blue-700 mb-3">
                  <strong>By using our services, you explicitly consent to data collection.</strong> This Privacy Policy explains what personal information we collect, how we use it, and your rights regarding your data. Your continued use of our website, mobile application, or services constitutes your agreement to these data collection practices.
                </p>
                <p className="text-blue-600 text-sm font-medium">
                  If you do not agree to this data collection, please discontinue use of our services immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Policy Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <a href="#information-collection" className="text-blue-600 hover:text-blue-800">1. Information We Collect</a>
              <a href="#collection-methods" className="text-blue-600 hover:text-blue-800">2. How We Collect Data</a>
              <a href="#data-usage" className="text-blue-600 hover:text-blue-800">3. How We Use Your Data</a>
              <a href="#data-sharing" className="text-blue-600 hover:text-blue-800">4. Information Sharing</a>
              <a href="#cookies" className="text-blue-600 hover:text-blue-800">5. Cookies & Tracking</a>
              <a href="#data-security" className="text-blue-600 hover:text-blue-800">6. Data Security</a>
              <a href="#your-rights" className="text-blue-600 hover:text-blue-800">7. Your Privacy Rights</a>
              <a href="#international" className="text-blue-600 hover:text-blue-800">8. International Transfers</a>
              <a href="#retention" className="text-blue-600 hover:text-blue-800">9. Data Retention</a>
              <a href="#children" className="text-blue-600 hover:text-blue-800">10. Children's Privacy</a>
              <a href="#changes" className="text-blue-600 hover:text-blue-800">11. Policy Changes</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-800">12. Contact Information</a>
            </div>
          </div>

          {/* Information We Collect */}
          <section id="information-collection">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Personal Information You Provide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-2">Account Information</h4>
                    <ul className="text-sm text-yellow-600 space-y-1">
                      <li>• Full name and professional title</li>
                      <li>• Email address and phone numbers</li>
                      <li>• Physical and billing addresses</li>
                      <li>• Professional license numbers</li>
                      <li>• Institution/clinic affiliations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-2">Transaction Data</h4>
                    <ul className="text-sm text-yellow-600 space-y-1">
                      <li>• Purchase history and order details</li>
                      <li>• Payment information and billing data</li>
                      <li>• Delivery addresses and preferences</li>
                      <li>• Communication preferences</li>
                      <li>• Customer service interactions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Automatically Collected Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Device & Technical Data</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• IP address and geographic location</li>
                      <li>• Device type, operating system, browser</li>
                      <li>• Screen resolution and device identifiers</li>
                      <li>• Network connection information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Usage & Behavioral Data</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Pages visited and time spent</li>
                      <li>• Search queries and product interactions</li>
                      <li>• Click patterns and navigation paths</li>
                      <li>• Session recordings and heatmaps</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Third-Party Data Sources</h3>
                <p className="text-purple-700 mb-3">We may also collect information about you from:</p>
                <ul className="text-purple-600 space-y-1">
                  <li>• Professional licensing boards and regulatory authorities</li>
                  <li>• Credit reporting agencies for institutional accounts</li>
                  <li>• Social media platforms (with your consent)</li>
                  <li>• Business partners and referral sources</li>
                  <li>• Public databases and professional directories</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Collect Data */}
          <section id="collection-methods">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Collect Your Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <FiUsers className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Direct Collection</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Account registration forms</li>
                  <li>• Order and checkout processes</li>
                  <li>• Customer service interactions</li>
                  <li>• Newsletter subscriptions</li>
                  <li>• Survey responses</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <FiEye className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Automatic Collection</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Website cookies and tracking pixels</li>
                  <li>• Mobile app analytics</li>
                  <li>• Server logs and access records</li>
                  <li>• Payment processing systems</li>
                  <li>• Delivery tracking systems</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <FiGlobe className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Third-Party Sources</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Social media integrations</li>
                  <li>• Marketing platform data</li>
                  <li>• Partner company referrals</li>
                  <li>• Public professional databases</li>
                  <li>• Credit and verification services</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section id="data-usage">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Primary Business Purposes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Service Delivery</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Processing and fulfilling orders</li>
                      <li>• Managing customer accounts</li>
                      <li>• Providing customer support</li>
                      <li>• Delivering products and services</li>
                      <li>• Processing payments and refunds</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Communication</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Order confirmations and updates</li>
                      <li>• Account notifications</li>
                      <li>• Customer service responses</li>
                      <li>• Product recalls or safety alerts</li>
                      <li>• Legal and regulatory notices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Marketing and Personalization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Targeted Marketing</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Personalized product recommendations</li>
                      <li>• Promotional emails and newsletters</li>
                      <li>• Special offers and discounts</li>
                      <li>• Event invitations and announcements</li>
                      <li>• Social media advertising</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Website Optimization</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Customizing user experience</li>
                      <li>• Improving site navigation</li>
                      <li>• A/B testing new features</li>
                      <li>• Analytics and performance monitoring</li>
                      <li>• Search result optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Legal and Compliance Uses</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Compliance with healthcare regulations and licensing requirements</li>
                  <li>• Anti-fraud detection and prevention</li>
                  <li>• Legal dispute resolution and litigation support</li>
                  <li>• Regulatory reporting and audit requirements</li>
                  <li>• Law enforcement cooperation when legally required</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section id="data-sharing">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">We Share Your Information With:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-2">Service Providers</h4>
                    <ul className="text-sm text-yellow-600 space-y-1">
                      <li>• Payment processors (M-Pesa, Visa, Mastercard)</li>
                      <li>• Shipping and logistics companies</li>
                      <li>• Cloud hosting providers (AWS, Google Cloud)</li>
                      <li>• Email marketing platforms</li>
                      <li>• Customer support tools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-2">Business Partners</h4>
                    <ul className="text-sm text-yellow-600 space-y-1">
                      <li>• Manufacturer partners for warranty claims</li>
                      <li>• Authorized distributors and suppliers</li>
                      <li>• Professional associations (with consent)</li>
                      <li>• Educational institutions for training programs</li>
                      <li>• Marketing and advertising partners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Legal Disclosure Requirements</h3>
                <p className="text-red-700 mb-3">We may disclose your information when required by law or to:</p>
                <ul className="text-red-600 space-y-1">
                  <li>• Comply with legal processes, court orders, or government requests</li>
                  <li>• Protect our rights, property, or safety</li>
                  <li>• Prevent fraud or illegal activities</li>
                  <li>• Respond to emergency situations involving health or safety</li>
                  <li>• Facilitate business transfers or mergers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section id="cookies">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">What Are Cookies?</h3>
              <p className="text-orange-700">
                Cookies are small text files stored on your device that help us provide and improve our services. 
                By using our website, you consent to our use of cookies as described below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Essential Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">Required for basic website functionality:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Session management and login status</li>
                  <li>• Shopping cart contents</li>
                  <li>• Security and fraud prevention</li>
                  <li>• Language and region preferences</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Analytics Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">Help us understand website usage:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Google Analytics tracking</li>
                  <li>• Page view statistics</li>
                  <li>• User behavior analysis</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Marketing Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">Enable personalized advertising:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Facebook Pixel tracking</li>
                  <li>• Google Ads conversion tracking</li>
                  <li>• Retargeting campaigns</li>
                  <li>• Social media integration</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Preference Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">Remember your choices and settings:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Display preferences</li>
                  <li>• Notification settings</li>
                  <li>• Customization options</li>
                  <li>• Accessibility features</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section id="data-security">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security and Protection</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <FiLock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Our Security Commitments</h3>
                  <p className="text-blue-700">
                    We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Technical Safeguards</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• AES-256 encryption for stored data</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• Multi-factor authentication for admin access</li>
                    <li>• Automated backup and disaster recovery</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Administrative Controls</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Employee background checks and training</li>
                    <li>• Role-based access controls</li>
                    <li>• Regular security awareness programs</li>
                    <li>• Incident response procedures</li>
                    <li>• Third-party security assessments</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Data Breach Notification:</strong> In the unlikely event of a data breach affecting your personal information, 
                  we will notify you within 72 hours as required by applicable data protection laws.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights and Choices</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Your Data Protection Rights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Access and Control</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Right to access your personal data</li>
                      <li>• Right to correct inaccurate information</li>
                      <li>• Right to delete your data (where applicable)</li>
                      <li>• Right to data portability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Marketing and Communication</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Unsubscribe from marketing emails</li>
                      <li>• Opt out of targeted advertising</li>
                      <li>• Control cookie preferences</li>
                      <li>• Limit data processing activities</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">How to Exercise Your Rights</h3>
                <p className="text-yellow-700 mb-3">To exercise any of these rights, contact us at:</p>
                <div className="text-yellow-600">
                  <p>Email: privacy@ruridenthealth.co.ke</p>
                  <p>Phone: +254 703 416 433</p>
                  <p>Mail: Mepalux Plaza, River Road, Suite 304, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section id="international">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-purple-700 mb-4">
                Your personal information may be transferred to and processed in countries outside Kenya, including the United States and European Union, where our service providers operate. We ensure appropriate safeguards are in place for these transfers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-purple-700 mb-2">Transfer Safeguards</h4>
                  <ul className="text-sm text-purple-600 space-y-1">
                    <li>• Standard Contractual Clauses (SCCs)</li>
                    <li>• Adequacy decisions by relevant authorities</li>
                    <li>• Binding Corporate Rules where applicable</li>
                    <li>• Certification schemes and codes of conduct</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-purple-700 mb-2">Countries Where Data May Be Processed</h4>
                  <ul className="text-sm text-purple-600 space-y-1">
                    <li>• United States (AWS, Google Cloud)</li>
                    <li>• European Union (GDPR-compliant processing)</li>
                    <li>• Singapore (regional data centers)</li>
                    <li>• Other countries with adequate protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="retention">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                We retain your personal information only as long as necessary for the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Account Data</h4>
                  <p className="text-sm text-gray-600">Retained while account is active plus 7 years for legal compliance</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Transaction Records</h4>
                  <p className="text-sm text-gray-600">10 years for financial and regulatory compliance requirements</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Marketing Data</h4>
                  <p className="text-sm text-gray-600">Until consent is withdrawn or 3 years of inactivity</p>
                </div>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-700 mb-3">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18 without verified parental consent.
              </p>
              <p className="text-red-600 text-sm">
                If you believe we have collected information from a child under 18, please contact us immediately at privacy@ruridenthealth.co.ke so we can delete such information.
              </p>
            </div>
          </section>

          {/* Policy Changes */}
          <section id="changes">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700 mb-3">
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes through:
              </p>
              <ul className="text-blue-600 space-y-1 mb-3">
                <li>• Email notification to registered users</li>
                <li>• Prominent notice on our website</li>
                <li>• In-app notifications for mobile users</li>
                <li>• Updated "Last Modified" date at the top of this policy</li>
              </ul>
              <p className="text-blue-700 text-sm">
                Your continued use of our services after policy changes constitutes acceptance of the updated privacy practices.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us About Privacy</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Privacy Officer Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">General Privacy Inquiries</h4>
                  <div className="text-green-600 space-y-1">
                    <p>Email: privacy@ruridenthealth.co.ke</p>
                    <p>Phone: +254 703 416 433</p>
                    <p>Response Time: Within 72 hours</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Postal Address</h4>
                  <div className="text-green-600">
                    <p>Rurident Health Supplies Limited</p>
                    <p>Attention: Privacy Officer</p>
                    <p>Mepalux Plaza, 3rd Floor</p>
                    <p>River Road, Suite 304</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Notice */}
          <div className="bg-gray-800 text-white rounded-lg p-6 text-center">
            <p className="mb-2">
              <strong>Effective Date: January 1, 2024 | Last Updated: January 2024</strong>
            </p>
            <p className="text-sm text-gray-300 mb-4">
              This Privacy Policy is governed by Kenyan data protection laws and international privacy standards.
            </p>
            <p className="text-sm text-gray-400">
              By using our services, you acknowledge that you have read and understood this Privacy Policy and consent to our data collection and processing practices as described herein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}