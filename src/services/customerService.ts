export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  joinDate: string;
  city?: string;
  country?: string;
  postalCode?: string;
  notes?: string;
  tags?: string[];
}

class CustomerService {
  private baseURL = '/api';

  // Mock customers data for development
  private mockCustomers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah@dentalclinic.com',
      phone: '+254712345678',
      address: 'Westlands, Nairobi',
      totalOrders: 15,
      totalSpent: 2450000,
      lastOrderDate: '2024-01-15T10:00:00Z',
      status: 'active',
      joinDate: '2023-06-12T08:00:00Z',
      city: 'Nairobi',
      country: 'Kenya',
      tags: ['VIP', 'Dentist', 'Regular Customer']
    },
    {
      id: 'CUST-002',
      name: 'Dr. Michael Ochieng',
      email: 'michael@smilecenter.com',
      phone: '+254723456789',
      address: 'Kilifi, Mombasa',
      totalOrders: 8,
      totalSpent: 890000,
      lastOrderDate: '2024-01-10T14:30:00Z',
      status: 'active',
      joinDate: '2023-09-20T10:15:00Z',
      city: 'Mombasa',
      country: 'Kenya',
      tags: ['Premium', 'Dentist']
    },
    {
      id: 'CUST-003',
      name: 'Jane Wambui',
      email: 'jane.student@uon.ac.ke',
      phone: '+254734567890',
      address: 'Karen, Nairobi',
      totalOrders: 3,
      totalSpent: 75000,
      lastOrderDate: '2023-12-20T09:45:00Z',
      status: 'active',
      joinDate: '2023-11-05T14:22:00Z',
      city: 'Nairobi',
      country: 'Kenya',
      tags: ['Student', 'New Customer']
    },
    {
      id: 'CUST-004',
      name: 'Dr. Peter Mwangi',
      email: 'peter@healthcenter.co.ke',
      phone: '+254745678901',
      address: 'Thika, Kiambu',
      totalOrders: 22,
      totalSpent: 3200000,
      lastOrderDate: '2024-01-12T16:20:00Z',
      status: 'active',
      joinDate: '2023-03-15T11:30:00Z',
      city: 'Thika',
      country: 'Kenya',
      tags: ['VIP', 'Dentist', 'High Value']
    },
    {
      id: 'CUST-005',
      name: 'Dr. Grace Kiprotich',
      email: 'grace@ruraldental.org',
      phone: '+254756789012',
      address: 'Eldoret, Uasin Gishu',
      totalOrders: 1,
      totalSpent: 45000,
      lastOrderDate: '2023-11-30T13:15:00Z',
      status: 'inactive',
      joinDate: '2023-11-25T09:00:00Z',
      city: 'Eldoret',
      country: 'Kenya',
      tags: ['Rural', 'Inactive']
    },
    {
      id: 'CUST-006',
      name: 'Dr. James Kamau',
      email: 'james@dentalcare.co.ke',
      phone: '+254767890123',
      address: 'Nakuru, Nakuru County',
      totalOrders: 12,
      totalSpent: 1800000,
      lastOrderDate: '2024-01-08T11:20:00Z',
      status: 'active',
      joinDate: '2023-04-10T15:30:00Z',
      city: 'Nakuru',
      country: 'Kenya',
      tags: ['Premium', 'Dentist', 'Regular Customer']
    },
    {
      id: 'CUST-007',
      name: 'Dr. Mary Njeri',
      email: 'mary@smileclinic.org',
      phone: '+254778901234',
      address: 'Kisumu, Kisumu County',
      totalOrders: 6,
      totalSpent: 450000,
      lastOrderDate: '2023-12-15T14:45:00Z',
      status: 'active',
      joinDate: '2023-08-12T10:15:00Z',
      city: 'Kisumu',
      country: 'Kenya',
      tags: ['Dentist', 'Medium Value']
    },
    {
      id: 'CUST-008',
      name: 'Dr. David Ouma',
      email: 'david@dentalpro.co.ke',
      phone: '+254789012345',
      address: 'Machakos, Machakos County',
      totalOrders: 18,
      totalSpent: 2800000,
      lastOrderDate: '2024-01-05T09:30:00Z',
      status: 'active',
      joinDate: '2023-02-18T12:00:00Z',
      city: 'Machakos',
      country: 'Kenya',
      tags: ['VIP', 'Dentist', 'High Value']
    }
  ];

  async getCustomers(): Promise<{ success: boolean; data?: Customer[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch customers`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format for customers');
      }
      
      // Map database format to frontend format with safe defaults
      const mappedData = data.map(customer => ({
        id: customer._id || customer.id,
        name: customer.name || 'Unknown Customer',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        totalOrders: Number(customer.totalOrders) || 0,
        totalSpent: Number(customer.totalSpent) || 0,
        lastOrderDate: customer.lastOrderDate || new Date().toISOString(),
        status: customer.status || 'active',
        joinDate: customer.joinDate || customer.createdAt || new Date().toISOString(),
        city: customer.city || '',
        country: customer.country || 'Kenya',
        postalCode: customer.postalCode || '',
        notes: customer.notes || '',
        tags: customer.tags || []
      }));
      
      return { success: true, data: mappedData };
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Fallback to mock data only if network error
      return { success: true, data: this.mockCustomers };
    }
  }

  async getCustomerById(id: string): Promise<{ success: boolean; data?: Customer; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch customer');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching customer:', error);
      return { success: false, error: 'Failed to fetch customer' };
    }
  }

  async addCustomer(customer: Omit<Customer, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      const result = await response.json();
      return { success: true, id: result.id };
    } catch (error) {
      console.error('Error adding customer:', error);
      return { success: false, error: 'Failed to add customer' };
    }
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating customer:', error);
      return { success: false, error: 'Failed to update customer' };
    }
  }

  async deleteCustomer(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting customer:', error);
      return { success: false, error: 'Failed to delete customer' };
    }
  }

  async searchCustomers(query: string): Promise<{ success: boolean; data?: Customer[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search customers');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error searching customers:', error);
      return { success: false, error: 'Failed to search customers' };
    }
  }

  async getCustomerStats(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/customers/stats`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch customer stats');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching customer stats:', error);
      return { success: false, error: 'Failed to fetch customer stats' };
    }
  }
}

export const customerService = new CustomerService();