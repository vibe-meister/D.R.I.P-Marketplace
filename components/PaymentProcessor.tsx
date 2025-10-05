'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from './WalletProvider'
import { CheckCircle, AlertCircle, Copy, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

interface PaymentProcessorProps {
  contentId: string
  price: number
  onPaymentSuccess: (transactionHash: string) => void
  onClose: () => void
}

const PLATFORM_WALLET = '0x39d36a64a1e16e52d8353eff82ace7c96502f269'

export default function PaymentProcessor({ contentId, price, onPaymentSuccess, onClose }: PaymentProcessorProps) {
  const { account, isConnected, connectWallet } = useWallet()
  const [step, setStep] = useState<'connect' | 'instructions' | 'payment' | 'verification' | 'success'>('connect')
  const [transactionHash, setTransactionHash] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PLATFORM_WALLET)
    toast.success('Wallet address copied!')
  }

  const handleVerifyTransaction = async () => {
    if (!transactionHash.trim()) {
      toast.error('Please enter the transaction hash')
      return
    }

    setIsVerifying(true)
    setStep('verification')

    try {
      // Process the purchase and unlock content for this specific wallet address
      const purchaseResponse = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          buyerAddress: account, // This specific MetaMask address gets access
          transactionHash: transactionHash.trim(),
          amount: price
        })
      })

      const purchaseData = await purchaseResponse.json()

      if (purchaseData.success) {
        setStep('success')
        onPaymentSuccess(transactionHash.trim())
        toast.success('Payment verified! Content unlocked for your wallet address.')
      } else {
        throw new Error(purchaseData.error || 'Failed to process purchase')
      }

    } catch (error) {
      console.error('Verification failed:', error)
      toast.error('Transaction verification failed. Please check the hash and try again.')
      setStep('payment')
    } finally {
      setIsVerifying(false)
    }
  }

  const platformFee = price * 0.05
  const totalAmount = price + platformFee

  // Auto-advance to instructions if wallet is connected
  useEffect(() => {
    if (isConnected && step === 'connect') {
      setStep('instructions')
    }
  }, [isConnected, step])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {step === 'connect' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Connect Your Wallet</h2>
              <p className="text-white/60 mb-6">
                You need to connect your MetaMask wallet to make a purchase and access your content library.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Why Connect Your Wallet?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Secure Payments</div>
                    <div className="text-white/60 text-sm">Make secure transactions directly from your wallet</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Content Library</div>
                    <div className="text-white/60 text-sm">Access all your purchased content in one place</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Transaction History</div>
                    <div className="text-white/60 text-sm">Track all your purchases and payments</div>
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full btn-secondary text-lg py-4"
            >
              Cancel
            </motion.button>
          </motion.div>
        )}

        {step === 'instructions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Payment Instructions</h2>
              <p className="text-white/60">
                Send the exact amount to our platform wallet to unlock this content
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Send to this wallet address:
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-white/10 rounded-lg p-3 font-mono text-sm text-white break-all">
                    {PLATFORM_WALLET}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyAddress}
                    className="p-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Content Price
                  </label>
                  <div className="bg-white/10 rounded-lg p-3 text-white font-semibold">
                    {price} ETH
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Platform Fee (5%)
                  </label>
                  <div className="bg-white/10 rounded-lg p-3 text-white font-semibold">
                    {platformFee.toFixed(4)} ETH
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Total Amount to Send
                </label>
                <div className="bg-gradient-to-r from-teal-500/20 to-pink-500/20 border border-teal-500/30 rounded-lg p-4">
                  <div className="text-2xl font-bold gradient-text text-center">
                    {totalAmount.toFixed(4)} ETH
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Important Notes:</h4>
                  <ul className="text-yellow-300 text-sm space-y-1">
                    <li>• Send the exact amount: {totalAmount.toFixed(4)} ETH</li>
                    <li>• Use the correct network (Ethereum mainnet)</li>
                    <li>• Save your transaction hash for verification</li>
                    <li>• Content will be unlocked after verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('connect')}
                className="flex-1 btn-secondary text-lg py-4"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('payment')}
                className="flex-1 btn-primary text-lg py-4"
              >
                I've Sent Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Verify Payment</h2>
              <p className="text-white/60">
                Enter your transaction hash to verify and unlock the content
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Transaction Hash *
                </label>
                <input
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors font-mono"
                />
                <p className="text-white/40 text-sm mt-2">
                  You can find this in your MetaMask transaction history
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Payment Summary:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Content Price:</span>
                    <span className="text-white">{price} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Platform Fee:</span>
                    <span className="text-white">{platformFee.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-white font-semibold">Total Sent:</span>
                    <span className="text-teal-400 font-semibold">{totalAmount.toFixed(4)} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('instructions')}
                className="flex-1 btn-secondary text-lg py-4"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerifyTransaction}
                disabled={!transactionHash.trim()}
                className="flex-1 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'verification' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Verifying Payment</h3>
              <p className="text-white/60">
                Please wait while we verify your transaction on the blockchain...
              </p>
            </div>
            <div className="space-y-2 text-sm text-white/40">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span>Checking transaction hash...</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                <span>Verifying amount...</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                <span>Unlocking content...</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-4">
                Payment Successful!
              </h3>
              <p className="text-white/60 mb-6">
                Your content has been unlocked and added to your library
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between">
                <span className="text-white/60">Transaction Hash:</span>
                <span className="text-teal-400 font-mono text-sm">
                  {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Content Unlocked:</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Added to Library:</span>
                <span className="text-green-400">✓</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full btn-primary text-lg py-4"
            >
              View Content
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
