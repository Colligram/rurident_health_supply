// Route obfuscation utility for security
// Maps obfuscated URLs to actual page components

interface RouteMapping {
  obfuscated: string;
  actual: string;
  component: string;
  adminOnly?: boolean;
  staffRestricted?: boolean;
  requiredPermission?: string;
}

// Generate random route identifiers (these would be generated server-side in production)
const generateObfuscatedId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Static route mappings (in production, these should be generated server-side)
export const ROUTE_MAPPINGS: RouteMapping[] = [
  // Public routes
  { obfuscated: '/p/browse', actual: '/products', component: 'ProductsPage' },
  { obfuscated: '/p/item', actual: '/product', component: 'ProductDetailPage' },
  { obfuscated: '/u/cart', actual: '/cart', component: 'CartPage' },
  { obfuscated: '/u/checkout', actual: '/checkout', component: 'CheckoutPage' },
  { obfuscated: '/u/wishlist', actual: '/wishlist', component: 'WishlistPage' },
  
  // Admin routes - heavily obfuscated
  { obfuscated: '/sys/auth', actual: '/admin/login', component: 'AdminLoginPage' },
  { obfuscated: '/sys/panel', actual: '/admin/dashboard', component: 'AdminDashboardPage', adminOnly: true },
  { obfuscated: '/sys/catalog', actual: '/admin/products', component: 'ProductsManagementPage', adminOnly: true },
  { obfuscated: '/sys/catalog/new', actual: '/admin/products/new', component: 'AddProductPage', adminOnly: true },
  { obfuscated: '/sys/catalog/edit', actual: '/admin/products/edit', component: 'EditProductPage', adminOnly: true },
  { obfuscated: '/sys/categories', actual: '/admin/categories', component: 'CategoryManagementPage', adminOnly: true },
  { obfuscated: '/sys/deals', actual: '/admin/lightning-deals', component: 'LightningDealsManagementPage', adminOnly: true },
  { obfuscated: '/sys/orders', actual: '/admin/orders', component: 'OrdersManagementPage', adminOnly: true },
  { obfuscated: '/sys/users', actual: '/admin/customers', component: 'CustomersManagementPage', adminOnly: true, staffRestricted: true },
  { obfuscated: '/sys/metrics', actual: '/admin/analytics', component: 'AnalyticsPage', adminOnly: true, staffRestricted: true, requiredPermission: 'view_analytics' },
  { obfuscated: '/sys/config', actual: '/admin/settings', component: 'SettingsPage', adminOnly: true, staffRestricted: true, requiredPermission: 'manage_settings' },
];

// Get obfuscated route for actual route
export const getObfuscatedRoute = (actualRoute: string): string => {
  const mapping = ROUTE_MAPPINGS.find(m => actualRoute.startsWith(m.actual));
  return mapping ? actualRoute.replace(m.actual, mapping.obfuscated) : actualRoute;
};

// Get actual route for obfuscated route
export const getActualRoute = (obfuscatedRoute: string): string => {
  const mapping = ROUTE_MAPPINGS.find(m => obfuscatedRoute.startsWith(m.obfuscated));
  return mapping ? obfuscatedRoute.replace(mapping.obfuscated, m.actual) : obfuscatedRoute;
};

// Get route mapping by obfuscated path
export const getRouteMapping = (obfuscatedRoute: string): RouteMapping | undefined => {
  return ROUTE_MAPPINGS.find(m => obfuscatedRoute.startsWith(m.obfuscated));
};

// Navigation helper that uses obfuscated routes
export const navigateSecure = (actualRoute: string): string => {
  return getObfuscatedRoute(actualRoute);
};