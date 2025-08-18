export interface AnalyticsData {
  revenue: {
    total: number;
    monthly: number;
    growth: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  customers: {
    total: number;
    new: number;
    active: number;
    inactive: number;
  };
  products: {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  topCategories: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  monthlyData: Array<{
    month: string;
    revenue: number;
    orders: number;
    customers: number;
  }>;
}

import { getApiBaseURL, withTimeout } from './config';

class AnalyticsService {
  private baseURL = getApiBaseURL();
  private useMockData = false; // Try real API first, fallback to mock data if needed

  async getAnalytics(): Promise<{ success: boolean; data?: AnalyticsData; error?: string }> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, data: this.getMockAnalytics() };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: t.signal
      });
      t.clear();

      if (!response.ok) {
        if (response.status === 404 || response.status >= 500) {
          console.warn('Server unavailable, using mock data');
          this.useMockData = true;
          return { success: true, data: this.getMockAnalytics() };
        }
        throw new Error(`HTTP ${response.status}: Failed to fetch analytics`);
      }

      const data = await response.json();
      
      if (!data) {
        console.warn('Server returned empty data, using mock data as fallback');
        this.useMockData = true;
        return { success: true, data: this.getMockAnalytics() };
      }
      
      this.useMockData = false;
      return { success: true, data };
    } catch (error) {
      console.warn('Error fetching analytics, using mock data:', error);
      this.useMockData = true;
      return { success: true, data: this.getMockAnalytics() };
    }
  }

  private getMockAnalytics(): AnalyticsData {
    return {
      revenue: {
        total: 15420000,
        monthly: 1280000,
        growth: 12.5
      },
      orders: {
        total: 1247,
        pending: 23,
        completed: 1189,
        cancelled: 35
      },
      customers: {
        total: 456,
        new: 34,
        active: 423,
        inactive: 33
      },
      products: {
        total: 234,
        inStock: 189,
        lowStock: 32,
        outOfStock: 13
      },
      topProducts: [
        {
          id: 'PROD-001',
          name: 'Professional Dental Handpiece Set',
          sales: 156,
          revenue: 7020000
        },
        {
          id: 'PROD-002',
          name: 'Digital X-Ray Sensor Kit',
          sales: 89,
          revenue: 11125000
        },
        {
          id: 'PROD-003',
          name: 'Orthodontic Bracket Kit',
          sales: 234,
          revenue: 1989000
        },
        {
          id: 'PROD-004',
          name: 'Dental Chair Unit Complete',
          sales: 12,
          revenue: 5400000
        },
        {
          id: 'PROD-005',
          name: 'Infection Control Kit',
          sales: 189,
          revenue: 2835000
        }
      ],
      topCategories: [
        {
          name: 'Dental Chairs',
          sales: 45,
          revenue: 8900000
        },
        {
          name: 'Laboratory Equipment',
          sales: 123,
          revenue: 4560000
        },
        {
          name: 'Consumables',
          sales: 567,
          revenue: 2340000
        },
        {
          name: 'Student Kits',
          sales: 89,
          revenue: 890000
        },
        {
          name: 'Orthodontics',
          sales: 234,
          revenue: 3450000
        }
      ],
      monthlyData: [
        { month: 'Jan', revenue: 1200000, orders: 98, customers: 45 },
        { month: 'Feb', revenue: 1350000, orders: 112, customers: 52 },
        { month: 'Mar', revenue: 1180000, orders: 95, customers: 48 },
        { month: 'Apr', revenue: 1420000, orders: 118, customers: 56 },
        { month: 'May', revenue: 1280000, orders: 105, customers: 51 },
        { month: 'Jun', revenue: 1560000, orders: 128, customers: 62 },
        { month: 'Jul', revenue: 1340000, orders: 110, customers: 54 },
        { month: 'Aug', revenue: 1480000, orders: 122, customers: 59 },
        { month: 'Sep', revenue: 1320000, orders: 108, customers: 52 },
        { month: 'Oct', revenue: 1450000, orders: 120, customers: 58 },
        { month: 'Nov', revenue: 1380000, orders: 115, customers: 55 },
        { month: 'Dec', revenue: 1280000, orders: 106, customers: 51 }
      ]
    };
  }

  async getRevenueAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().revenue };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/revenue`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch revenue analytics');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      return { success: false, error: 'Failed to fetch revenue analytics' };
    }
  }

  async getOrderAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().orders };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/orders`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch order analytics');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching order analytics:', error);
      return { success: false, error: 'Failed to fetch order analytics' };
    }
  }

  async getCustomerAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().customers };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/customers`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch customer analytics');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching customer analytics:', error);
      return { success: false, error: 'Failed to fetch customer analytics' };
    }
  }

  async getProductAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().products };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/products`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch product analytics');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching product analytics:', error);
      return { success: false, error: 'Failed to fetch product analytics' };
    }
  }

  async getTopProducts(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().topProducts };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/top-products`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch top products');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching top products:', error);
      return { success: false, error: 'Failed to fetch top products' };
    }
  }

  async getTopCategories(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().topCategories };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/top-categories`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch top categories');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching top categories:', error);
      return { success: false, error: 'Failed to fetch top categories' };
    }
  }

  async getMonthlyData(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.useMockData) {
        return { success: true, data: this.getMockAnalytics().monthlyData };
      }

      const t = withTimeout();
      const response = await fetch(`${this.baseURL}/analytics/monthly`, { signal: t.signal });
      t.clear();
      
      if (!response.ok) {
        throw new Error('Failed to fetch monthly data');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching monthly data:', error);
      return { success: false, error: 'Failed to fetch monthly data' };
    }
  }
}

export const analyticsService = new AnalyticsService();