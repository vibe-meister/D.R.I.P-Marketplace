'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Eye } from 'lucide-react'
import { useWallet } from '@/components/WalletProvider'
import CreatorAuth from '@/components/CreatorAuth'
import CreatorDashboard from '@/components/CreatorDashboard'

export default function CreatePage() {
  const { isConnected } = useWallet()
  const [creator, setCreator] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if creator is already authenticated
    const storedToken = localStorage.getItem('creatorToken')
    if (storedToken) {
      // Verify token and get creator data
      fetch('/api/auth/creator', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.creator) {
          setCreator(data.creator)
          setToken(storedToken)
        }
      })
      .catch(() => {
        localStorage.removeItem('creatorToken')
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleAuthSuccess = (creatorData: any, authToken: string) => {
    setCreator(creatorData)
    setToken(authToken)
    localStorage.setItem('creatorToken', authToken)
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (creator && token) {
    return <CreatorDashboard creator={creator} token={token} />
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Create Content
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Share your creativity with the world and earn from your content through Web3 payments
          </p>
        </motion.div>

        {/* Creator Authentication */}
        <CreatorAuth onAuthSuccess={handleAuthSuccess} />

        {/* Creator Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Direct Payments</h3>
            <p className="text-white/60">Receive payments directly to your MetaMask wallet</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Low Fees</h3>
            <p className="text-white/60">Only 5% platform fee - keep more of your earnings</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
            <p className="text-white/60">Reach fans worldwide with Web3 technology</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
