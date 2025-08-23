import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';

import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { WishlistPage } from './pages/WishlistPage';
import { DeliveryPage } from './pages/support/DeliveryPage';
import { TrackOrderPage } from './pages/support/TrackOrderPage';
import { HelpCenterPage } from './pages/support/HelpCenterPage';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/legal/CookiePolicyPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductsManagementPage } from './pages/admin/ProductsManagementPage';
import { AddProductPage } from './pages/admin/AddProductPage';
import { EditProductPage } from './pages/admin/EditProductPage';
import { CategoryManagementPage } from './pages/admin/CategoryManagementPage';
import { LightningDealsManagementPage } from './pages/admin/LightningDealsManagementPage';
import { OrdersManagementPage } from './pages/admin/OrdersManagementPage';
import { CustomersManagementPage } from './pages/admin/CustomersManagementPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { StaffManagementPage } from './pages/admin/StaffManagementPage';
import { ReviewManagementPage } from './pages/admin/ReviewManagementPage';
import { CartProvider } from './context/CartContext';
import { CartAnimationProvider } from './context/CartAnimationContext';
import { WishlistProvider } from './context/WishlistContext';
import { WishlistAnimationProvider } from './context/WishlistAnimationContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatBot } from './components/chat/ChatBot';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <CartAnimationProvider>
          <WishlistProvider>
            <WishlistAnimationProvider>
            <CategoriesProvider>
              <ProductsProvider>
                <AnalyticsProvider>
              <Router 
                future={{ 
                  v7_startTransition: true,
                  v7_relativeSplatPath: true 
                }}
              >
                <div className="min-h-screen bg-gray-50">
                  <ScrollToTop />
                  <Routes>
                    {/* Admin Routes - Obfuscated for Security */}
                    <Route path="/admin" element={<Navigate to="/sys/panel" replace />} />
                    <Route path="/sys/auth" element={<AdminLoginPage />} />
                    <Route 
                      path="/sys/panel" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/categories" 
                      element={
                        <ProtectedRoute>
                          <CategoryManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/catalog" 
                      element={
                        <ProtectedRoute>
                          <ProductsManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/catalog/new" 
                      element={
                        <ProtectedRoute>
                          <AddProductPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/catalog/:id/edit" 
                      element={
                        <ProtectedRoute>
                          <EditProductPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/deals" 
                      element={
                        <ProtectedRoute>
                          <LightningDealsManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/orders" 
                      element={
                        <ProtectedRoute>
                          <OrdersManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/users" 
                      element={
                        <ProtectedRoute staffRestricted={true}>
                          <CustomersManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/metrics" 
                      element={
                        <ProtectedRoute staffRestricted={true} requiredPermission="view_analytics">
                          <AnalyticsPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/staff" 
                      element={
                        <ProtectedRoute staffRestricted={true}>
                          <StaffManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/reviews" 
                      element={
                        <ProtectedRoute staffRestricted={true}>
                          <ReviewManagementPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/sys/config" 
                      element={
                        <ProtectedRoute staffRestricted={true} requiredPermission="manage_settings">
                          <SettingsPage />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Public Routes with Layout - Some Obfuscated */}
                    <Route 
                      path="/" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <HomePage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/p/browse" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <ProductsPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/p/browse/:category" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <ProductsPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/p/item/:id" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <ProductDetailPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/u/checkout" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <CheckoutPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/u/cart" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
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
                          <main className="flex-1 pt-20">
                            <ContactPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/about" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <AboutPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />

                    {/* Legal Pages */}
                    <Route 
                      path="/terms" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <TermsOfServicePage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/privacy" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <PrivacyPolicyPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/cookies" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <CookiePolicyPage />
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
                          <main className="flex-1 pt-20">
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
                          <main className="flex-1 pt-20">
                            <FAQPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/u/wishlist" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <WishlistPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />

                    <Route 
                      path="/delivery" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <DeliveryPage />
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
                          <main className="flex-1 pt-20">
                            <TrackOrderPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />
                    <Route 
                      path="/help" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20">
                            <HelpCenterPage />
                          </main>
                          <Footer />
                          <ChatBot />
                        </>
                      } 
                    />

                    {/* Legacy route redirects for SEO */}
                    <Route path="/products" element={<Navigate to="/p/browse" replace />} />
                    <Route path="/products/:category" element={<Navigate to="/p/browse/:category" replace />} />
                    <Route path="/product/:id" element={<Navigate to="/p/item/:id" replace />} />
                    <Route path="/cart" element={<Navigate to="/u/cart" replace />} />
                    <Route path="/checkout" element={<Navigate to="/u/checkout" replace />} />
                    <Route path="/wishlist" element={<Navigate to="/u/wishlist" replace />} />
                    <Route path="/admin/login" element={<Navigate to="/sys/auth" replace />} />
                    <Route path="/admin/dashboard" element={<Navigate to="/sys/panel" replace />} />

                    {/* Fallback route */}
                    <Route 
                      path="*" 
                      element={
                        <>
                          <Header />
                          <main className="flex-1 pt-20 min-h-screen flex items-center justify-center">
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
              </AnalyticsProvider>
            </ProductsProvider>
          </CategoriesProvider>
            </WishlistAnimationProvider>
        </WishlistProvider>
        </CartAnimationProvider>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;