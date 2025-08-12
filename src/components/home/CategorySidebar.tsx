import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiGrid, FiTool, FiActivity, FiCpu, FiZap, FiStar, FiPackage, FiCamera, FiDroplet, FiScissors, FiHeart, FiShield, FiTruck, FiHeadphones, FiCreditCard, FiGift, FiAward, FiUsers, FiSettings, FiSearch } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  path: string;
  icon: string;
}

export function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories: Category[] = [
    {
      id: 'dental-laboratory',
      name: 'Dental Laboratory',
      icon: <FiGrid className="w-5 h-5" />,
      color: 'text-blue-600',
      subcategories: [
        { id: 'crown-bridge', name: 'Crown and Bridge', path: '/products?category=crown-and-bridge', icon: '👑' },
        { id: 'orthodontics-lab', name: 'Orthodontics', path: '/products?category=orthodontics', icon: '🦷' },
        { id: 'complete-dentures', name: 'Complete Dentures', path: '/products?category=complete-dentures', icon: '😁' },
        { id: 'partial-dentures', name: 'Partial Dentures (Cobalt Chrome)', path: '/products?category=partial-dentures-cobalt-chrome', icon: '🦿' },
        { id: 'casting-machines', name: 'Casting Machines', path: '/products?category=casting-machines', icon: '⚡' },
        { id: 'wax-knives', name: 'Wax Knives', path: '/products?category=wax-knives', icon: '🔪' },
        { id: 'prosthodontic-instruments', name: 'Prosthodontic Instruments', path: '/products?category=prosthodontic-instruments', icon: '🦷' },
        { id: 'pindex-machines', name: 'Pindex Machines', path: '/products?category=pindex-machines', icon: '📍' },
        { id: 'handpiece-motors', name: 'Handpiece Motors', path: '/products?category=handpiece-motors', icon: '⚙️' }
      ]
    },
    {
      id: 'dental-chairs',
      name: 'Dental Chairs & Units',
      icon: <FiActivity className="w-5 h-5" />,
      color: 'text-green-600',
      subcategories: [
        { id: 'electric-chairs', name: 'Electric Dental Chairs', path: '/products?category=electric-chairs', icon: '⚡' },
        { id: 'hydraulic-chairs', name: 'Hydraulic Chairs', path: '/products?category=hydraulic-chairs', icon: '💧' },
        { id: 'portable-units', name: 'Portable Units', path: '/products?category=portable-units', icon: '📦' },
        { id: 'chair-accessories', name: 'Chair Accessories', path: '/products?category=chair-accessories', icon: '🔧' },
        { id: 'delivery-systems', name: 'Delivery Systems', path: '/products?category=delivery-systems', icon: '🚚' }
      ]
    },
    {
      id: 'surgical-equipment',
      name: 'Surgical Equipment',
      icon: <FiScissors className="w-5 h-5" />,
      color: 'text-red-600',
      subcategories: [
        { id: 'surgical-handpieces', name: 'Surgical Handpieces', path: '/products?category=surgical-handpieces', icon: '✂️' },
        { id: 'implant-kits', name: 'Implant Kits', path: '/products?category=implant-kits', icon: '🦴' },
        { id: 'bone-grafting', name: 'Bone Grafting Tools', path: '/products?category=bone-grafting', icon: '🧬' },
        { id: 'surgical-burs', name: 'Surgical Burs', path: '/products?category=surgical-burs', icon: '💎' },
        { id: 'suture-materials', name: 'Suture Materials', path: '/products?category=suture-materials', icon: '🧵' }
      ]
    },
    {
      id: 'orthodontics',
      name: 'Orthodontic Solutions',
      icon: <FiTool className="w-5 h-5" />,
      color: 'text-purple-600',
      subcategories: [
        { id: 'brackets-bands', name: 'Brackets & Bands', path: '/products?category=brackets-bands', icon: '🔗' },
        { id: 'orthodontic-wires', name: 'Orthodontic Wires', path: '/products?category=orthodontic-wires', icon: '📏' },
        { id: 'orthodontic-pliers', name: 'Pliers & Instruments', path: '/products?category=orthodontic-pliers', icon: '🔧' },
        { id: 'orthodontic-adhesives', name: 'Adhesives & Bonding', path: '/products?category=orthodontic-adhesives', icon: '🧪' },
        { id: 'retainers', name: 'Retainers & Appliances', path: '/products?category=retainers', icon: '📱' }
      ]
    },
    {
      id: 'imaging-equipment',
      name: 'Imaging & Diagnostics',
      icon: <FiCamera className="w-5 h-5" />,
      color: 'text-indigo-600',
      subcategories: [
        { id: 'digital-xray', name: 'Digital X-Ray', path: '/products?category=digital-xray', icon: '📸' },
        { id: 'intraoral-cameras', name: 'Intraoral Cameras', path: '/products?category=intraoral-cameras', icon: '📹' },
        { id: 'cbct-scanners', name: 'CBCT Scanners', path: '/products?category=cbct-scanners', icon: '🖥️' },
        { id: 'cephalometric', name: 'Cephalometric Equipment', path: '/products?category=cephalometric', icon: '📐' },
        { id: 'panoramic-units', name: 'Panoramic Units', path: '/products?category=panoramic-units', icon: '🔄' }
      ]
    },
    {
      id: 'consumables',
      name: 'Dental Consumables',
      icon: <FiPackage className="w-5 h-5" />,
      color: 'text-orange-600',
      subcategories: [
        { id: 'gloves-ppe', name: 'Gloves & PPE', path: '/products?category=gloves-ppe', icon: '🧤' },
        { id: 'impression-materials', name: 'Impression Materials', path: '/products?category=impression-materials', icon: '👤' },
        { id: 'restorative-materials', name: 'Restorative Materials', path: '/products?category=restorative-materials', icon: '🔮' },
        { id: 'sterilization', name: 'Sterilization Supplies', path: '/products?category=sterilization', icon: '🧽' },
        { id: 'burs-drills', name: 'Burs & Drills', path: '/products?category=burs-drills', icon: '🔩' }
      ]
    },
    {
      id: 'endodontics',
      name: 'Endodontics',
      icon: <FiDroplet className="w-5 h-5" />,
      color: 'text-teal-600',
      subcategories: [
        { id: 'rct-instruments', name: 'RCT Instruments', path: '/products?category=rct-instruments', icon: '🔬' },
        { id: 'endodontic-files', name: 'Endodontic Files', path: '/products?category=endodontic-files', icon: '📏' },
        { id: 'gutta-percha', name: 'Gutta Percha', path: '/products?category=gutta-percha', icon: '🟡' },
        { id: 'sealers', name: 'Sealers & Cements', path: '/products?category=sealers', icon: '🧪' }
      ]
    },
    {
      id: 'periodontics',
      name: 'Periodontics',
      icon: <FiHeart className="w-5 h-5" />,
      color: 'text-pink-600',
      subcategories: [
        { id: 'scaling-instruments', name: 'Scaling Instruments', path: '/products?category=scaling-instruments', icon: '🦷' },
        { id: 'curettes', name: 'Curettes', path: '/products?category=curettes', icon: '🔪' },
        { id: 'periodontal-probes', name: 'Periodontal Probes', path: '/products?category=periodontal-probes', icon: '📏' }
      ]
    },
    {
      id: 'radiology',
      name: 'Radiology',
      icon: <FiStar className="w-5 h-5" />,
      color: 'text-yellow-600',
      subcategories: [
        { id: 'x-ray-films', name: 'X-Ray Films', path: '/products?category=x-ray-films', icon: '📷' },
        { id: 'processing-chemicals', name: 'Processing Chemicals', path: '/products?category=processing-chemicals', icon: '🧪' },
        { id: 'protective-equipment', name: 'Protective Equipment', path: '/products?category=protective-equipment', icon: '🛡️' }
      ]
    },
    {
      id: 'student-kits',
      name: 'Student Kits',
      icon: <FiUsers className="w-5 h-5" />,
      color: 'text-gray-600',
      subcategories: [
        { id: 'basic-kits', name: 'Basic Student Kits', path: '/products?category=basic-kits', icon: '📚' },
        { id: 'advanced-kits', name: 'Advanced Kits', path: '/products?category=advanced-kits', icon: '🎓' },
        { id: 'specialty-kits', name: 'Specialty Kits', path: '/products?category=specialty-kits', icon: '🔬' }
      ]
    },
    {
      id: 'sterilization',
      name: 'Sterilization & Safety',
      icon: <FiShield className="w-5 h-5" />,
      color: 'text-emerald-600',
      subcategories: [
        { id: 'autoclaves', name: 'Autoclaves', path: '/products?category=autoclaves', icon: '🔥' },
        { id: 'sterilization-packs', name: 'Sterilization Packs', path: '/products?category=sterilization-packs', icon: '📦' },
        { id: 'indicators', name: 'Sterilization Indicators', path: '/products?category=sterilization-indicators', icon: '🎯' },
        { id: 'ppe-equipment', name: 'PPE Equipment', path: '/products?category=ppe-equipment', icon: '🛡️' }
      ]
    },
    {
      id: 'dental-materials',
      name: 'Dental Materials',
      icon: <FiPackage className="w-5 h-5" />,
      color: 'text-amber-600',
      subcategories: [
        { id: 'composite-materials', name: 'Composite Materials', path: '/products?category=composite-materials', icon: '💎' },
        { id: 'cements', name: 'Dental Cements', path: '/products?category=dental-cements', icon: '🧱' },
        { id: 'impression-materials', name: 'Impression Materials', path: '/products?category=impression-materials', icon: '👤' },
        { id: 'gypsum-products', name: 'Gypsum Products', path: '/products?category=gypsum-products', icon: '🏗️' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: string) => expandedCategories.includes(categoryId);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-white rounded-xl shadow-lg border border-gray-100 px-6 py-4 flex items-center justify-between hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <FiGrid className="w-6 h-6 text-primary-600" />
            <span className="font-semibold text-gray-900">Browse Categories</span>
          </div>
          {isMobileMenuOpen ? (
            <FiChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <FiChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-3">
            <FiGrid className="w-6 h-6" />
            <span>All Categories</span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Categories List */}
      <div className="max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className={`${category.color}`}>
                  {category.icon}
                </div>
                <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </span>
              </div>
              {isExpanded(category.id) ? (
                <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              ) : (
                <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              )}
            </button>

            {/* Subcategories Dropdown */}
            {isExpanded(category.id) && (
              <div className="bg-gray-50 border-t border-gray-100">
                <div className="px-6 py-3 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.path}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group/sub"
                    >
                      <span className="text-lg">{subcategory.icon}</span>
                      <span className="text-sm text-gray-700 group-hover/sub:text-primary-600 transition-colors">
                        {subcategory.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

              {/* Recently Viewed */}
        <div className="px-6 py-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recently Viewed</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Dental Chairs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Orthodontic Wires</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              <span>Sterilization Equipment</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Quick Access</span>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-4">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-3">
              <FiGrid className="w-5 h-5" />
              <span>All Categories</span>
            </h2>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Mobile Categories List */}
          <div className="max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${category.color}`}>
                      {category.icon}
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </span>
                  </div>
                  {isExpanded(category.id) ? (
                    <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  ) : (
                    <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  )}
                </button>

                {/* Subcategories Dropdown */}
                {isExpanded(category.id) && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    <div className="px-6 py-3 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={subcategory.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group/sub"
                        >
                          <span className="text-lg">{subcategory.icon}</span>
                          <span className="text-sm text-gray-700 group-hover/sub:text-primary-600 transition-colors">
                            {subcategory.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Recently Viewed */}
          <div className="px-6 py-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recently Viewed</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Dental Chairs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Orthodontic Wires</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Sterilization Equipment</span>
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Quick Access</span>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}