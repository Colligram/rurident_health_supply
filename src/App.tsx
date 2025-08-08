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

import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductsManagementPage } from './pages/admin/ProductsManagementPage';
import { AddProductPage } from './pages/admin/AddProductPage';
import { EditProductPage } from './pages/admin/EditProductPage';
import { OrdersManagementPage } from './pages/admin/OrdersManagementPage';
import { CustomersManagementPage } from './pages/admin/CustomersManagementPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatBot } from './components/chat/ChatBot';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductsProvider>
            <Router 
              future={{ 
                v7_startTransition: true,
                v7_relativeSplatPath: true 
              }}
            >
              <div className="min-h-screen bg-gray-50">
                <ScrollToTop />
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products" 
                    element={
                      <ProtectedRoute>
                        <ProductsManagementPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products/new" 
                    element={
                      <ProtectedRoute>
                        <AddProductPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products/:id/edit" 
                    element={
                      <ProtectedRoute>
                        <EditProductPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/orders" 
                    element={
                      <ProtectedRoute>
                        <OrdersManagementPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/customers" 
                    element={
                      <ProtectedRoute>
                        <CustomersManagementPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/analytics" 
                    element={
                      <ProtectedRoute>
                        <AnalyticsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/settings" 
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Public Routes with Layout */}
                  <Route 
                    path="/" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <HomePage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/products" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <ProductsPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/products/:category" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <ProductsPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/product/:id" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <ProductDetailPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <CheckoutPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <CartPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <ContactPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />

                  <Route 
                    path="/blog" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <BlogPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/faq" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <FAQPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/wishlist" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <WishlistPage />
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/account" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <div className="min-h-screen flex items-center justify-center">
                            <p className="text-gray-600">Account Page - Coming Soon</p>
                          </div>
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />
                  <Route 
                    path="/track" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1">
                          <div className="min-h-screen flex items-center justify-center">
                            <p className="text-gray-600">Order Tracking Page - Coming Soon</p>
                          </div>
                        </main>
                        <Footer />
                        <ChatBot />
                      </>
                    } 
                  />

                  {/* Fallback route */}
                  <Route 
                    path="*" 
                    element={
                      <>
                        <Header />
                        <main className="flex-1 min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                            <a href="/" className="btn-primary">Go Home</a>
                          </div>
                        </main>
                        <Footer />
                      </>
                    } 
                  />
                </Routes>
              </div>
            </Router>
          </ProductsProvider>
        </WishlistProvider>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;