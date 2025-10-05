import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Security headers
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // CORS for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100; // Max 100 requests per 15 minutes
    
    const key = `${ip}:${pathname}`;
    const current = rateLimitStore.get(key);
    
    if (current) {
      if (now < current.resetTime) {
        if (current.count >= maxRequests) {
          return new NextResponse('Too Many Requests', { status: 429 });
        }
        current.count++;
      } else {
        rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      }
    } else {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    }
  }
  
  // Admin route protection
  if (pathname.startsWith('/admin')) {
    // In production, add proper admin authentication
    const adminToken = request.cookies.get('admin-token');
    if (!adminToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
    '/content/:path*'
  ]
};
