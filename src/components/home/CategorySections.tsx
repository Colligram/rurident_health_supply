import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTool, FiActivity, FiCpu, FiZap } from 'react-icons/fi';

export function CategorySections() {
  const categories = [
    {
      id: 'dental-laboratory',
      title: 'Dental Laboratory',
      description: 'Complete laboratory equipment for precision dental work',
      icon: '🔬',
      bgColor: 'from-blue-500 to-blue-600',
      subsections: [
        { name: 'Casting Machines', path: '/products?category=casting-machines', icon: '⚡' },
        { name: 'Wax Knives', path: '/products?category=wax-knives', icon: '🔪' },
        { name: 'Prosthodontic Instruments', path: '/products?category=prosthodontic-instruments', icon: '🦷' },
        { name: 'Pindex Machines', path: '/products?category=pindex-machines', icon: '📍' },
        { name: 'Handpiece Motors', path: '/products?category=handpiece-motors', icon: '⚙️' }
      ]
    },
    {
      id: 'dental-chairs',
      title: 'Dental Chairs & Units',
      description: 'Premium dental chairs and complete dental units',
      icon: '🪑',
      bgColor: 'from-green-500 to-green-600',
      subsections: [
        { name: 'Electric Dental Chairs', path: '/products?category=electric-chairs', icon: '⚡' },
        { name: 'Hydraulic Chairs', path: '/products?category=hydraulic-chairs', icon: '💧' },
        { name: 'Portable Units', path: '/products?category=portable-units', icon: '📦' },
        { name: 'Chair Accessories', path: '/products?category=chair-accessories', icon: '🔧' },
        { name: 'Delivery Systems', path: '/products?category=delivery-systems', icon: '🚚' }
      ]
    },
    {
      id: 'surgical-equipment',
      title: 'Surgical Equipment',
      description: 'Advanced surgical instruments and equipment',
      icon: '🔬',
      bgColor: 'from-red-500 to-red-600',
      subsections: [
        { name: 'Surgical Handpieces', path: '/products?category=surgical-handpieces', icon: '✂️' },
        { name: 'Implant Kits', path: '/products?category=implant-kits', icon: '🦴' },
        { name: 'Bone Grafting Tools', path: '/products?category=bone-grafting', icon: '🧬' },
        { name: 'Surgical Burs', path: '/products?category=surgical-burs', icon: '💎' },
        { name: 'Suture Materials', path: '/products?category=suture-materials', icon: '🧵' }
      ]
    },
    {
      id: 'orthodontics',
      title: 'Orthodontic Solutions',
      description: 'Complete orthodontic treatment equipment',
      icon: '🔧',
      bgColor: 'from-purple-500 to-purple-600',
      subsections: [
        { name: 'Brackets & Bands', path: '/products?category=brackets-bands', icon: '🔗' },
        { name: 'Orthodontic Wires', path: '/products?category=orthodontic-wires', icon: '📏' },
        { name: 'Pliers & Instruments', path: '/products?category=orthodontic-pliers', icon: '🔧' },
        { name: 'Adhesives & Bonding', path: '/products?category=orthodontic-adhesives', icon: '🧪' },
        { name: 'Retainers & Appliances', path: '/products?category=retainers', icon: '📱' }
      ]
    },
    {
      id: 'imaging-equipment',
      title: 'Imaging & Diagnostics',
      description: 'Digital imaging and diagnostic equipment',
      icon: '📷',
      bgColor: 'from-indigo-500 to-indigo-600',
      subsections: [
        { name: 'Digital X-Ray', path: '/products?category=digital-xray', icon: '📸' },
        { name: 'Intraoral Cameras', path: '/products?category=intraoral-cameras', icon: '📹' },
        { name: 'CBCT Scanners', path: '/products?category=cbct-scanners', icon: '🖥️' },
        { name: 'Cephalometric Equipment', path: '/products?category=cephalometric', icon: '📐' },
        { name: 'Panoramic Units', path: '/products?category=panoramic-units', icon: '🔄' }
      ]
    },
    {
      id: 'consumables',
      title: 'Dental Consumables',
      description: 'Daily use consumables and disposables',
      icon: '📦',
      bgColor: 'from-orange-500 to-orange-600',
      subsections: [
        { name: 'Gloves & PPE', path: '/products?category=gloves-ppe', icon: '🧤' },
        { name: 'Impression Materials', path: '/products?category=impression-materials', icon: '👤' },
        { name: 'Restorative Materials', path: '/products?category=restorative-materials', icon: '🔮' },
        { name: 'Sterilization Supplies', path: '/products?category=sterilization', icon: '🧽' },
        { name: 'Burs & Drills', path: '/products?category=burs-drills', icon: '🔩' }
      ]
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of dental equipment and supplies organized by specialty
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.bgColor} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12 translate-x-4 -translate-y-2">
                  {category.icon}
                </div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>

              {/* Subsections */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {category.subsections.map((subsection, index) => (
                    <Link
                      key={index}
                      to={subsection.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{subsection.icon}</span>
                        <span className="font-medium text-gray-900 group-hover/item:text-orange-600 transition-colors">
                          {subsection.name}
                        </span>
                      </div>
                      <FiArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-orange-600 group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Link
                  to={`/products?category=${category.id}`}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-500 hover:to-orange-600 text-gray-700 hover:text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 group/button"
                >
                  <span>View All {category.title}</span>
                  <FiArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our extensive catalog includes thousands of dental products. Browse our complete collection or contact our experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <span>Browse All Products</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <span>Contact Our Experts</span>
                <FiTool className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}