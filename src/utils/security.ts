// Security utilities for the application
import CryptoJS from 'crypto-js';

// Encryption key - in production, this should be from environment variables
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'rurident-secure-key-2024';

// Salt for password hashing
const SALT = 'rurident-salt-2024';

/**
 * Hash password with salt
 */
export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password + SALT).toString();
};

/**
 * Encrypt sensitive data
 */
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

/**
 * Decrypt sensitive data
 */
export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

/**
 * Sanitize input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Kenyan format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Generate secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Rate limiting for login attempts
 */
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts = 5;
  private windowMs = 15 * 60 * 1000; // 15 minutes

  isBlocked(identifier: string): boolean {
    const record = this.attempts.get(identifier);
    if (!record) return false;

    const now = Date.now();
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.delete(identifier);
      return false;
    }

    return record.count >= this.maxAttempts;
  }

  recordAttempt(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    record.count++;
    record.lastAttempt = now;
    
    return record.count >= this.maxAttempts;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const loginRateLimiter = new RateLimiter();

/**
 * Permission definitions
 */
export const permissions = {
  admin: [
    'view_analytics',
    'manage_settings',
    'manage_users',
    'change_password',
    'manage_till_numbers',
    'view_financial_data',
    'manage_orders',
    'manage_products',
    'view_customers',
    'export_data'
  ],
  staff: [
    'view_orders',
    'manage_products',
    'view_customers',
    'update_order_status'
  ]
};

/**
 * Check if user has permission
 */
export const hasPermission = (userRole: string, permission: string): boolean => {
  const rolePermissions = permissions[userRole as keyof typeof permissions];
  return rolePermissions ? rolePermissions.includes(permission) : false;
};

/**
 * Audit log entry
 */
export interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: any;
}

/**
 * Simple audit logger
 */
class AuditLogger {
  private logs: AuditLogEntry[] = [];

  log(entry: Omit<AuditLogEntry, 'timestamp'>): void {
    this.logs.push({
      ...entry,
      timestamp: new Date()
    });
    
    // In production, send to server
    console.log('Audit Log:', entry);
  }

  getLogs(): AuditLogEntry[] {
    return [...this.logs];
  }
}

export const auditLogger = new AuditLogger();