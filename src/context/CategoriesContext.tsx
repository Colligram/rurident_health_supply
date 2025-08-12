import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Subcategory {
  id: string;
  name: string;
  path: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  subcategories: Subcategory[];
}

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addSubcategory: (categoryId: string, subcategory: Omit<Subcategory, 'id'>) => void;
  updateSubcategory: (categoryId: string, subcategoryId: string, updates: Partial<Subcategory>) => void;
  deleteSubcategory: (categoryId: string, subcategoryId: string) => void;
  getCategoryById: (id: string) => Category | undefined;
  getSubcategoryById: (categoryId: string, subcategoryId: string) => Subcategory | undefined;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// Default categories with React icons
const defaultCategories: Category[] = [
  {
    id: 'dental-laboratory',
    name: 'Dental Laboratory',
    icon: '🔬',
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
    icon: '🪑',
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
    icon: '✂️',
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
    icon: '🔧',
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
    icon: '📷',
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
    icon: '📦',
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
    icon: '💧',
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
    icon: '❤️',
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
    icon: '⭐',
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
    icon: '👥',
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
    icon: '🛡️',
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
    icon: '📦',
    color: 'text-amber-600',
    subcategories: [
      { id: 'composite-materials', name: 'Composite Materials', path: '/products?category=composite-materials', icon: '💎' },
      { id: 'cements', name: 'Dental Cements', path: '/products?category=dental-cements', icon: '🧱' },
      { id: 'impression-materials', name: 'Impression Materials', path: '/products?category=impression-materials', icon: '👤' },
      { id: 'gypsum-products', name: 'Gypsum Products', path: '/products?category=gypsum-products', icon: '🏗️' }
    ]
  }
];

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    // Load from localStorage if available, otherwise use defaults
    const saved = localStorage.getItem('rurident-categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultCategories;
      }
    }
    return defaultCategories;
  });

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('rurident-categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addSubcategory = (categoryId: string, subcategory: Omit<Subcategory, 'id'>) => {
    const newSubcategory: Subcategory = {
      ...subcategory,
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
        : cat
    ));
  };

  const updateSubcategory = (categoryId: string, subcategoryId: string, updates: Partial<Subcategory>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            subcategories: cat.subcategories.map(sub => 
              sub.id === subcategoryId ? { ...sub, ...updates } : sub
            )
          }
        : cat
    ));
  };

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId)
          }
        : cat
    ));
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const getSubcategoryById = (categoryId: string, subcategoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.subcategories.find(sub => sub.id === subcategoryId);
  };

  const value: CategoriesContextType = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getCategoryById,
    getSubcategoryById
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}