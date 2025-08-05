import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { LocationPage } from './pages/LocationPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductsManagementPage } from './pages/admin/ProductsManagementPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatBot } from './components/chat/ChatBot';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <ScrollToTop />
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                  <ProtectedRoute>
                    <ProductsManagementPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/products/new" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Add Product Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/products/:id/edit" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Edit Product Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Orders Management Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/customers" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Customers Management Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Analytics Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center">
                      <p className="text-gray-600">Settings Page - Coming Soon</p>
                    </div>
                  </ProtectedRoute>
                } />

                {/* Public Routes */}
                <Route path="/*" element={
                  <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:category" element={<ProductsPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/location" element={<LocationPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/wishlist" element={<CheckoutPage />} />
                        <Route path="/account" element={<CheckoutPage />} />
                        <Route path="/track" element={<CheckoutPage />} />
                      </Routes>
                    </main>
                    <Footer />
                    <ChatBot />
                  </div>
                } />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;