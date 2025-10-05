'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from './WalletProvider'
import { CheckCircle, AlertCircle, User, Mail, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

interface CreatorAuthProps {
  onAuthSuccess: (creator: any, token: string) => void
}

export default function CreatorAuth({ onAuthSuccess }: CreatorAuthProps) {
  const { account, isConnected } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  })

  const handleAuth = async () => {
    if (!isConnected || !account) {
      toast.error('Please connect your MetaMask wallet first')
      return
    }

    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: account,
          username: formData.username,
          email: formData.email || null,
          bio: formData.bio || null
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Creator account created successfully!')
        onAuthSuccess(data.creator, data.token)
      } else {
        toast.error(data.error || 'Failed to create creator account')
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error('Failed to authenticate creator')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border border-red-500/30"
      >
        <div className="flex items-center space-x-3 text-red-400 mb-4">
          <AlertCircle className="w-6 h-6" />
          <span className="text-lg font-semibold">Wallet Required</span>
        </div>
        <p className="text-red-300 mb-4">
          You need to connect your MetaMask wallet to create content. This ensures you can receive payments directly to your wallet.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-teal-500/30"
    >
      <div className="flex items-center space-x-3 text-teal-400 mb-4">
        <CheckCircle className="w-6 h-6" />
        <span className="text-lg font-semibold">Wallet Connected</span>
      </div>
      <p className="text-teal-300 mb-6">
        Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Username *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your username"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Email (Optional)
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Bio (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-white/40 w-5 h-5" />
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors resize-none"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAuth}
          disabled={isLoading || !formData.username.trim()}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Creator Account'}
        </motion.button>
      </div>
    </motion.div>
  )
}
