import React from 'react';
import { FiFileText, FiShield, FiAlertTriangle, FiCheck } from 'react-icons/fi';

export function TermsOfServicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="flex items-center space-x-4">
            <FiFileText className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
              <p className="text-blue-100 mt-2 text-lg">Rurident Health Supplies - Legal Agreement</p>
              <p className="text-blue-200 text-sm mt-1">Last Updated: January 2024</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Agreement Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FiAlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Notice</h3>
                <p className="text-yellow-700">
                  By accessing and using the Rurident Health Supplies website, mobile application, or any of our services, 
                  you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please discontinue use of our services immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#acceptance" className="text-blue-600 hover:text-blue-800">1. Acceptance of Terms</a>
              <a href="#definitions" className="text-blue-600 hover:text-blue-800">2. Definitions</a>
              <a href="#services" className="text-blue-600 hover:text-blue-800">3. Services Description</a>
              <a href="#eligibility" className="text-blue-600 hover:text-blue-800">4. User Eligibility</a>
              <a href="#accounts" className="text-blue-600 hover:text-blue-800">5. User Accounts</a>
              <a href="#orders" className="text-blue-600 hover:text-blue-800">6. Orders and Payments</a>
              <a href="#delivery" className="text-blue-600 hover:text-blue-800">7. Delivery and Returns</a>
              <a href="#warranties" className="text-blue-600 hover:text-blue-800">8. Product Warranties</a>
              <a href="#liability" className="text-blue-600 hover:text-blue-800">9. Limitation of Liability</a>
              <a href="#data" className="text-blue-600 hover:text-blue-800">10. Data Collection and Privacy</a>
              <a href="#intellectual" className="text-blue-600 hover:text-blue-800">11. Intellectual Property</a>
              <a href="#termination" className="text-blue-600 hover:text-blue-800">12. Termination</a>
              <a href="#governing" className="text-blue-600 hover:text-blue-800">13. Governing Law</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-800">14. Contact Information</a>
            </div>
          </div>

          {/* Terms Sections */}
          <section id="acceptance">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "Customer," "You") 
                and Rurident Health Supplies Limited, a company incorporated under the laws of Kenya ("Company," "We," "Us," "Our"). 
                These Terms govern your access to and use of our website, mobile applications, products, and services.
              </p>
              <p className="mb-4">
                By creating an account, placing an order, or otherwise accessing our services, you represent that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You have read and understood these Terms in their entirety</li>
                <li>You agree to be legally bound by these Terms and all applicable laws</li>
                <li>You are at least 18 years of age or have legal guardian consent</li>
                <li>You have the authority to enter into this agreement</li>
                <li>All information provided by you is accurate and complete</li>
              </ul>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of our services after modifications 
                constitutes acceptance of the updated Terms.
              </p>
            </div>
          </section>

          <section id="definitions">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-900">"Services"</dt>
                  <dd className="text-gray-700">Includes our website, mobile applications, e-commerce platform, product catalog, ordering system, delivery services, customer support, and all related offerings.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">"Products"</dt>
                  <dd className="text-gray-700">All dental equipment, medical devices, instruments, consumables, student kits, and related items offered for sale through our platform.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">"Account"</dt>
                  <dd className="text-gray-700">Your registered user profile containing personal information, order history, preferences, and billing details.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">"Intellectual Property"</dt>
                  <dd className="text-gray-700">All trademarks, copyrights, patents, trade secrets, designs, logos, content, and proprietary technology owned by or licensed to Rurident Health Supplies.</dd>
                </div>
              </dl>
            </div>
          </section>

          <section id="services">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Services Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                Rurident Health Supplies operates as an authorized distributor and retailer of dental and medical equipment in Kenya. 
                Our services include but are not limited to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">E-commerce Platform</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Online product catalog browsing</li>
                    <li>• Secure ordering and payment processing</li>
                    <li>• Account management and order tracking</li>
                    <li>• Product recommendations and comparisons</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Professional Services</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Technical consultation and support</li>
                    <li>• Equipment installation and training</li>
                    <li>• Maintenance and repair services</li>
                    <li>• Custom equipment configurations</li>
                  </ul>
                </div>
              </div>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with or without notice. 
                We do not guarantee uninterrupted availability of our services and shall not be liable for any service interruptions.
              </p>
            </div>
          </section>

          <section id="eligibility">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Eligibility</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">To use our services, you must meet the following eligibility requirements:</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-3">Age and Legal Capacity</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Be at least 18 years of age</li>
                  <li>• Have legal capacity to enter into binding contracts</li>
                  <li>• Minors must have explicit parental or guardian consent</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-red-800 mb-3">Professional Requirements</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Hold valid professional licenses where required</li>
                  <li>• Comply with all applicable healthcare regulations</li>
                  <li>• Use products only for intended professional purposes</li>
                  <li>• Maintain professional standards and ethical practices</li>
                </ul>
              </div>
              <p>
                We reserve the right to verify your eligibility and may request documentation to confirm your professional status. 
                Providing false information may result in immediate account termination and legal action.
              </p>
            </div>
          </section>

          <section id="accounts">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Accounts and Security</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-blue-800 mb-3">Account Creation and Maintenance</h3>
                <p className="text-blue-700 mb-3">
                  You are responsible for maintaining the security and confidentiality of your account credentials. 
                  You agree to:
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Provide accurate, current, and complete account information</li>
                  <li>• Maintain and promptly update your account information</li>
                  <li>• Use strong, unique passwords and enable two-factor authentication</li>
                  <li>• Immediately notify us of any unauthorized account access</li>
                  <li>• Not share your account credentials with third parties</li>
                </ul>
              </div>
              <p className="mb-4">
                You are solely responsible for all activities that occur under your account, whether authorized or not. 
                We shall not be liable for any loss or damage arising from unauthorized account access due to your failure 
                to maintain account security.
              </p>
            </div>
          </section>

          <section id="orders">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Orders, Payments, and Pricing</h2>
            <div className="prose prose-gray max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Order Processing</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Orders are subject to acceptance and availability</li>
                    <li>• We reserve the right to refuse or cancel any order</li>
                    <li>• Order confirmation does not guarantee product availability</li>
                    <li>• Prices are subject to change without notice</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-3">Payment Terms</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Payment required before product dispatch</li>
                    <li>• Accepted methods: M-Pesa, bank transfer, cards</li>
                    <li>• Institutional accounts may qualify for credit terms</li>
                    <li>• All prices include applicable taxes unless stated</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">Important Payment and Order Disclaimers</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• All sales are final unless otherwise specified in our Returns Policy</li>
                  <li>• We are not responsible for delays caused by payment processing issues</li>
                  <li>• Orders may be canceled if payment cannot be verified within 48 hours</li>
                  <li>• Pricing errors on our website do not constitute a binding offer</li>
                  <li>• We reserve the right to limit order quantities per customer</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="delivery">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Delivery, Returns, and Risk Transfer</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                Delivery terms and risk of loss transfer are governed by the following provisions:
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-orange-800 mb-3">Delivery and Risk Transfer</h3>
                <ul className="text-orange-700 space-y-2">
                  <li>• Risk of loss transfers to customer upon delivery to specified address</li>
                  <li>• Delivery timeframes are estimates and not guaranteed</li>
                  <li>• Customer must inspect products immediately upon delivery</li>
                  <li>• Claims for damaged or missing items must be reported within 48 hours</li>
                  <li>• We are not liable for delays caused by weather, traffic, or force majeure events</li>
                </ul>
              </div>
              <p>
                Returns are subject to our Returns Policy. Products must be returned in original condition with all packaging, 
                documentation, and accessories. Certain products may not be eligible for return due to hygiene or safety regulations.
              </p>
            </div>
          </section>

          <section id="warranties">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Product Warranties and Disclaimers</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-3">Important Warranty Information</h3>
                <p className="text-yellow-700 mb-3">
                  All products are sold with manufacturer warranties where applicable. We provide warranty facilitation services but are not the warranty provider unless explicitly stated.
                </p>
                <ul className="text-yellow-700 space-y-1">
                  <li>• Manufacturer warranties apply as per original terms and conditions</li>
                  <li>• Warranty claims must be processed through authorized service centers</li>
                  <li>• We do not extend or modify manufacturer warranty terms</li>
                  <li>• Used, refurbished, or clearance items may have limited or no warranty</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">DISCLAIMER OF WARRANTIES</h3>
                <p className="text-red-700 text-sm mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                  <li>• WARRANTIES OF NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
                  <li>• WARRANTIES REGARDING PRODUCT PERFORMANCE OR SUITABILITY</li>
                  <li>• WARRANTIES OF UNINTERRUPTED OR ERROR-FREE SERVICE</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="liability">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability and Indemnification</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-red-800 mb-3">LIMITATION OF LIABILITY</h3>
                <p className="text-red-700 text-sm mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY KENYAN LAW AND INTERNATIONAL CONVENTIONS:
                </p>
                <ul className="text-red-700 text-sm space-y-2">
                  <li>• OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE SPECIFIC PRODUCT OR SERVICE</li>
                  <li>• WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
                  <li>• WE ARE NOT LIABLE FOR LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION</li>
                  <li>• WE ARE NOT LIABLE FOR DAMAGES RESULTING FROM PRODUCT MISUSE OR NEGLIGENCE</li>
                  <li>• CLAIMS MUST BE BROUGHT WITHIN ONE (1) YEAR OF THE INCIDENT GIVING RISE TO LIABILITY</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Customer Indemnification</h3>
                <p className="text-blue-700 mb-3">
                  You agree to indemnify and hold harmless Rurident Health Supplies, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Your violation of these Terms or applicable laws</li>
                  <li>• Your misuse of products or services</li>
                  <li>• Your professional practice or patient care decisions</li>
                  <li>• Third-party claims related to your use of our products</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="data">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Collection, Privacy, and Consent</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-purple-800 mb-3">Data Collection and Processing Consent</h3>
                <p className="text-purple-700 mb-3">
                  By using our services, you expressly consent to our collection, processing, and use of your personal data as described in our Privacy Policy. This includes:
                </p>
                <ul className="text-purple-700 space-y-1">
                  <li>• Personal identification and contact information</li>
                  <li>• Professional credentials and licensing information</li>
                  <li>• Purchase history and payment information</li>
                  <li>• Website usage data and analytics</li>
                  <li>• Communication preferences and marketing data</li>
                </ul>
              </div>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your data in accordance with Kenyan data protection laws and international standards. You have the right to access, correct, or delete your personal data subject to legal and business requirements.
              </p>
              <p>
                <strong>Important:</strong> By continuing to use our services, you acknowledge that you have read and agree to our data collection practices as outlined in our Privacy Policy, which forms an integral part of these Terms.
              </p>
            </div>
          </section>

          <section id="intellectual">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Intellectual Property Rights</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                All intellectual property rights in our website, services, and content are owned by or licensed to Rurident Health Supplies. You agree to respect these rights and not engage in any unauthorized use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Protected Content</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Website design and user interface</li>
                    <li>• Product descriptions and specifications</li>
                    <li>• Photos, videos, and multimedia content</li>
                    <li>• Software and mobile applications</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Prohibited Uses</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Copying or reproducing our content</li>
                    <li>• Creating derivative works</li>
                    <li>• Commercial use without permission</li>
                    <li>• Reverse engineering our software</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination and Suspension</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                Either party may terminate this agreement at any time. We reserve the right to suspend or terminate your account immediately for violations of these Terms or applicable laws.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">Grounds for Termination</h3>
                <ul className="text-orange-700 space-y-1">
                  <li>• Violation of these Terms of Service</li>
                  <li>• Fraudulent or illegal activities</li>
                  <li>• Providing false or misleading information</li>
                  <li>• Failure to pay outstanding amounts</li>
                  <li>• Misuse of products or services</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="governing">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Jurisdiction and Applicable Law</h3>
                <p className="text-gray-700 mb-3">
                  These Terms are governed by the laws of the Republic of Kenya. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
                <p className="text-gray-700">
                  We encourage resolution of disputes through good faith negotiation. If formal proceedings are necessary, both parties consent to jurisdiction in Nairobi, Kenya.
                </p>
              </div>
            </div>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information and Legal Notices</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-4">Rurident Health Supplies Limited</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <p><strong>Physical Address:</strong></p>
                  <p>Mepalux Plaza, 3rd Floor<br />
                  River Road, Suite 304<br />
                  Nairobi, Kenya</p>
                </div>
                <div>
                  <p><strong>Contact Information:</strong></p>
                  <p>Phone: +254 703 416 433<br />
                  Email: legal@ruridenthealth.co.ke<br />
                  Website: www.ruridenthealth.co.ke</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-blue-600">
                  For legal notices, complaints, or terms-related inquiries, please contact our legal department at the above address or email legal@ruridenthealth.co.ke
                </p>
              </div>
            </div>
          </section>

          {/* Footer Notice */}
          <div className="bg-gray-800 text-white rounded-lg p-6 text-center">
            <p className="mb-2">
              <strong>These Terms of Service are effective as of January 2024</strong>
            </p>
            <p className="text-sm text-gray-300">
              By continuing to use our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}