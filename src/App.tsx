
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
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Add Product Page - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Edit Product Page - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Orders Management Page - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/customers" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Customers Management Page - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/analytics" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Analytics Page - Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-600">Settings Page - Coming Soon</p>
                      </div>
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
                  path="/location" 
                  element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <LocationPage />
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
                        <CheckoutPage />
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
                        <CheckoutPage />
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
                        <CheckoutPage />
                      </main>
                      <Footer />
                      <ChatBot />
                    </>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;
