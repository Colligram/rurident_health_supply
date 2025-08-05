import React from 'react';
import { Link } from 'react-router-dom';
import { HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi';

const footerLinks = {
  products: [
    { name: 'Dental Chairs', href: '/products/dental-chairs' },
    { name: 'Equipment', href: '/products/equipment' },
    { name: 'Materials', href: '/products/materials' },
    { name: 'X-Ray & Consumables', href: '/products/xray-consumables' },
    { name: 'Student Kits', href: '/products/student-kits' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Reviews', href: '/reviews' },
  ],
  support: [
    { name: 'Delivery Info', href: '/delivery' },
    { name: 'Returns', href: '/returns' },
    { name: 'Warranty', href: '/warranty' },
    { name: 'Track Order', href: '/track' },
    { name: 'Help Center', href: '/help' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Rurident Health Supplies</h3>
                <p className="text-gray-400 text-sm">Your trusted dental partner</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading supplier of dental equipment, chairs, consumables and student kits in Kenya. 
              Serving hospitals, clinics, technicians and dental students nationwide with quality products and reliable service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <HiLocationMarker className="text-primary-400 mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mepalux Plaza Nairobi</p>
                  <p className="text-gray-300">River Road, 3rd Floor</p>
                  <p className="text-gray-300">Opp. Bata Mini Price, Suite 304</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <HiPhone className="text-primary-400 h-5 w-5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:0703416433" className="text-gray-300 hover:text-white transition-colors block">
                    0703 416 433
                  </a>
                  <a href="tel:0795202687" className="text-gray-300 hover:text-white transition-colors block">
                    0795 202 687
                  </a>
                  <a href="tel:0746280715" className="text-gray-300 hover:text-white transition-colors block">
                    0746 280 715
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <HiClock className="text-primary-400 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Rurident Health Supplies. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Trusted by dental professionals across Kenya
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}