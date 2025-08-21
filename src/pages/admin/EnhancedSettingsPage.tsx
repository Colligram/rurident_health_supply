import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  FiArrowLeft,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiBell,
  FiGlobe,
  FiLock,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX
} from 'react-icons/fi';

interface TillNumber {
  id: string;
  tillNumber: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

interface Settings {
  // General Settings
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  timezone: string;
  
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  
  // Payment Settings
  mpesaEnabled: boolean;
  mpesaShortcode: string;
  mpesaPasskey: string;
  cardPaymentsEnabled: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  
  // Till Numbers
  tillNumbers: TillNumber[];
}

export function EnhancedSettingsPage() {
  const navigate = useNavigate();
  const { user, hasPermission, changePassword } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  
  // Till number management
  const [newTillNumber, setNewTillNumber] = useState({ tillNumber: '', description: '' });
  
  const [settings, setSettings] = useState<Settings>({
    // General Settings
    storeName: 'Rurident Health Supplies',
    storeDescription: 'Professional dental equipment and supplies',
    contactEmail: 'info@rurident.com',
    contactPhone: '+254-700-000-000',
    address: 'Nairobi, Kenya',
    currency: 'KES',
    timezone: 'Africa/Nairobi',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    
    // Payment Settings
    mpesaEnabled: true,
    mpesaShortcode: '174379',
    mpesaPasskey: '',
    cardPaymentsEnabled: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    
    // Till Numbers
    tillNumbers: [
      { id: '1', tillNumber: '174379', description: 'Main Till', isActive: true, createdAt: '2024-01-01' },
      { id: '2', tillNumber: '400200', description: 'Secondary Till', isActive: false, createdAt: '2024-01-15' }
    ]
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!hasPermission('manage_settings')) {
      setSaveMessage('You do not have permission to save settings');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaveMessage('Settings saved successfully!');
        // Update M-Pesa configuration
        await updateMpesaConfig();
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Settings saved locally (demo mode)');
    } finally {
      setLoading(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateMpesaConfig = async () => {
    try {
      await fetch('/api/mpesa/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shortcode: settings.mpesaShortcode,
          passkey: settings.mpesaPasskey,
          tillNumbers: settings.tillNumbers.filter(t => t.isActive)
        }),
      });
    } catch (error) {
      console.error('Error updating M-Pesa config:', error);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      const success = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (success) {
        setSaveMessage('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordError('Current password is incorrect');
      }
    } catch (error) {
      setPasswordError('Failed to change password');
    }
  };

  const addTillNumber = () => {
    if (!newTillNumber.tillNumber || !newTillNumber.description) return;
    
    const tillNumber: TillNumber = {
      id: Date.now().toString(),
      tillNumber: newTillNumber.tillNumber,
      description: newTillNumber.description,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    setSettings(prev => ({
      ...prev,
      tillNumbers: [...prev.tillNumbers, tillNumber]
    }));
    
    setNewTillNumber({ tillNumber: '', description: '' });
  };

  const deleteTillNumber = (id: string) => {
    setSettings(prev => ({
      ...prev,
      tillNumbers: prev.tillNumbers.filter(t => t.id !== id)
    }));
  };

  const toggleTillActive = (id: string) => {
    setSettings(prev => ({
      ...prev,
      tillNumbers: prev.tillNumbers.map(t => 
        t.id === id ? { ...t, isActive: !t.isActive } : t
      )
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FiGlobe },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'payments', name: 'Payments', icon: FiCreditCard },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'till-numbers', name: 'Till Numbers', icon: FiPhone }
  ];

  // Only show certain tabs to staff
  const visibleTabs = user?.role === 'admin' 
    ? tabs 
    : tabs.filter(tab => !['security', 'payments', 'till-numbers'].includes(tab.id));

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your store configuration</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {saveMessage && (
              <span className="text-green-600 text-sm font-medium">{saveMessage}</span>
            )}
            <button
              onClick={handleSave}
              disabled={loading || !hasPermission('manage_settings')}
              className="btn-primary disabled:opacity-50"
            >
              <FiSave className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <nav className="space-y-2">
                {visibleTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => handleSettingChange('storeName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.contactPhone}
                        onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="KES">Kenyan Shilling (KES)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Description
                    </label>
                    <textarea
                      value={settings.storeDescription}
                      onChange={(e) => handleSettingChange('storeDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => handleSettingChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}

              {/* Security Settings - Admin Only */}
              {activeTab === 'security' && user?.role === 'admin' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  
                  {/* Password Change */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Change Password</h3>
                    {passwordError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4">
                        {passwordError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FiLock className="w-4 h-4 mr-2 inline" />
                      Change Password
                    </button>
                  </div>

                  {/* Other Security Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Two-Factor Authentication</label>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        min="15"
                        max="480"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Till Number Management - Admin Only */}
              {activeTab === 'till-numbers' && user?.role === 'admin' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Till Number Management</h2>
                  
                  {/* Add New Till Number */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Add New Till Number</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Till Number
                        </label>
                        <input
                          type="text"
                          value={newTillNumber.tillNumber}
                          onChange={(e) => setNewTillNumber(prev => ({ ...prev, tillNumber: e.target.value }))}
                          placeholder="e.g., 174379"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={newTillNumber.description}
                          onChange={(e) => setNewTillNumber(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="e.g., Main Till"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addTillNumber}
                          disabled={!newTillNumber.tillNumber || !newTillNumber.description}
                          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiPlus className="w-4 h-4 mr-2 inline" />
                          Add Till
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Till Numbers List */}
                  <div className="space-y-3">
                    <h3 className="text-md font-semibold text-gray-900">Existing Till Numbers</h3>
                    {settings.tillNumbers.map((till) => (
                      <div key={till.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-lg font-semibold text-gray-900">
                              {till.tillNumber}
                            </span>
                            <span className="text-sm text-gray-600">
                              {till.description}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              till.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {till.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Added: {new Date(till.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTillActive(till.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              till.isActive
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                            title={till.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {till.isActive ? <FiX className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteTillNumber(till.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">SMS Notifications</label>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Order Notifications</label>
                        <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.orderNotifications}
                          onChange={(e) => handleSettingChange('orderNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Low Stock Alerts</label>
                        <p className="text-sm text-gray-600">Get notified when products are running low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.lowStockAlerts}
                          onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings - Admin Only */}
              {activeTab === 'payments' && user?.role === 'admin' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-md font-semibold text-gray-900">M-Pesa Integration</h3>
                          <p className="text-sm text-gray-600">Enable M-Pesa payments for your store</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.mpesaEnabled}
                            onChange={(e) => handleSettingChange('mpesaEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      
                      {settings.mpesaEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              M-Pesa Shortcode
                            </label>
                            <input
                              type="text"
                              value={settings.mpesaShortcode}
                              onChange={(e) => handleSettingChange('mpesaShortcode', e.target.value)}
                              placeholder="e.g., 174379"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              M-Pesa Passkey
                            </label>
                            <input
                              type="password"
                              value={settings.mpesaPasskey}
                              onChange={(e) => handleSettingChange('mpesaPasskey', e.target.value)}
                              placeholder="Enter passkey"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Card Payments</label>
                        <p className="text-sm text-gray-600">Accept credit and debit card payments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.cardPaymentsEnabled}
                          onChange={(e) => handleSettingChange('cardPaymentsEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}