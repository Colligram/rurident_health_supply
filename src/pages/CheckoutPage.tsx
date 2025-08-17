import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { mpesaService } from '../services/mpesaService';
import { formatPrice, isValidEmail, isValidPhone } from '../utils';
import { FiShield, FiCreditCard, FiSmartphone, FiTruck, FiCheck, FiX, FiAlertTriangle, FiClock, FiLock } from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';

// Utility: Generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `RUR-${timestamp}-${random}`;
};

// Utility: Get current date
const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Utility: Format countdown timer
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Anti-fraud measures
const detectFraudRisk = (customerInfo: any, cart: any[]): { risk: 'low' | 'medium' | 'high', reasons: string[] } => {
  const reasons: string[] = [];
  let riskScore = 0;

  // Check for suspicious patterns
  if (!isValidEmail(customerInfo.email)) {
    riskScore += 30;
    reasons.push('Invalid email format');
  }

  if (!isValidPhone(customerInfo.phone)) {
    riskScore += 40;
    reasons.push('Invalid phone number format');
  }

  // Check for high-value orders
  const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (orderTotal > 500000) { // KSH 500,000
    riskScore += 25;
    reasons.push('High-value order requires verification');
  }

  // Check for multiple items of same expensive product
  const expensiveItems = cart.filter(item => item.price > 100000);
  if (expensiveItems.length > 3) {
    riskScore += 20;
    reasons.push('Multiple expensive items');
  }

  // Determine risk level
  if (riskScore >= 60) return { risk: 'high', reasons };
  if (riskScore >= 30) return { risk: 'medium', reasons };
  return { risk: 'low', reasons };
};

