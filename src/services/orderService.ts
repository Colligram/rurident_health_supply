export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  totalPrice: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  nairobiArea?: string;
}

export interface Order {
  id?: string;
  orderId: string;
  orderNumber: string;
  orderDate: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'mpesa' | 'card';
  paymentStatus: 'pending' | 'completed' | 'failed';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  mpesaTransactionId?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const API_BASE_URL = '/api';

class OrderService {
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string; success: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      return { id: result.id, success: true };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        signal: AbortSignal.timeout(30000)
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const orders = await response.json();
      return orders;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn('Orders request was aborted');
      } else {
        console.error('Error fetching orders:', error);
      }
      // Return empty array instead of throwing to prevent UI errors
      return [];
    }
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch order');
      }

      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string, paymentStatus?: string): Promise<boolean> {
    try {
      const updates: any = { status };
      if (paymentStatus) {
        updates.paymentStatus = paymentStatus;
      }

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      return true;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  // Generate PDF receipt for customer
  async generateReceiptPDF(order: Order): Promise<Blob> {
    try {
      // Use the backend PDF endpoint
      const response = await fetch(`${API_BASE_URL}/orders/${order.id}/receipt`);
      
      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error generating receipt:', error);
      // Fallback to text receipt if PDF generation fails
      const textContent = this.generateReceiptText(order);
      const blob = new Blob([textContent], { type: 'text/plain' });
      return blob;
    }
  }

  // Generate receipt HTML (for future PDF generation)
  private generateReceiptHTML(order: Order): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
            .order-info { margin-bottom: 20px; }
            .items { margin-bottom: 20px; }
            .total { border-top: 1px solid #333; padding-top: 20px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rurident Health Supplies</h1>
            <p>Receipt</p>
          </div>
          
          <div class="order-info">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Date:</strong> ${order.orderDate}</p>
            <p><strong>Customer:</strong> ${order.customerInfo.firstName} ${order.customerInfo.lastName}</p>
            <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
            <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.county}</p>
          </div>
          
          <div class="items">
            <h3>Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${item.totalPrice.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="total">
            <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
            <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #666;">
            <p>Thank you for your purchase!</p>
            <p>Payment Status: ${order.paymentStatus}</p>
            <p>Order Status: ${order.status}</p>
          </div>
        </body>
      </html>
    `;
  }

  // Generate receipt text (fallback)
  private generateReceiptText(order: Order): string {
    return `
RURIDENT HEALTH SUPPLIES - RECEIPT

Order Number: ${order.orderNumber}
Date: ${order.orderDate}

CUSTOMER INFORMATION:
${order.customerInfo.firstName} ${order.customerInfo.lastName}
${order.customerInfo.email}
${order.customerInfo.phone}
${order.customerInfo.address}
${order.customerInfo.city}, ${order.customerInfo.county}

ITEMS:
${order.items.map(item => `${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)}`).join('\n')}

SUMMARY:
Subtotal: $${order.subtotal.toFixed(2)}
Shipping: $${order.shipping.toFixed(2)}
Tax: $${order.tax.toFixed(2)}
TOTAL: $${order.total.toFixed(2)}

Payment Method: ${order.paymentMethod}
Payment Status: ${order.paymentStatus}
Order Status: ${order.status}

Thank you for your purchase!
    `.trim();
  }

  // Download receipt as PDF
  async downloadReceipt(order: Order): Promise<void> {
    try {
      if (!order.id) {
        throw new Error('Order ID is required to download receipt');
      }

      const blob = await this.generateReceiptPDF(order);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Set filename based on content type
      if (blob.type === 'application/pdf') {
        a.download = `receipt-${order.orderNumber}.pdf`;
      } else {
        a.download = `receipt-${order.orderNumber}.txt`;
      }
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService();