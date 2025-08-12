import React from 'react';
import { FiSettings, FiEye, FiBarChart, FiTarget, FiInfo } from 'react-icons/fi';

export function CookiePolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8">
          <div className="flex items-center space-x-4">
            <FiSettings className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Cookie Policy</h1>
              <p className="text-orange-100 mt-2 text-lg">How We Use Cookies to Enhance Your Experience</p>
              <p className="text-orange-200 text-sm mt-1">Last Updated: January 2024</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Cookie Consent Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FiInfo className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Cookie Consent Agreement</h3>
                <p className="text-orange-700 mb-3">
                  <strong>By using our website, you consent to our use of cookies.</strong> This Cookie Policy explains what cookies are, how we use them, and how you can control them. Your continued use of our website constitutes your agreement to our cookie practices as described below.
                </p>
                <p className="text-orange-600 text-sm font-medium">
                  You can manage your cookie preferences at any time through your browser settings or our cookie management tool.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cookie Policy Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#what-are-cookies" className="text-blue-600 hover:text-blue-800">1. What Are Cookies?</a>
              <a href="#how-we-use" className="text-blue-600 hover:text-blue-800">2. How We Use Cookies</a>
              <a href="#types-of-cookies" className="text-blue-600 hover:text-blue-800">3. Types of Cookies We Use</a>
              <a href="#third-party" className="text-blue-600 hover:text-blue-800">4. Third-Party Cookies</a>
              <a href="#managing-cookies" className="text-blue-600 hover:text-blue-800">5. Managing Cookie Preferences</a>
              <a href="#cookie-details" className="text-blue-600 hover:text-blue-800">6. Detailed Cookie Information</a>
              <a href="#updates" className="text-blue-600 hover:text-blue-800">7. Policy Updates</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-800">8. Contact Information</a>
            </div>
          </div>

          {/* What Are Cookies */}
          <section id="what-are-cookies">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used by website owners to make their websites work more efficiently and to provide 
                reporting information.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-3">Cookie Characteristics</h3>
                  <ul className="text-blue-600 space-y-1">
                    <li>• Small data files (typically 4KB or less)</li>
                    <li>• Stored locally on your device</li>
                    <li>• Cannot access personal files on your device</li>
                    <li>• Cannot install software or viruses</li>
                    <li>• Expire after a set time period</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-3">Cookie Purposes</h3>
                  <ul className="text-blue-600 space-y-1">
                    <li>• Remember your preferences and settings</li>
                    <li>• Enable website functionality</li>
                    <li>• Analyze website performance</li>
                    <li>• Provide personalized content</li>
                    <li>• Support marketing and advertising</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section id="how-we-use">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Primary Uses of Cookies on Our Website</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Website Functionality</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Maintain your shopping cart contents</li>
                      <li>• Remember your login status</li>
                      <li>• Store your language preferences</li>
                      <li>• Save your delivery location</li>
                      <li>• Maintain security sessions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">User Experience</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Personalize product recommendations</li>
                      <li>• Remember recently viewed items</li>
                      <li>• Customize page layouts</li>
                      <li>• Provide location-based services</li>
                      <li>• Enable social media features</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Analytics and Performance</h3>
                <p className="text-purple-700 mb-3">
                  We use cookies to understand how visitors interact with our website, which helps us improve your experience:
                </p>
                <ul className="text-purple-600 space-y-1">
                  <li>• Track page views and user journeys</li>
                  <li>• Monitor website performance and loading times</li>
                  <li>• Identify popular products and content</li>
                  <li>• Analyze search patterns and preferences</li>
                  <li>• Measure the effectiveness of marketing campaigns</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Types of Cookies */}
          <section id="types-of-cookies">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <FiSettings className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Essential Cookies</h3>
                    <p className="text-red-700 text-sm">Required for basic website functionality</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Purpose</h4>
                    <p className="text-sm text-red-600">Enable core website features like security, network management, and accessibility.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Examples</h4>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Session management cookies</li>
                      <li>• Authentication tokens</li>
                      <li>• Security cookies</li>
                      <li>• Load balancing cookies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-1">Duration</h4>
                    <p className="text-sm text-red-600">Session or up to 30 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <FiBarChart className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Analytics Cookies</h3>
                    <p className="text-blue-700 text-sm">Help us understand website usage patterns</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Purpose</h4>
                    <p className="text-sm text-blue-600">Collect information about how visitors use our website to improve performance.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Examples</h4>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Google Analytics cookies</li>
                      <li>• Heat mapping tools</li>
                      <li>• User behavior tracking</li>
                      <li>• Performance monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Duration</h4>
                    <p className="text-sm text-blue-600">Up to 2 years</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <FiEye className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Functional Cookies</h3>
                    <p className="text-green-700 text-sm">Enhance functionality and personalization</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Purpose</h4>
                    <p className="text-sm text-green-600">Remember choices you make and provide enhanced, personalized features.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Examples</h4>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Language preferences</li>
                      <li>• Currency selection</li>
                      <li>• Recently viewed products</li>
                      <li>• Wishlist items</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Duration</h4>
                    <p className="text-sm text-green-600">30 days to 1 year</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <FiTarget className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800">Marketing Cookies</h3>
                    <p className="text-purple-700 text-sm">Support advertising and marketing efforts</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-1">Purpose</h4>
                    <p className="text-sm text-purple-600">Track visitors across websites to display relevant advertisements.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-1">Examples</h4>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Facebook Pixel</li>
                      <li>• Google Ads tracking</li>
                      <li>• Retargeting pixels</li>
                      <li>• Social media cookies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-1">Duration</h4>
                    <p className="text-sm text-purple-600">30 days to 2 years</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section id="third-party">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Third-Party Cookie Providers</h3>
              <p className="text-yellow-700 mb-4">
                We work with trusted third-party providers who may place cookies on your device to help us deliver our services:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-yellow-700 mb-2">Analytics Partners</h4>
                  <ul className="text-sm text-yellow-600 space-y-2">
                    <li>
                      <strong>Google Analytics</strong><br/>
                      <span className="text-xs">Website traffic and user behavior analysis</span>
                    </li>
                    <li>
                      <strong>Hotjar</strong><br/>
                      <span className="text-xs">User experience and heatmap analysis</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-700 mb-2">Marketing Partners</h4>
                  <ul className="text-sm text-yellow-600 space-y-2">
                    <li>
                      <strong>Facebook/Meta Pixel</strong><br/>
                      <span className="text-xs">Social media advertising and retargeting</span>
                    </li>
                    <li>
                      <strong>Google Ads</strong><br/>
                      <span className="text-xs">Search and display advertising campaigns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Important Note About Third-Party Cookies</h3>
              <p className="text-red-700 mb-3">
                These third-party providers have their own privacy policies and cookie practices. We recommend reviewing their policies:
              </p>
              <ul className="text-red-600 space-y-1">
                <li>• <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                <li>• <a href="https://www.facebook.com/policy.php" className="underline" target="_blank" rel="noopener noreferrer">Facebook Privacy Policy</a></li>
                <li>• <a href="https://www.hotjar.com/legal/policies/privacy/" className="underline" target="_blank" rel="noopener noreferrer">Hotjar Privacy Policy</a></li>
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section id="managing-cookies">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Browser Cookie Settings</h3>
                <p className="text-blue-700 mb-4">
                  You can control and manage cookies through your browser settings. Here's how to manage cookies in popular browsers:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Chrome</h4>
                    <p className="text-sm text-blue-600">Settings → Privacy and Security → Cookies and other site data</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Firefox</h4>
                    <p className="text-sm text-blue-600">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Safari</h4>
                    <p className="text-sm text-blue-600">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Edge</h4>
                    <p className="text-sm text-blue-600">Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Cookie Management Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Accept All Cookies</h4>
                    <p className="text-sm text-green-600">Allow all cookies for the best user experience</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Block All Cookies</h4>
                    <p className="text-sm text-green-600">Prevent all cookies (may affect website functionality)</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Selective Blocking</h4>
                    <p className="text-sm text-green-600">Choose which types of cookies to allow</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Impact of Blocking Cookies</h3>
                <p className="text-orange-700 mb-3">
                  Please note that blocking certain cookies may affect your experience on our website:
                </p>
                <ul className="text-orange-600 space-y-1">
                  <li>• You may need to re-enter information each visit</li>
                  <li>• Personalized features may not work properly</li>
                  <li>• Some pages may not display correctly</li>
                  <li>• Shopping cart contents may not be saved</li>
                  <li>• You may see less relevant advertisements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Cookie Information */}
          <section id="cookie-details">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Detailed Cookie Information</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Specific Cookies Used on Our Website</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cookie Name</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purpose</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Duration</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">session_id</td>
                      <td className="px-4 py-2">Maintains user session</td>
                      <td className="px-4 py-2">Session</td>
                      <td className="px-4 py-2">Essential</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">cart_contents</td>
                      <td className="px-4 py-2">Stores shopping cart items</td>
                      <td className="px-4 py-2">7 days</td>
                      <td className="px-4 py-2">Functional</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">_ga</td>
                      <td className="px-4 py-2">Google Analytics tracking</td>
                      <td className="px-4 py-2">2 years</td>
                      <td className="px-4 py-2">Analytics</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">_fbp</td>
                      <td className="px-4 py-2">Facebook Pixel tracking</td>
                      <td className="px-4 py-2">90 days</td>
                      <td className="px-4 py-2">Marketing</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">preferences</td>
                      <td className="px-4 py-2">Stores user preferences</td>
                      <td className="px-4 py-2">1 year</td>
                      <td className="px-4 py-2">Functional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section id="updates">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Updates to This Cookie Policy</h2>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-purple-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, 
                or our business practices. When we make significant changes, we will notify you by:
              </p>
              <ul className="text-purple-600 space-y-1 mb-4">
                <li>• Updating the "Last Updated" date at the top of this policy</li>
                <li>• Displaying a notice on our website</li>
                <li>• Sending an email notification to registered users</li>
                <li>• Requesting renewed consent where required by law</li>
              </ul>
              <p className="text-purple-700 text-sm">
                We encourage you to review this Cookie Policy periodically to stay informed about our cookie practices.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us About Cookies</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Questions About Our Cookie Policy?</h3>
              <p className="text-green-700 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">General Inquiries</h4>
                  <div className="text-green-600 space-y-1">
                    <p>Email: privacy@ruridenthealth.co.ke</p>
                    <p>Phone: +254 703 416 433</p>
                    <p>Response Time: Within 48 hours</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Postal Address</h4>
                  <div className="text-green-600">
                    <p>Rurident Health Supplies Limited</p>
                    <p>Attention: Data Protection Officer</p>
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
              <strong>Last Updated: January 2024</strong>
            </p>
            <p className="text-sm text-gray-300 mb-4">
              This Cookie Policy is part of our Privacy Policy and Terms of Service.
            </p>
            <p className="text-sm text-gray-400">
              By continuing to use our website, you acknowledge that you have read and understood this Cookie Policy 
              and consent to our use of cookies as described herein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}