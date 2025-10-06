# D.R.I.P Marketplace - Hosting Options

## 🚨 Important: GitHub Pages Limitation

**GitHub Pages only supports static sites** and cannot run:
- API routes (`/api/*`)
- Server-side functionality
- Database connections
- Dynamic features

## 🎯 Recommended Hosting Solutions

### 1. **Vercel (Recommended)**
- ✅ **Free tier available**
- ✅ **Full Next.js support**
- ✅ **API routes work**
- ✅ **Database connections**
- ✅ **Automatic deployments from GitHub**

**Deploy to Vercel:**
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables
4. Deploy automatically

### 2. **Netlify**
- ✅ **Free tier available**
- ✅ **Full Next.js support**
- ✅ **API routes work**
- ✅ **Database connections**

### 3. **Railway**
- ✅ **Full-stack hosting**
- ✅ **Database included**
- ✅ **API routes work**
- ✅ **Easy deployment**

### 4. **Render**
- ✅ **Free tier available**
- ✅ **Full Next.js support**
- ✅ **Database support**

## 🔧 Current Configuration Issues

### ❌ GitHub Pages Problems:
- **Static export breaks API routes** - No `/api/*` endpoints
- **No database support** - Can't connect to SQLite/PostgreSQL
- **No server-side rendering** - Dynamic features won't work
- **No file uploads** - Can't handle content uploads

### ✅ What Works on GitHub Pages:
- Static pages (homepage, about, etc.)
- Client-side React components
- Static content display

## 🚀 Quick Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     ```
     DATABASE_URL=your-database-url
     JWT_SECRET=your-jwt-secret
     NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
     ```
   - Deploy!

3. **Database Setup:**
   - Use Vercel Postgres (free tier)
   - Or external database (Railway, Supabase, etc.)

## 📋 Environment Variables for Production

```env
# Database (use production database)
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT Secret (use strong secret)
JWT_SECRET="your-super-secure-jwt-secret-here"

# Base URL (your deployed domain)
NEXT_PUBLIC_BASE_URL="https://your-app.vercel.app"

# Platform Wallet
PLATFORM_WALLET_ADDRESS="0x39d36a64a1e16e52d8353eff82ace7c96502f269"

# Security
ALLOWED_ORIGINS="https://your-app.vercel.app"
```

## 🎯 Recommended Setup

**For full functionality, use Vercel + external database:**

1. **Database:** Railway Postgres (free tier)
2. **Hosting:** Vercel (free tier)
3. **Domain:** Custom domain (optional)

This gives you:
- ✅ Full API functionality
- ✅ Database support
- ✅ File uploads
- ✅ MetaMask integration
- ✅ Payment processing
- ✅ Content management

## 🔄 Alternative: Static Version

If you want to use GitHub Pages, you'd need to:
1. Remove all API routes
2. Use external APIs for backend
3. Remove database functionality
4. Make it a frontend-only app

**This would break the core marketplace functionality.**
