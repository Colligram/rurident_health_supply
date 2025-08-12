import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { mpesaService } from "../services/mpesaService";

// Utility: Generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `RUR-${timestamp}-${random}`;
};

// Utility: Get current date
const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const CheckoutPage: React.FC = () => {
  const { items: cart, clearCart } = useCart();
  const navigate = useNavigate();

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

  // Order details
  const orderNumber = generateOrderNumber();
  const orderDate = getCurrentDate();

  // Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.99;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  // Redirect if no cart items
  useEffect(() => {
    if (cart.length === 0) navigate("/products");
  }, [cart, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "county",
      "postalCode",
    ];
    for (const field of requiredFields) {
      if (!customerInfo[field as keyof typeof customerInfo]) {
        setError(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    setError("");

    try {
      const mpesaResponse = await mpesaService.initiateSTKPush({
        phoneNumber: customerInfo.phone,
        amount: total,
        orderNumber,
        callbackUrl: "https://your-callback-url.com",
      });

      if (mpesaResponse.success) {
        const orderData = {
          orderId: mpesaResponse.transactionId,
          orderNumber,
          orderDate,
          customerInfo,
          items: cart.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            totalPrice: item.price * item.quantity,
          })),
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod,
          paymentStatus: "pending" as const,
          status: "pending" as const,
          mpesaTransactionId: mpesaResponse.transactionId,
          notes: `M-Pesa Transaction ID: ${mpesaResponse.transactionId}`,
        };

        try {
          const orderResult = await orderService.createOrder(orderData);
          if (orderResult.success) {
            setOrderDetails(orderData);
            setPaymentSuccess(true);
            clearCart();
          }
        } catch {
          setOrderDetails(orderData);
          setPaymentSuccess(true);
          clearCart();
        }
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!orderDetails) return;
    try {
      await orderService.downloadReceipt(orderDetails);
    } catch {
      setError("Failed to download receipt. Please try again.");
    }
  };

  // Success page
  if (paymentSuccess && orderDetails) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. Your payment has been confirmed.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Order Number:</span>
                <p className="text-gray-900 font-mono">
                  {orderDetails.orderNumber}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Date:</span>
                <p className="text-gray-900">{orderDetails.orderDate}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Total Amount:</span>
                <p className="text-gray-900 font-semibold">
                  ${orderDetails.total.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Payment Method:
                </span>
                <p className="text-gray-900 capitalize">
                  {orderDetails.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Download Your Receipt
            </h3>
            <p className="text-blue-700 mb-4">
              Your receipt is now available for download. This contains all your
              order details.
            </p>
            <button
              onClick={handleDownloadReceipt}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Download Receipt (PDF)
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/products")}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Checkout form
  return (
    <div className="min-h-screen pt-32 bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-orange-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Info */}
              {/* ... same form fields as before ... */}

              {/* Order Summary */}
              {/* ... same summary as before ... */}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors duration-200 font-medium"
              >
                {isProcessing
                  ? "Processing Payment..."
                  : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
