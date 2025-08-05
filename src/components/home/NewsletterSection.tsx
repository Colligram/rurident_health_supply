import React, { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Dental Innovations
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed">
              Get the latest updates on new products, special offers, and dental industry news 
              delivered straight to your inbox.
            </p>
          </div>
          
          {subscribed ? (
            <div className="bg-green-500 text-white p-6 rounded-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">Thank you for subscribing!</h3>
              <p>You'll receive our latest updates and exclusive offers.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-primary-200 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Weekly Updates</h3>
              <p className="text-primary-200 text-sm">New products and industry news</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Exclusive Offers</h3>
              <p className="text-primary-200 text-sm">Special discounts for subscribers</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Educational Content</h3>
              <p className="text-primary-200 text-sm">Tips and guides for dental professionals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}