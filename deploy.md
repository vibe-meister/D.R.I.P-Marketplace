# 🚀 Quick Vercel Deployment

## **One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/D.R.I.P-Marketplace)

## **Manual Deployment Steps:**

### **1. Push to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### **2. Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Add environment variables (see below)
6. Click "Deploy"

### **3. Environment Variables**
Add these in Vercel dashboard:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=drip-marketplace-super-secret-jwt-2024
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
PLATFORM_WALLET_ADDRESS=0x39d36a64a1e16e52d8353eff82ace7c96502f269
ALLOWED_ORIGINS=https://your-app.vercel.app
ADMIN_SECRET_KEY=drip-admin-secret-2024
```

### **4. Database Setup**
1. In Vercel → Storage → Create Postgres
2. Copy connection string to `DATABASE_URL`
3. Run: `npx prisma db push` in Vercel terminal

## **✅ That's it! Your marketplace is live!**

**Features that work:**
- ✅ MetaMask integration
- ✅ USDT payments
- ✅ Content upload
- ✅ User library
- ✅ Admin dashboard
- ✅ All API routes
- ✅ Database functionality

**Cost: $0/month** 🎉
