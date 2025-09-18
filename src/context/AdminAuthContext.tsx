
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
  updateCredentials: (currentPassword: string, newPassword?: string, email?: string, name?: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Admin authentication now handled server-side

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}`
    : '';

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

    try {
      // Authenticate with server
      const response = await fetch(`${apiBase}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

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

      if (response.ok) {
        const result = await response.json();
        const adminUser = result.admin;
        
        const userWithoutPassword = {
          id: adminUser._id,
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
          userId: adminUser._id,
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
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    return updateCredentials(currentPassword, newPassword);
  };

  const updateCredentials = async (currentPassword: string, newPassword?: string, email?: string, name?: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch(`${apiBase}/api/admin/credentials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          email,
          name
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update local user state with new information
        if (result.admin) {
          setUser(result.admin);
          const encryptedUser = encryptData(JSON.stringify(result.admin));
          localStorage.setItem('adminUser', encryptedUser);
        }
        
        // Log successful credential update
        auditLogger.log({
          userId: user.id,
          action: 'credentials_updated',
          resource: 'auth',
          details: { email: user.email, updatedFields: { newPassword: !!newPassword, email: !!email, name: !!name } }
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating credentials:', error);
      
      // Log failed credential update
      auditLogger.log({
        userId: user.id,
        action: 'credentials_update_failed',
        resource: 'auth',
        details: { email: user.email, error: error instanceof Error ? error.message : 'Unknown error' }
      });
      
      return false;
    }
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
    updateCredentials,
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
