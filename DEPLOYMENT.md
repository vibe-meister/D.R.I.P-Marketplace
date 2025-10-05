# D.R.I.P Platform Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ 
- Database (PostgreSQL recommended for production)
- Domain name
- SSL certificate

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Database (use PostgreSQL for production)
DATABASE_URL="postgresql://username:password@localhost:5432/drip_marketplace"

# JWT Secret (generate a strong secret)
JWT_SECRET="your-super-secret-jwt-key-here"

# Base URL
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"

# Platform Wallet
PLATFORM_WALLET_ADDRESS="0x39d36a64a1e16e52d8353eff82ace7c96502f269"

# Production Settings
NODE_ENV="production"
```

### Database Setup

1. **Install Prisma CLI:**
   ```bash
   npm install -g prisma
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Run Database Migrations:**
   ```bash
   npx prisma db push
   ```

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Manual Server
1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up proper CORS policies
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Backup database regularly
- [ ] Use environment variables for secrets

### File Upload Configuration

For production, consider using:
- AWS S3 for file storage
- Cloudinary for image optimization
- IPFS for decentralized storage

### Monitoring

- Set up error tracking (Sentry)
- Monitor database performance
- Track transaction success rates
- Monitor wallet connection issues

### Backup Strategy

1. **Database Backups:**
   ```bash
   pg_dump drip_marketplace > backup.sql
   ```

2. **File Backups:**
   - Backup uploaded content regularly
   - Store in multiple locations

### Performance Optimization

1. **Database:**
   - Add indexes for frequently queried fields
   - Use connection pooling
   - Monitor query performance

2. **File Storage:**
   - Use CDN for static assets
   - Optimize images
   - Implement caching

### Support

For deployment issues:
- Check logs: `npm run logs`
- Health check: `GET /api/health`
- Database status: Check Prisma connection

---

**Platform Wallet:** `0x39d36a64a1e16e52d8353eff82ace7c96502f269`
**All payments go to this address first, then you pay creators manually.**