export const CheckoutPage: React.FC = () => {
  const { items: cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    nairobiArea: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentRevoked, setPaymentRevoked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [fraudCheck, setFraudCheck] = useState<{ risk: 'low' | 'medium' | 'high', reasons: string[] } | null>(null);

  // Order details
  const orderNumber = generateOrderNumber();
  const orderDate = getCurrentDate();

  // Calculate totals in KSH
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 50000 ? 0 : 500; // Free delivery for orders over KSH 50,000
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + delivery + tax;

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

  const validateStep1 = (): boolean => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'county'];
    return required.every(field => customerInfo[field as keyof typeof customerInfo].trim() !== '');
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      // Run fraud detection
      const fraudResult = detectFraudRisk(customerInfo, cart);
      setFraudCheck(fraudResult);
      setCurrentStep(2);
    }
  };

  const simulateMpesaPrompt = () => {
    if (!isValidPhone(customerInfo.phone)) {
      setError('Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)');
      return;
    }

    setMpesaPromptSent(true);
    setPaymentRevoked(false);
    setTimeRemaining(180); // 3 minutes in seconds
    setError('');

    // Start countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setPaymentRevoked(true);
          setMpesaPromptSent(false);
          setError('Payment timeout. Please try again.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate M-Pesa payment confirmation (user has 3 minutes)
    const paymentTimeout = setTimeout(() => {
      if (!paymentConfirmed && !paymentRevoked) {
        clearInterval(countdownInterval);
        setPaymentRevoked(true);
        setMpesaPromptSent(false);
        setError('Payment timed out. Please initiate payment again.');
      }
    }, 180000); // 3 minutes

    // Simulate successful payment after random time (30 seconds to 2.5 minutes for demo)
    const paymentDelay = Math.random() * 120000 + 30000; // 30s to 2.5 minutes
    const paymentSimulation = setTimeout(() => {
      if (!paymentRevoked && mpesaPromptSent) {
        clearInterval(countdownInterval);
        clearTimeout(paymentTimeout);
        setPaymentConfirmed(true);
        handlePayment();
      }
    }, paymentDelay);

    // Store timeout references for cleanup
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(paymentTimeout);
      clearTimeout(paymentSimulation);
    };
  };

  const handlePayment = async () => {
    // Only proceed if payment is confirmed and not revoked
    if (!paymentConfirmed || paymentRevoked) {
      setError('Payment not confirmed. Please complete the M-Pesa payment.');
      return;
    }

    if (fraudCheck?.risk === 'high') {
      setError('Order requires manual verification. Please contact customer service.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Simulate M-Pesa payment initiation
      const mpesaResponse = await mpesaService.initiateSTKPush({
        phoneNumber: customerInfo.phone,
        amount: total,
        orderNumber: orderNumber,
        callbackUrl: 'https://your-callback-url.com'
      });

      if (mpesaResponse.success) {
        // Create order in database
        const orderData = {
          orderId: mpesaResponse.transactionId || `mpesa_${Date.now()}`,
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
          delivery,
          tax,
          total,
          paymentMethod,
          paymentStatus: 'confirmed' as const,
          status: 'pending' as const,
          mpesaTransactionId: mpesaResponse.transactionId || `MPESA_${Date.now()}`,
          fraudRisk: fraudCheck?.risk || 'low',
          notes: `M-Pesa Payment Confirmed. Transaction ID: ${mpesaResponse.transactionId || `MPESA_${Date.now()}`}`
        };

        const orderResult = await orderService.createOrder(orderData);
        if (orderResult.success) {
          setOrderDetails(orderData);
          setPaymentSuccess(true);
          clearCart();
          setCurrentStep(3);
        } else {
          throw new Error('Failed to create order');
        }
      } else {
        throw new Error('M-Pesa payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess && currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 pt-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your payment has been processed successfully. Your order is now being prepared for delivery.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Order Number:</span>
                  <div className="font-bold text-gray-900">{orderDetails?.orderNumber}</div>
                </div>
                <div>
                  <span className="text-gray-500">Total Amount:</span>
                  <div className="font-bold text-gray-900">{formatPrice(total)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method:</span>
                  <div className="font-bold text-gray-900">M-Pesa</div>
                </div>
                <div>
                  <span className="text-gray-500">Delivery:</span>
                  <div className="font-bold text-gray-900">2-4 business days</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/account')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 font-medium ${
                  step <= currentStep ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {step === 1 ? 'Details' : step === 2 ? 'Payment' : 'Confirmation'}
                </span>
                {step < 3 && <div className="w-20 h-0.5 bg-gray-200 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={customerInfo.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={customerInfo.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="0712345678 or +254712345678"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={customerInfo.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">County *</label>
                        <select
                          name="county"
                          value={customerInfo.county}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">Select County</option>
                          <option value="Nairobi">Nairobi</option>
                          <option value="Kiambu">Kiambu</option>
                          <option value="Mombasa">Mombasa</option>
                          <option value="Nakuru">Nakuru</option>
                          <option value="Kisumu">Kisumu</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={customerInfo.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {customerInfo.county === 'Nairobi' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nairobi Area (Optional)</label>
                        <input
                          type="text"
                          name="nairobiArea"
                          value={customerInfo.nairobiArea}
                          onChange={handleInputChange}
                          placeholder="e.g., Westlands, Karen, CBD"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep1()}
                    className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition-all ${
                      validateStep1() 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Fraud Risk Warning */}
                  {fraudCheck && fraudCheck.risk !== 'low' && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      fraudCheck.risk === 'high' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className="flex items-center mb-2">
                        <FiAlertTriangle className={`w-5 h-5 mr-2 ${
                          fraudCheck.risk === 'high' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                        <span className={`font-medium ${
                          fraudCheck.risk === 'high' ? 'text-red-800' : 'text-yellow-800'
                        }`}>
                          {fraudCheck.risk === 'high' ? 'Security Review Required' : 'Additional Verification'}
                        </span>
                      </div>
                      <ul className={`text-sm ${
                        fraudCheck.risk === 'high' ? 'text-red-700' : 'text-yellow-700'
                      }`}>
                        {fraudCheck.reasons.map((reason, index) => (
                          <li key={index}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-6 mb-8">
                    {/* M-Pesa Option - Enhanced Green Design */}
                    <div 
                      className={`border-3 rounded-xl p-6 cursor-pointer transition-all shadow-lg ${
                        paymentMethod === 'mpesa' 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-green-200' 
                          : 'border-green-300 bg-green-50 hover:border-green-400 hover:shadow-green-100'
                      }`}
                      onClick={() => setPaymentMethod('mpesa')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                            <FiSmartphone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-green-800 text-lg">M-Pesa</h3>
                            <p className="text-sm text-green-700">Pay with your mobile money - Safe & Secure</p>
                            <p className="text-xs text-green-600 mt-1">✓ Instant payment confirmation</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-3 ${
                          paymentMethod === 'mpesa' ? 'border-green-600 bg-green-600' : 'border-green-400'
                        }`}>
                          {paymentMethod === 'mpesa' && <FiCheck className="w-4 h-4 text-white m-0.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Card Option - Properly Dimmed */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 opacity-40 cursor-not-allowed bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <FiCreditCard className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-400 text-lg">Credit/Debit Card</h3>
                            <p className="text-sm text-gray-400">Visa, Mastercard - Currently unavailable</p>
                            <p className="text-xs text-gray-400 mt-1">✗ Not supported at this time</p>
                          </div>
                        </div>
                        <span className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full text-sm font-bold">
                          Disabled
                        </span>
                      </div>
                    </div>

                    {/* Bank Transfer Option - Properly Dimmed */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 opacity-40 cursor-not-allowed bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <FaUniversity className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-400 text-lg">Bank Transfer</h3>
                            <p className="text-sm text-gray-400">Direct bank transfer - Currently unavailable</p>
                            <p className="text-xs text-gray-400 mt-1">✗ Not supported at this time</p>
                          </div>
                        </div>
                        <span className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full text-sm font-bold">
                          Disabled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* M-Pesa Payment Flow - Enhanced Green Theme */}
                  {paymentMethod === 'mpesa' && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 mb-6 shadow-lg">
                      <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                        <FiLock className="w-5 h-5 mr-2" />
                        Secure M-Pesa Payment
                      </h4>
                      
                      {!mpesaPromptSent ? (
                        <div>
                          <p className="text-green-700 mb-4 text-base">
                            You will receive an M-Pesa prompt on <strong className="text-green-800">{customerInfo.phone}</strong> to complete your payment of <strong className="text-green-800">{formatPrice(total)}</strong>
                          </p>
                          <button
                            onClick={simulateMpesaPrompt}
                            disabled={fraudCheck?.risk === 'high'}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                              fraudCheck?.risk === 'high'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                          >
                            {fraudCheck?.risk === 'high' ? 'Payment Blocked - Contact Support' : 'Send M-Pesa Prompt'}
                          </button>
                        </div>
                      ) : !paymentConfirmed && !paymentRevoked ? (
                        <div className="text-center">
                          <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"></div>
                          <p className="text-green-800 font-bold mb-2 text-lg">M-Pesa prompt sent to your phone</p>
                          <p className="text-sm text-green-700 mb-4">Please check your phone and enter your M-Pesa PIN</p>
                          
                          {/* Countdown Timer */}
                          <div className="bg-green-200 border-2 border-green-400 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-center mb-2">
                              <FiClock className="w-5 h-5 mr-2 text-green-700" />
                              <span className="text-lg font-bold text-green-800">
                                Time Remaining: {formatTime(timeRemaining)}
                              </span>
                            </div>
                            <div className="w-full bg-green-300 rounded-full h-3">
                              <div 
                                className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${(timeRemaining / 180) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-green-700 font-medium">Waiting for payment confirmation...</p>
                        </div>
                      ) : paymentRevoked ? (
                        <div className="text-center">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiX className="w-6 h-6 text-red-600" />
                          </div>
                          <p className="text-red-700 font-medium mb-2">Payment Timed Out</p>
                          <p className="text-sm text-red-600 mb-4">Please initiate payment again</p>
                          <button
                            onClick={() => {
                              setPaymentRevoked(false);
                              setMpesaPromptSent(false);
                              setError('');
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiCheck className="w-8 h-8 text-green-700" />
                          </div>
                          <p className="text-green-800 font-bold text-lg">Payment Confirmed!</p>
                          <p className="text-sm text-green-700">Processing your order...</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">
                    {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (16%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-orange-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {delivery === 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <FiTruck className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Free delivery on orders over KSH 50,000</span>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center text-gray-600">
                  <FiShield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Secure checkout</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiTruck className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">2-4 business days delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <FiX className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};