
interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  orderId: string;
  description?: string;
}

interface MpesaResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  checkoutRequestId?: string;
}

class MpesaService {
  private consumerKey: string = '';
  private consumerSecret: string = '';
  private businessShortCode: string = '';
  private passkey: string = '';
  private callbackUrl: string = '';

  // Set API credentials (call this when you get your keys)
  setCredentials(credentials: {
    consumerKey: string;
    consumerSecret: string;
    businessShortCode: string;
    passkey: string;
    callbackUrl: string;
  }) {
    this.consumerKey = credentials.consumerKey;
    this.consumerSecret = credentials.consumerSecret;
    this.businessShortCode = credentials.businessShortCode;
    this.passkey = credentials.passkey;
    this.callbackUrl = credentials.callbackUrl;
  }

  // Generate access token
  private async generateAccessToken(): Promise<string> {
    if (!this.consumerKey || !this.consumerSecret) {
      throw new Error('M-Pesa credentials not set. Please call setCredentials() first.');
    }

    // For now, return a mock token since we don't have credentials yet
    return 'mock_access_token_' + Date.now();
  }

  // Format phone number to required format
  private formatPhoneNumber(phone: string): string {
    // Remove any non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('+254')) {
      cleaned = cleaned.substring(1);
    } else if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned;
    }
    
    return cleaned;
  }

  // Generate timestamp
  private generateTimestamp(): string {
    const now = new Date();
    return now.getFullYear() +
           ('0' + (now.getMonth() + 1)).slice(-2) +
           ('0' + now.getDate()).slice(-2) +
           ('0' + now.getHours()).slice(-2) +
           ('0' + now.getMinutes()).slice(-2) +
           ('0' + now.getSeconds()).slice(-2);
  }

  // Generate password
  private generatePassword(timestamp: string): string {
    if (!this.businessShortCode || !this.passkey) {
      return 'mock_password';
    }
    
    const str = this.businessShortCode + this.passkey + timestamp;
    return btoa(str);
  }

  // Initiate STK Push
  async initiateSTKPush(request: MpesaPaymentRequest): Promise<MpesaResponse> {
    try {
      console.log('Initiating M-Pesa payment for:', request);
      
      const accessToken = await this.generateAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);
      const formattedPhone = this.formatPhoneNumber(request.phoneNumber);

      // Mock response for now - replace with actual API call when credentials are available
      if (!this.consumerKey) {
        // Simulate successful payment initiation
        const mockResponse: MpesaResponse = {
          success: true,
          message: 'Payment request sent successfully. Please check your phone for the M-Pesa prompt.',
          transactionId: 'TXN' + Date.now(),
          checkoutRequestId: 'ws_CO_' + Date.now()
        };

        // Simulate phone prompt
        setTimeout(() => {
          alert(`M-Pesa Payment Prompt\n\nAmount: KES ${request.amount.toLocaleString()}\nPhone: ${formattedPhone}\n\nPlease enter your M-Pesa PIN to complete the payment.`);
        }, 1000);

        return mockResponse;
      }

      // Real implementation would go here when credentials are available
      const stkPushPayload = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: request.amount,
        PartyA: formattedPhone,
        PartyB: this.businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: this.callbackUrl,
        AccountReference: request.orderId,
        TransactionDesc: request.description || 'Payment for order'
      };

      // This would be the actual API call
      const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPushPayload)
      });

      const result = await response.json();

      if (result.ResponseCode === '0') {
        return {
          success: true,
          message: result.ResponseDescription || 'Payment initiated successfully',
          checkoutRequestId: result.CheckoutRequestID
        };
      } else {
        return {
          success: false,
          message: result.ResponseDescription || 'Payment initiation failed'
        };
      }

    } catch (error) {
      console.error('M-Pesa payment error:', error);
      return {
        success: false,
        message: 'Payment service temporarily unavailable. Please try again later.'
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(checkoutRequestId: string): Promise<MpesaResponse> {
    try {
      // Mock implementation for now
      if (!this.consumerKey) {
        return {
          success: true,
          message: 'Payment completed successfully',
          transactionId: 'TXN' + Date.now()
        };
      }

      // Real implementation would check the payment status
      // This would typically involve querying the transaction status endpoint
      
      return {
        success: true,
        message: 'Payment status checked successfully'
      };

    } catch (error) {
      console.error('Payment status check error:', error);
      return {
        success: false,
        message: 'Unable to check payment status'
      };
    }
  }
}

export const mpesaService = new MpesaService();
export type { MpesaPaymentRequest, MpesaResponse };
