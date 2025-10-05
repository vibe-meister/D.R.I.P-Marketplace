import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { WalletProvider } from '@/components/WalletProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D.R.I.P - Decentralized Revenue In Payments',
  description: 'Drip or Dip Out: Fan-Funded Freedom on Chain',
  keywords: 'Web3, NFT, Creator Economy, MetaMask, Decentralized',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-teal-900 via-deepBlue-900 to-pink-900">
            <Navigation />
            <main className="relative">
              {children}
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  border: '1px solid #ef4444',
                },
              }}
            />
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
