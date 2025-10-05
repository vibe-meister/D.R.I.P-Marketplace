'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from './WalletProvider'
import { CheckCircle, AlertCircle, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

interface CreatorAuthProps {
  onAuthSuccess: (creator: any, token: string) => void
}

export default function CreatorAuth({ onAuthSuccess }: CreatorAuthProps) {
  const { account, isConnected, connectWallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    if (!isConnected || !account) {
      toast.error('Please connect your MetaMask wallet first')
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
          walletAddress: account
        })
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('creatorToken', data.token)
        localStorage.setItem('creatorData', JSON.stringify(data.creator))
        
        toast.success('Successfully authenticated as creator!')
        onAuthSuccess(data.creator, data.token)
      } else {
        throw new Error(data.error || 'Authentication failed')
      }

    } catch (error) {
      console.error('Creator auth error:', error)
      toast.error('Failed to authenticate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mb-6"
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Creator Authentication
          </h1>
          <p className="text-white/60">
            Connect your MetaMask wallet to start creating and selling content
          </p>
        </div>

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/5 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Why Connect Your Wallet?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Secure Identity</div>
                    <div className="text-white/60 text-sm">Your wallet address is your unique creator identity</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Direct Payments</div>
                    <div className="text-white/60 text-sm">Receive payments directly to your wallet</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Content Ownership</div>
                    <div className="text-white/60 text-sm">Full control over your content and earnings</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect MetaMask Wallet</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Wallet Connected</span>
              </div>
              <div className="text-white/60 text-sm font-mono break-all">
                {account}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAuth}
              disabled={isLoading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Authenticate as Creator'}
            </motion.button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm">
            Your wallet address will be your creator identity. No additional information required.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}