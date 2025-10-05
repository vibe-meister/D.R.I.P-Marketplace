'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wallet, AlertCircle } from 'lucide-react'
import { useWallet } from './WalletProvider'
import PaymentProcessor from './PaymentProcessor'
import toast from 'react-hot-toast'

interface ContentItem {
  id: number
  title: string
  creator: string
  price: string
  image: string
  category: string
  likes: number
  views: number
  rating: number
  description: string
}

interface PurchaseModalProps {
  item: ContentItem
  onClose: () => void
}

export default function PurchaseModal({ item, onClose }: PurchaseModalProps) {
  const { account, isConnected } = useWallet()
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false)

  const handlePurchase = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }
    setShowPaymentProcessor(true)
  }

  const handlePaymentSuccess = (transactionHash: string) => {
    toast.success('Payment successful! Content unlocked.')
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  if (showPaymentProcessor) {
    return (
      <PaymentProcessor
        contentId={item.id.toString()}
        price={parseFloat(item.price)}
        onPaymentSuccess={handlePaymentSuccess}
        onClose={handleClose}
      />
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="glass rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Purchase Content</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 mb-2">by {item.creator}</p>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Price</span>
                <span className="text-xl font-bold gradient-text">{item.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Platform Fee (5%)</span>
                <span className="text-white/60">{(parseFloat(item.price) * 0.05).toFixed(4)} ETH</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-xl font-bold gradient-text">
                    {(parseFloat(item.price) * 1.05).toFixed(4)} ETH
                  </span>
                </div>
              </div>
            </div>

            {!isConnected ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-400 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Wallet Not Connected</span>
                </div>
                <p className="text-red-300 text-sm">
                  Please connect your MetaMask wallet to continue with the purchase.
                </p>
              </div>
            ) : (
              <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-teal-400 mb-2">
                  <Wallet className="w-5 h-5" />
                  <span className="font-medium">Wallet Connected</span>
                </div>
                <p className="text-teal-300 text-sm">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePurchase}
              disabled={!isConnected}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
