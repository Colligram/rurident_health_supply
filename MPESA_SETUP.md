# M-Pesa Integration Setup

## Required API Credentials

To enable M-Pesa payments, you need to set up the following credentials from Safaricom's Developer Portal (https://developer.safaricom.co.ke):

### 1. Get M-Pesa API Credentials

1. **Consumer Key** - Your app's consumer key
2. **Consumer Secret** - Your app's consumer secret  
3. **Business Short Code** - Your business shortcode (usually 6 digits)
4. **Passkey** - Your M-Pesa passkey for STK Push
5. **Callback URL** - URL where M-Pesa will send payment confirmations

### 2. Configure in Your App

Add this code to your main App component or in a configuration file:

```typescript
import { mpesaService } from './src/services/mpesaService';

// Set your M-Pesa credentials
mpesaService.setCredentials({
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  businessShortCode: 'YOUR_BUSINESS_SHORTCODE', // e.g., '174379'
  passkey: 'YOUR_PASSKEY',
  callbackUrl: 'https://yourdomain.com/api/mpesa/callback'
});
```

### 3. Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
REACT_APP_MPESA_CONSUMER_KEY=your_consumer_key_here
REACT_APP_MPESA_CONSUMER_SECRET=your_consumer_secret_here
REACT_APP_MPESA_BUSINESS_SHORTCODE=your_shortcode_here
REACT_APP_MPESA_PASSKEY=your_passkey_here
REACT_APP_MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
```

Then update your app initialization:

```typescript
mpesaService.setCredentials({
  consumerKey: process.env.REACT_APP_MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.REACT_APP_MPESA_CONSUMER_SECRET!,
  businessShortCode: process.env.REACT_APP_MPESA_BUSINESS_SHORTCODE!,
  passkey: process.env.REACT_APP_MPESA_PASSKEY!,
  callbackUrl: process.env.REACT_APP_MPESA_CALLBACK_URL!
});
```

### 4. Test Environment

For testing, you can use Safaricom's sandbox environment:
- Test phone number: `254708374149`
- Test amount: Any amount between 1-70000
- Test shortcode: `174379`

### 5. Production Deployment

1. Ensure your callback URL is accessible over HTTPS
2. Set up proper error handling and logging
3. Implement payment verification and status checking
4. Handle timeout scenarios

## Important Notes

- The current implementation includes a mock mode when credentials are not set
- Always validate payments on your backend
- Implement proper security measures for production
- Test thoroughly with small amounts first

## Support

For M-Pesa API documentation: https://developer.safaricom.co.ke/docs