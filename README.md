# D.R.I.P - Decentralized Revenue In Payments

**Drip or Dip Out: Fan-Funded Freedom on Chain**

A modern Web3 marketplace for creators to monetize their content through MetaMask payments. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)

## 🌟 Features

- **🔗 MetaMask Integration**: Seamless Web3 wallet connection
- **🎨 Interactive UI**: Animated components with hover effects and transitions
- **👨‍💻 Creator Dashboard**: Upload and manage content with direct wallet payments
- **🛒 Marketplace**: Browse, filter, and purchase content
- **📈 Trending System**: Discover popular content
- **💳 Purchase Flow**: Secure transactions with thank you popups
- **📱 Responsive Design**: Works on all devices

## 🎯 Business Model

- **Creators** upload content and set prices
- **Platform** hosts content and adds 5% fee
- **Buyers** pay through MetaMask to platform wallet
- **Platform** pays creators from their wallet
- **No identity verification** required

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Web3**: MetaMask integration
- **Database**: Prisma with SQLite/PostgreSQL
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drip-marketplace.git
   cd drip-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Pages & Features

### 🏠 Homepage
- Hero section with animated background
- Feature highlights
- Statistics dashboard
- Call-to-action sections

### 🛒 Marketplace
- Browse content with filters
- Search functionality
- Grid/list view options
- Purchase flow with MetaMask

### 👨‍💻 Creator Dashboard
- Upload content with file preview
- Manage existing content
- Analytics and earnings tracking
- MetaMask authentication required

### 📚 User Library
- Access purchased content
- Download files
- View purchase history
- Wallet-specific access control

### 📊 Admin Dashboard
- Transaction monitoring
- Creator payout management
- Platform analytics
- Wallet address: `0x39d36a64a1e16e52d8353eff82ace7c96502f269`

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Platform Wallet
PLATFORM_WALLET_ADDRESS="0x39d36a64a1e16e52d8353eff82ace7c96502f269"
```

### Database Setup

The app uses Prisma with SQLite for development and PostgreSQL for production.

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎨 Customization

### Colors
The app uses a custom color scheme:
- **Teal**: `#14b8a6`
- **Deep Blue**: `#3b82f6`
- **Pink**: `#ec4899`
- **Red Borders**: `#ef4444`

### Animations
Built with Framer Motion for smooth, interactive animations throughout the platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and the amazing React ecosystem
- Styled with Tailwind CSS
- Animated with Framer Motion
- Icons by Lucide React

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/drip-marketplace/issues) page
2. Create a new issue if your problem isn't already addressed
3. Join our community discussions

---

**Built with ❤️ for the Web3 creator economy**

⭐ **Star this repository if you found it helpful!**
