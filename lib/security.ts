import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Security utilities for the D.R.I.P platform

export interface SecurityConfig {
  maxFileSize: number;
  allowedFileTypes: string[];
  rateLimitWindow: number;
  maxRequestsPerWindow: number;
}

export const securityConfig: SecurityConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'],
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  maxRequestsPerWindow: 100
};

// Wallet address validation
export function validateWalletAddress(address: string): boolean {
  if (!address) return false;
  
  // Basic Ethereum address validation
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

// Transaction hash validation
export function validateTransactionHash(hash: string): boolean {
  if (!hash) return false;
  
  // Basic Ethereum transaction hash validation
  const txHashRegex = /^0x[a-fA-F0-9]{64}$/;
  return txHashRegex.test(hash);
}

// JWT token verification
export function verifyToken(token: string): any {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not configured');
    
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

// Generate secure token
export function generateToken(payload: any): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

// Log security events
export function logSecurityEvent(event: string, details: any, request: NextRequest) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    ip: request.ip || request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent'),
    url: request.url
  };
  
  // In production, send to logging service
  console.log('Security Event:', logEntry);
}