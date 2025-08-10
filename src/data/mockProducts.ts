import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Dental Chair Unit',
    description: 'Fully motorized dental chair with LED light system, built-in curing light, and ergonomic design for patient comfort.',
    price: 12000,
    salePrice: 10500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
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
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400',
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
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
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
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400',
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
    name: 'Dental Autoclave Sterilizer',
    description: 'Class B autoclave sterilizer with advanced vacuum system, digital controls, and comprehensive sterilization cycles.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1580281781089-3434eec81a44?w=400',
    images: [
      'https://images.unsplash.com/photo-1580281781089-3434eec81a44?w=400'
    ],
    category: 'Sterilization Equipment',
    inStock: true,
    stock: 8,
    rating: 4.9,
    reviewCount: 12,
    specifications: {
      'Capacity': '18 Liters',
      'Temperature Range': '121-134°C',
      'Cycle Time': '15-45 minutes',
      'Chamber': 'Stainless Steel',
      'Safety Features': 'Multiple Safety Interlocks'
    },
    features: [
      'Class B sterilization standard',
      'Advanced vacuum system',
      'Digital control panel',
      'Multiple cycle options',
      'Safety interlock system'
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: 'Dental Impression Tray Set',
    description: 'Complete set of dental impression trays in various sizes for upper and lower jaw impressions.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1609203803012-ef1c563a3999?w=400',
    images: [
      'https://images.unsplash.com/photo-1609203803012-ef1c563a3999?w=400'
    ],
    category: 'Prosthodontic Instruments',
    inStock: true,
    stock: 50,
    rating: 4.3,
    reviewCount: 28,
    specifications: {
      'Material': 'Medical Grade Plastic',
      'Sizes': '6 Different Sizes',
      'Type': 'Perforated Design',
      'Sterilization': 'Autoclavable',
      'Color': 'Assorted Colors'
    },
    features: [
      'Multiple sizes available',
      'Perforated design for better retention',
      'Autoclavable material',
      'Ergonomic handle design',
      'Color-coded for easy identification'
    ],
    createdAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28')
  },
  {
    id: '7',
    name: 'Composite Filling Kit',
    description: 'Professional composite filling instrument kit with multiple sculpting tools and shade guides.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400',
    images: [
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400'
    ],
    category: 'Operative / Restorative Instruments',
    inStock: true,
    stock: 20,
    rating: 4.4,
    reviewCount: 16,
    specifications: {
      'Tools Included': '12 Different Instruments',
      'Material': 'Stainless Steel',
      'Handle': 'Ergonomic Grip',
      'Case': 'Sterilization Tray Included',
      'Coating': 'Non-slip Surface'
    },
    features: [
      '12 specialized sculpting tools',
      'Stainless steel construction',
      'Ergonomic handle design',
      'Sterilization tray included',
      'Non-slip grip surface'
    ],
    createdAt: new Date('2023-12-25'),
    updatedAt: new Date('2023-12-25')
  },
  {
    id: '8',
    name: 'Digital Dental X-Ray Sensor',
    description: 'High-resolution digital X-ray sensor with instant image capture and superior image quality.',
    price: 3500,
    salePrice: 3200,
    originalPrice: 3500,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
    images: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'
    ],
    category: 'Clinical Machines & Equipment',
    inStock: true,
    stock: 5,
    rating: 4.8,
    reviewCount: 9,
    specifications: {
      'Resolution': '20 LP/mm',
      'Sensor Size': 'Size 2 (31 x 41 mm)',
      'Connection': 'USB 2.0',
      'Software': 'Imaging Software Included',
      'Radiation Reduction': 'Up to 80% Less'
    },
    features: [
      'High-resolution imaging',
      'Instant image capture',
      'Significant radiation reduction',
      'Easy USB connection',
      'Professional imaging software'
    ],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  },
  {
    id: '9',
    name: 'Periodontal Probe Set',
    description: 'Professional periodontal probing kit with color-coded markings and ergonomic handles.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400',
    images: [
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400'
    ],
    category: 'Diagnostic Instruments',
    inStock: true,
    stock: 35,
    rating: 4.2,
    reviewCount: 22,
    specifications: {
      'Probes Included': '6 Different Types',
      'Material': 'Stainless Steel',
      'Markings': 'Color-coded Graduations',
      'Handle': 'Lightweight Aluminum',
      'Precision': '±0.5mm Accuracy'
    },
    features: [
      '6 different probe types',
      'Color-coded markings',
      'Lightweight aluminum handles',
      'High precision measurements',
      'Autoclavable construction'
    ],
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: '10',
    name: 'Dental Loupes with LED Light',
    description: 'Professional magnification loupes with integrated LED illumination and adjustable declination angle.',
    price: 680,
    image: 'https://images.unsplash.com/photo-1584467735871-8297a492d8ab?w=400',
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