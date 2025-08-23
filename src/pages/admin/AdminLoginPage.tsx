
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAdminAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/sys/panel" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-opacity-80 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <FiUser className="w-8 h-8 text-white drop-shadow" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow mb-1">Admin Login</h1>
            <p className="text-lg text-gray-700/80 font-medium">Rurident Health Supplies</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6 text-sm">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Admin: admin@rurident.com / secure123</p>
            <p>Staff: staff@rurident.com / staff123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-white/40 bg-white/60 focus:bg-white/80 transition-all duration-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-inner"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-white/40 bg-white/60 focus:bg-white/80 transition-all duration-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent shadow-inner"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-pink-600 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl backdrop-blur"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Authorized personnel only</p>
            <Link 
              to="/" 
              className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Client Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
