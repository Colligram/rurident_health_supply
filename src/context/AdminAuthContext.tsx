
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hashPassword, encryptData, decryptData, hasPermission as checkPermission, loginRateLimiter, auditLogger } from '../utils/security';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Secure admin users with hashed passwords
const adminUsers = [
  {
    id: '1',
    email: 'admin@rurident.com',
    passwordHash: hashPassword('secure123'),
    name: 'Admin User',
    role: 'admin' as const
  },
  {
    id: '2',
    email: 'staff@rurident.com',
    passwordHash: hashPassword('staff123'),
    name: 'Staff Member',
    role: 'staff' as const
  }
];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      try {
        const decryptedUser = decryptData(savedUser);
        if (decryptedUser) {
          setUser(JSON.parse(decryptedUser));
        } else {
          localStorage.removeItem('adminUser');
        }
      } catch (error) {
        localStorage.removeItem('adminUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check rate limiting
    if (loginRateLimiter.isBlocked(email)) {
      throw new Error('Too many login attempts. Please try again later.');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const passwordHash = hashPassword(password);
    const adminUser = adminUsers.find(
      u => u.email === email && u.passwordHash === passwordHash
    );

    // Record login attempt
    const isBlocked = loginRateLimiter.recordAttempt(email);
    if (isBlocked) {
      auditLogger.log({
        userId: 'unknown',
        action: 'login_blocked',
        resource: 'auth',
        details: { email, reason: 'rate_limit' }
      });
      throw new Error('Too many login attempts. Please try again later.');
    }

    if (adminUser) {
      const userWithoutPassword = {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      };
      
      setUser(userWithoutPassword);
      
      // Encrypt user data before storing
      const encryptedUser = encryptData(JSON.stringify(userWithoutPassword));
      localStorage.setItem('adminUser', encryptedUser);
      
      // Reset rate limiter on successful login
      loginRateLimiter.reset(email);
      
      // Log successful login
      auditLogger.log({
        userId: adminUser.id,
        action: 'login_success',
        resource: 'auth',
        details: { email, role: adminUser.role }
      });
      
      return true;
    }

    // Log failed login
    auditLogger.log({
      userId: 'unknown',
      action: 'login_failed',
      resource: 'auth',
      details: { email, reason: 'invalid_credentials' }
    });

    return false;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;

    const currentHash = hashPassword(currentPassword);
    const adminUser = adminUsers.find(u => u.id === user.id);

    if (adminUser && adminUser.passwordHash === currentHash) {
      // Update password hash
      adminUser.passwordHash = hashPassword(newPassword);
      
      // Log password change
      auditLogger.log({
        userId: user.id,
        action: 'password_changed',
        resource: 'auth',
        details: { email: user.email }
      });
      
      return true;
    }

    // Log failed password change
    auditLogger.log({
      userId: user.id,
      action: 'password_change_failed',
      resource: 'auth',
      details: { email: user.email, reason: 'invalid_current_password' }
    });

    return false;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return checkPermission(user.role, permission);
  };

  const logout = () => {
    if (user) {
      auditLogger.log({
        userId: user.id,
        action: 'logout',
        resource: 'auth',
        details: { email: user.email }
      });
    }
    
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value: AdminAuthContextType = {
    user,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user,
    isLoading,
    hasPermission,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
