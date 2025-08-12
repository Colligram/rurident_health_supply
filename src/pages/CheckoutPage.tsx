import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { mpesaService } from '../services/mpesaService';

// Utility functions for order generation
const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `RUR-${timestamp}-${random}`;
};

const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const CheckoutPage: React.FC = () => {
  const { items: cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
    nairobiArea: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState('');

  // Generate order details
  const orderNumber = generateOrderNumber();
  const orderDate = getCurrentDate();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setError('');

    try {
      // Initiate M-Pesa payment
      const mpesaResponse = await mpesaService.initiateSTKPush({
        phoneNumber: customerInfo.phone,
        amount: total,
        orderId: orderNumber,
        description: `Order payment for ${orderNumber}`
      });

      if (mpesaResponse.success) {
        // Create order in database
        const orderData = {
          orderId: mpesaResponse.transactionId || orderNumber,
          orderNumber: orderNumber,
          orderDate: orderDate,
          customerInfo,
          items: cart.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            totalPrice: item.price * item.quantity
          })),
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod,
          paymentStatus: 'pending' as const,
          status: 'pending' as const,
          mpesaTransactionId: mpesaResponse.transactionId,
          notes: `M-Pesa Transaction ID: ${mpesaResponse.transactionId}`
        };

        try {
          const orderResult = await orderService.createOrder(orderData);
          if (orderResult.success) {
            setOrderDetails(orderData);
            setPaymentSuccess(true);
            clearCart();
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          setOrderDetails(orderData);
          setPaymentSuccess(true);
          clearCart();
        }
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An error occurred during payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const validateForm = (): boolean => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'county', 'postalCode'];
    for (const field of requiredFields) {
      if (!customerInfo[field as keyof typeof customerInfo]) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleDownloadReceipt = async () => {
    if (orderDetails) {
      try {
        await orderService.downloadReceipt(orderDetails);
      } catch (error) {
        console.error('Error downloading receipt:', error);
        setError('Failed to download receipt. Please try again.');
      }
    }
  };

  if (paymentSuccess && orderDetails) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50 py-8">
        {/* Payment Success UI */}
        {/* ...unchanged content... */}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gray-50 py-8">
      {/* Checkout UI */}
      {/* ...unchanged content... */}
    </div>
  );
};

export default CheckoutPage;
