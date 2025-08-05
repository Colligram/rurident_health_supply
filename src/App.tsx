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
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ChatBot } from './components/chat/ChatBot';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <ScrollToTop />
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
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;