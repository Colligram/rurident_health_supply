import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mpesaService, MpesaPaymentRequest } from '../services/mpesaService';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils';
import { 
  HiArrowLeft, 
  HiCreditCard, 
  HiPhone, 
  HiUser, 
  HiMail, 
  HiLocationMarker,
  HiShieldCheck,
  HiCheck,
  HiExclamation
} from 'react-icons/hi';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  nairobiArea?: string; // Added for Nairobi area
}

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<CustomerInfo>>({});

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-max section-padding">
          <div className="text-center py-20">
            <HiExclamation className="mx-auto h-24 w-24 text-orange-300 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Items to Checkout</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Your cart is empty. Add some items before proceeding to checkout.
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center text-lg px-8 py-4"
            >
              <HiArrowLeft className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: Partial<CustomerInfo> = {};
    
    if (!customerInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(?:\+254|254|0)[17]\d{8}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Kenyan phone number';
    }
    if (!customerInfo.address.trim()) errors.address = 'Address is required';
    if (!customerInfo.city.trim()) errors.city = 'City is required';
    if (!customerInfo.county.trim()) errors.county = 'County is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      setPaymentError('Please fill in all required fields correctly.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      const orderId = 'ORDER_' + Date.now();
      
      // Create order in database first
      const orderData = {
        orderId: orderId,
        customerInfo: customerInfo,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: total,
        paymentMethod: paymentMethod,
        paymentStatus: 'pending' as const,
        status: 'pending' as const
      };

      const orderResult = await orderService.createOrder(orderData);
      
      if (paymentMethod === 'mpesa') {
        const paymentRequest: MpesaPaymentRequest = {
          phoneNumber: customerInfo.phone,
          amount: total,
          orderId: orderId,
          description: `Payment for ${items.length} items`
        };

        const result = await mpesaService.initiateSTKPush(paymentRequest);
        
        if (result.success) {
          // Update order payment status to completed
          await orderService.updateOrderStatus(orderResult.id, 'processing', 'completed');
          setPaymentSuccess(true);
          // Simulate successful order processing
          setTimeout(() => {
            clearCart();
            navigate('/');
          }, 3000);
        } else {
          // Update order payment status to failed
          await orderService.updateOrderStatus(orderResult.id, 'cancelled', 'failed');
          setPaymentError(result.message || 'Payment failed. Please try again.');
        }
      } else {
        // For card payments - placeholder for future implementation
        setPaymentError('Card payments coming soon. Please use M-Pesa for now.');
      }
    } catch (error) {
      setPaymentError('An error occurred while processing your payment. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-max section-padding">
          <div className="text-center py-20">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <HiCheck className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for your order. You will receive an SMS confirmation shortly.
            </p>
            <div className="text-sm text-gray-500">
              Redirecting to home page in 3 seconds...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container-max py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>
          <Link 
            to="/cart" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <HiArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information & Payment */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <HiUser className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Customer Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0712345678 or +254712345678"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                      formErrors.address ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe your shipment location (e.g. near house no. 10, behind XYZ shop)"
                    rows={3}
                  />
                  {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.city ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="City"
                  />
                  {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                  {/* Nairobi Area Selection */}
                  {customerInfo.county === 'Nairobi' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Which part of Nairobi?</label>
                      <input
                        type="text"
                        value={customerInfo.nairobiArea || ''}
                        onChange={e => handleInputChange('nairobiArea', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g. Westlands, CBD, Karen, etc."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County *
                  </label>
                  <select
                    value={customerInfo.county}
                    onChange={(e) => handleInputChange('county', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.county ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select County</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Uasin Gishu">Uasin Gishu</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Kajiado">Kajiado</option>
                    <option value="Murang'a">Murang'a</option>
                    <option value="Nyeri">Nyeri</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.county && <p className="text-red-500 text-sm mt-1">{formErrors.county}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={customerInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="00100"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <HiCreditCard className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-4">
                {/* M-Pesa Option */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'mpesa' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                      className="h-4 w-4 text-green-600"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                        M-PESA
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Pay with M-Pesa</p>
                        <p className="text-sm text-gray-500">Secure mobile payment</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'mpesa' && (
                    <div className="mt-3 pl-7">
                      <div className="flex items-center text-sm text-green-700">
                        <HiPhone className="h-4 w-4 mr-2" />
                        You will receive an STK push to your phone: {customerInfo.phone || 'Enter phone number above'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Option - Disabled for now */}
                <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      disabled
                      className="h-4 w-4 text-primary-600"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="bg-gray-400 text-white px-3 py-1 rounded text-sm font-bold mr-3">
                        CARD
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {paymentError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{paymentError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Included</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || !customerInfo.phone}
                className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  isProcessing || !customerInfo.phone
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ${formatPrice(total)} with M-Pesa`
                )}
              </button>

              {/* Security Notice */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <HiShieldCheck className="h-4 w-4" />
                <span>Your payment information is secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}