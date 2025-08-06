
export const dentalCategories = {
  'dental-clinic-tools': {
    name: 'Dental Clinic Tools & Instruments',
    subcategories: {
      'diagnostic': {
        name: 'Diagnostic Instruments',
        items: ['Mouth Mirrors', 'Periodontal Probes', 'Explorers', 'College Tweezers', 'Shade Guides']
      },
      'operative': {
        name: 'Operative / Restorative Instruments',
        items: ['Amalgam Carriers', 'Composite Filling Instruments', 'Burnishers', 'Condensers']
      },
      'endodontic': {
        name: 'Endodontic (RCT) Instruments',
        items: ['Rubber Dam Set', 'K-Files & H-Files', 'Paper Points', 'Apex Locator']
      },
      'surgical': {
        name: 'Surgical / Extraction Instruments',
        items: ['Extraction Forceps', 'Elevators', 'Surgical Scalpels', 'Suturing Kit']
      },
      'prosthodontic': {
        name: 'Prosthodontic Instruments',
        items: ['Impression Trays', 'Articulators', 'Shade Guides', 'Wax Knives']
      },
      'orthodontic': {
        name: 'Orthodontic Instruments',
        items: ['Bracket Holding Tweezers', 'Ligature Cutters', 'Orthodontic Forceps']
      }
    }
  },
  'dental-laboratory': {
    name: 'Dental Laboratory Tools & Equipment',
    subcategories: {
      'consumables': {
        name: 'Lab Consumables',
        items: ['Rubber Mixing Bowl', 'Alginate Spatula', 'Articulating Paper']
      },
      'polishing': {
        name: 'Lab Polishing & Finishing',
        items: ['Pumice Powder', 'Polishing Paste', 'Abrasive Wheels']
      },
      'gypsum': {
        name: 'Gypsum Products',
        items: ['Dental Plaster', 'Dental Stone', 'Die Stone']
      },
      'machines': {
        name: 'Laboratory Machines',
        items: ['Dental Micromotor', 'Model Trimmer', 'Casting Machine']
      }
    }
  },
  'dental-materials': {
    name: 'Dental Materials & Consumables',
    subcategories: {
      'restorative': {
        name: 'Restorative Materials',
        items: ['Glass Ionomer Cement', 'Composite Resin', 'Bonding Agents', 'Amalgam Capsules']
      },
      'impression': {
        name: 'Impression & Casting Materials',
        items: ['Alginate Powder', 'Polyvinyl Siloxane', 'Bite Registration Materials']
      }
    }
  },
  'dental-machines': {
    name: 'Dental Machines & Digital Equipment',
    subcategories: {
      'clinical': {
        name: 'Clinical Machines & Equipment',
        items: ['Dental Chair', 'High-speed Handpiece', 'LED Curing Light', 'Digital X-ray', 'Ultrasonic Scaler']
      }
    }
  },
  'infection-control': {
    name: 'Infection Control & Sterilization',
    subcategories: {
      'equipment': {
        name: 'Sterilization Equipment',
        items: ['Autoclaves', 'Ultrasonic Cleaners', 'UV Sterilization Chambers']
      },
      'consumables': {
        name: 'Sterilization Consumables',
        items: ['Sterilization Pouches', 'Disposable Gloves', 'Surface Disinfectants']
      }
    }
  },
  'student-kits': {
    name: 'Student Kits',
    subcategories: {
      'complete': {
        name: 'Complete Student Kits',
        items: ['Basic Dental Kit', 'Advanced Student Kit', 'Surgical Student Kit']
      }
    }
  }
};

export const searchableItems = [
  // Diagnostic
  'Mouth Mirrors', 'Periodontal Probes', 'Explorers', 'College Tweezers', 'Shade Guides',
  // Operative
  'Amalgam Carriers', 'Composite Filling Instruments', 'Burnishers', 'Condensers',
  // Endodontic
  'Rubber Dam Set', 'K-Files', 'H-Files', 'Paper Points', 'Apex Locator',
  // Surgical
  'Extraction Forceps', 'Elevators', 'Surgical Scalpels', 'Suturing Kit',
  // Materials
  'Glass Ionomer Cement', 'Composite Resin', 'Bonding Agents', 'Alginate Powder',
  // Equipment
  'Dental Chair', 'High-speed Handpiece', 'LED Curing Light', 'Digital X-ray'
];
