import { Product } from '../services/database';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Dental Chair Unit',
    description: 'Fully motorized dental chair with LED light system, built-in curing light, and ergonomic design for patient comfort.',
    price: 12000,
    salePrice: 10500,
    originalPrice: 12000,
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400'
    ],
    category: 'Clinical Machines & Equipment',
    inStock: true,
    stock: 3,
    rating: 4.8,
    reviewCount: 15,
    specifications: {
      'Chair Type': 'Hydraulic with Electric Movements',
      'Light': 'LED with 30,000 LUX',
      'Water Supply': 'Independent Water Bottle System',
      'Air Supply': 'Built-in Compressor',
      'Warranty': '2 Years Full Parts & Labor'
    },
    features: [
      'Ergonomic design for patient comfort',
      'LED light system with adjustable intensity',
      'Built-in curing light',
      'Independent water bottle system',
      'Memory positions for chair settings'
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'High-Speed Handpiece Kit',
    description: 'Professional high-speed dental handpiece with ceramic bearings, fiber optic illumination, and autoclavable design.',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400'
    ],
    category: 'Clinical Machines & Equipment',
    inStock: true,
    stock: 25,
    rating: 4.6,
    reviewCount: 32,
    specifications: {
      'Speed': '300,000-400,000 RPM',
      'Coupling': 'ISO Standard',
      'Light': 'Fiber Optic',
      'Bearings': 'Ceramic Ball Bearings',
      'Sterilization': 'Autoclavable up to 135°C'
    },
    features: [
      'Ceramic ball bearings for durability',
      'Fiber optic illumination',
      'Autoclavable construction',
      'Ergonomic grip design',
      'Low noise operation'
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Ultrasonic Scaler',
    description: 'Advanced ultrasonic scaler with multiple scaling modes, LED display, and automatic frequency tuning.',
    price: 850,
    salePrice: 750,
    originalPrice: 850,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
    ],
    category: 'Clinical Machines & Equipment',
    inStock: true,
    stock: 12,
    rating: 4.7,
    reviewCount: 18,
    specifications: {
      'Frequency': '28-32 kHz',
      'Power': '3-20W Adjustable',
      'Display': 'LED Digital Display',
      'Scaling Tips': '5 Different Tips Included',
      'Water Control': 'Automatic Water Supply'
    },
    features: [
      'Multiple scaling modes',
      'LED digital display',
      'Automatic frequency tuning',
      'Water flow control',
      'Lightweight design'
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '4',
    name: 'LED Curing Light',
    description: 'Cordless LED curing light with multiple curing modes, high-intensity output, and ergonomic design.',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400'
    ],
    category: 'Clinical Machines & Equipment',
    inStock: true,
    stock: 30,
    rating: 4.5,
    reviewCount: 24,
    specifications: {
      'Light Intensity': '1000-2000 mW/cm²',
      'Wavelength': '420-480 nm',
      'Battery Life': '60+ minutes continuous use',
      'Curing Modes': '4 Different Modes',
      'Charging Time': '2 hours'
    },
    features: [
      'Cordless operation',
      'Multiple curing modes',
      'High-intensity LED output',
      'Ergonomic lightweight design',
      'Long battery life'
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '5',
    name: 'Crown and Bridge Kit',
    description: 'Complete kit for crown and bridge work including burs, diamonds, and finishing tools.',
    price: 1200,
    salePrice: 1080,
    originalPrice: 1200,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
    ],
    category: 'crown-bridge',
    inStock: true,
    stock: 8,
    rating: 4.9,
    reviewCount: 24,
    specifications: {
      'Kit Contents': 'Burs, Diamonds, Finishing Tools',
      'Material': 'High-Quality Steel & Diamond',
      'Sterilization': 'Autoclavable',
      'Warranty': '1 Year'
    },
    features: [
      'Complete crown preparation tools',
      'Bridge construction instruments',
      'High-quality diamond burs',
      'Finishing and polishing tools',
      'Professional-grade materials'
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '6',
    name: 'Orthodontic Bracket System',
    description: 'Complete orthodontic bracket system with self-ligating brackets and archwires.',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400'
    ],
    category: 'orthodontics',
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviewCount: 31,
    specifications: {
      'Bracket Type': 'Self-Ligating',
      'Material': 'Stainless Steel',
      'Archwire Compatibility': '0.018" & 0.022"',
      'Bracket Size': 'Standard'
    },
    features: [
      'Self-ligating bracket design',
      'Stainless steel construction',
      'Compatible with standard archwires',
      'Easy bracket placement',
      'Reduced treatment time'
    ],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '7',
    name: 'Complete Denture Set',
    description: 'Professional complete denture set with acrylic teeth and base materials.',
    price: 650,
    salePrice: 585,
    originalPrice: 650,
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
    ],
    category: 'complete-dentures',
    inStock: true,
    stock: 20,
    rating: 4.6,
    reviewCount: 18,
    specifications: {
      'Teeth Material': 'Acrylic',
      'Base Material': 'Heat-Cured Acrylic',
      'Shade Selection': 'Multiple Shades Available',
      'Size': 'Standard Sizes'
    },
    features: [
      'High-quality acrylic teeth',
      'Heat-cured base material',
      'Multiple shade options',
      'Natural appearance',
      'Durable construction'
    ],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '8',
    name: 'Partial Denture Framework (Cobalt Chrome)',
    description: 'Cobalt chrome partial denture framework with precision fit and durability.',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400'
    ],
    category: 'partial-dentures',
    inStock: true,
    stock: 6,
    rating: 4.8,
    reviewCount: 12,
    specifications: {
      'Material': 'Cobalt Chrome Alloy',
      'Framework Type': 'Cast Metal',
      'Fit': 'Precision Fit',
      'Durability': 'High Strength'
    },
    features: [
      'Cobalt chrome alloy construction',
      'Precision cast framework',
      'High strength and durability',
      'Excellent fit and retention',
      'Long-lasting performance'
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '9',
    name: 'Lab Consumables Kit',
    description: 'Essential laboratory consumables including wax, plaster, and finishing materials.',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
    ],
    category: 'lab-consumables',
    inStock: true,
    stock: 30,
    rating: 4.5,
    reviewCount: 45,
    specifications: {
      'Contents': 'Wax, Plaster, Finishing Materials',
      'Quantity': 'Bulk Pack',
      'Quality': 'Professional Grade',
      'Shelf Life': '2 Years'
    },
    features: [
      'High-quality modeling wax',
      'Dental plaster and stone',
      'Finishing and polishing materials',
      'Bulk packaging for cost savings',
      'Professional-grade quality'
    ],
    createdAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28')
  },
  {
    id: '10',
    name: 'Dental Loupes with LED Light',
    description: 'Professional magnification loupes with integrated LED illumination and adjustable declination angle.',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1584467735871-8297a492d8ab?w=400'
    ],
    category: 'Diagnostic Instruments',
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviewCount: 13,
    specifications: {
      'Magnification': '2.5x - 3.5x',
      'Working Distance': '340-420mm',
      'Light Source': 'LED 30,000 LUX',
      'Battery Life': '8+ hours',
      'Weight': '65g'
    },
    features: [
      'Variable magnification options',
      'Integrated LED light',
      'Adjustable declination angle',
      'Long battery life',
      'Lightweight design'
    ],
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  }
];