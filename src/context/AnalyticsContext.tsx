import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useProducts } from './ProductsContext';

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  productsSold: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  productsSoldChange: number;
  salesByMonth: { month: string; sales: number; orders: number }[];
  topProducts: { 
    id: string;
    name: string; 
    sales: number; 
    revenue: number;
    category: string;
  }[];
  customerSegments: { 
    segment: string; 
    percentage: number; 
    count: number; 
    revenue: number;
  }[];
  recentActivity: {
    id: string;
    type: 'order' | 'customer' | 'product';
    description: string;
    timestamp: Date;
    amount?: number;
  }[];
}

interface AnalyticsContextType {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  timeRange: string;
  setTimeRange: (range: string) => void;
  refreshData: () => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Simulate realistic business data based on products
const generateAnalyticsData = (products: any[], timeRange: string): AnalyticsData => {
  const currentDate = new Date();
  const daysInRange = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
  
  // Base metrics that scale with time range
  const baseOrdersPerDay = 8;
  const baseCustomersPerDay = 5;
  const avgOrderValue = 45000; // KES 45,000 average order value
  
  const totalOrders = Math.floor(baseOrdersPerDay * daysInRange * (0.8 + Math.random() * 0.4));
  const totalCustomers = Math.floor(baseCustomersPerDay * daysInRange * (0.7 + Math.random() * 0.6));
  const productsSold = Math.floor(totalOrders * 1.8); // Average 1.8 products per order
  const totalRevenue = totalOrders * avgOrderValue * (0.85 + Math.random() * 0.3);

  // Generate percentage changes (realistic business fluctuations)
  const revenueChange = -5 + Math.random() * 25; // -5% to +20%
  const ordersChange = -8 + Math.random() * 23; // -8% to +15%
  const customersChange = -3 + Math.random() * 28; // -3% to +25%
  const productsSoldChange = -10 + Math.random() * 25; // -10% to +15%

  // Generate monthly sales data
  const salesByMonth = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = currentDate.getMonth();
  
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - 5 + i + 12) % 12;
    const monthOrders = Math.floor(baseOrdersPerDay * 30 * (0.7 + Math.random() * 0.6));
    const monthSales = monthOrders * avgOrderValue * (0.8 + Math.random() * 0.4);
    
    salesByMonth.push({
      month: months[monthIndex],
      sales: Math.round(monthSales),
      orders: monthOrders
    });
  }

  // Generate top products based on actual product data
  const topProducts = products.slice(0, 8).map((product, index) => {
    const salesCount = Math.floor(20 + Math.random() * 80 * (1 - index * 0.15));
    const productRevenue = salesCount * (product.price || avgOrderValue * 0.8);
    
    return {
      id: product.id,
      name: product.name,
      sales: salesCount,
      revenue: Math.round(productRevenue),
      category: product.category || 'General'
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Customer segments with realistic distribution
  const customerSegments = [
    { 
      segment: 'Private Dental Clinics', 
      percentage: 42, 
      count: Math.floor(totalCustomers * 0.42),
      revenue: Math.round(totalRevenue * 0.45)
    },
    { 
      segment: 'Dental Students', 
      percentage: 28, 
      count: Math.floor(totalCustomers * 0.28),
      revenue: Math.round(totalRevenue * 0.18)
    },
    { 
      segment: 'Public Hospitals', 
      percentage: 18, 
      count: Math.floor(totalCustomers * 0.18),
      revenue: Math.round(totalRevenue * 0.25)
    },
    { 
      segment: 'Private Hospitals', 
      percentage: 12, 
      count: Math.floor(totalCustomers * 0.12),
      revenue: Math.round(totalRevenue * 0.12)
    }
  ];

  // Generate recent activity
  const activityTypes = [
    { type: 'order' as const, descriptions: [
      'New order from Nairobi Dental Clinic',
      'Order completed for University of Nairobi',
      'Bulk order from Kenyatta Hospital',
      'Student kit order from KMTC',
      'Equipment order from Aga Khan Hospital'
    ]},
    { type: 'customer' as const, descriptions: [
      'New customer registration',
      'Customer account verified',
      'New institutional client onboarded',
      'Customer profile updated'
    ]},
    { type: 'product' as const, descriptions: [
      'New product added to catalog',
      'Product stock updated',
      'Product price updated',
      'Product featured on homepage'
    ]}
  ];

  const recentActivity = [];
  for (let i = 0; i < 15; i++) {
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const description = activityType.descriptions[Math.floor(Math.random() * activityType.descriptions.length)];
    const hoursAgo = Math.floor(Math.random() * 72);
    const timestamp = new Date(currentDate.getTime() - hoursAgo * 60 * 60 * 1000);
    
    recentActivity.push({
      id: `activity_${i}`,
      type: activityType.type,
      description,
      timestamp,
      amount: activityType.type === 'order' ? Math.floor(20000 + Math.random() * 100000) : undefined
    });
  }

  return {
    totalRevenue: Math.round(totalRevenue),
    totalOrders,
    totalCustomers,
    productsSold,
    revenueChange: Math.round(revenueChange * 10) / 10,
    ordersChange: Math.round(ordersChange * 10) / 10,
    customersChange: Math.round(customersChange * 10) / 10,
    productsSoldChange: Math.round(productsSoldChange * 10) / 10,
    salesByMonth,
    topProducts,
    customerSegments,
    recentActivity: recentActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  };
};

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const { products } = useProducts();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30d');

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (products && products.length > 0) {
        const analyticsData = generateAnalyticsData(products, timeRange);
        setData(analyticsData);
      } else {
        setError('No products available for analytics');
      }
    } catch (err) {
      console.error('Error generating analytics:', err);
      setError('Failed to generate analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      refreshData();
    }
  }, [products, timeRange]);

  const value: AnalyticsContextType = {
    data,
    loading,
    error,
    timeRange,
    setTimeRange,
    refreshData
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};