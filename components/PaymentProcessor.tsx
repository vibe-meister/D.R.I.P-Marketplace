'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from './WalletProvider'
import { CheckCircle, AlertCircle, Wallet, Loader } from 'lucide-react'
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
  const [step, setStep] = useState<'connect' | 'payment' | 'verification' | 'success'>('connect')
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')

  const platformFee = price * 0.05
  const totalAmount = price + platformFee

  // Auto-advance to payment if wallet is connected
  useEffect(() => {
    if (isConnected && step === 'connect') {
      setStep('payment')
    }
  }, [isConnected, step])

  const handlePayment = async () => {
    if (!isConnected || !account) {
      toast.error('Please connect your MetaMask wallet first')
      return
    }

    setIsProcessing(true)

    try {
      // Check if MetaMask is available
      if (typeof window.ethereum === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask is not installed')
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      // Get current network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      console.log('Current chain ID:', chainId)

      // Convert USDT amount to wei (assuming 6 decimals for USDT)
      const amountInWei = (totalAmount * Math.pow(10, 6)).toString()
      
      // For USDT, we need to interact with the USDT contract
      // This is a simplified version - in production you'd use the actual USDT contract
      const transactionParameters = {
        to: PLATFORM_WALLET,
        from: account,
        value: '0x0', // No ETH value for USDT transfer
        data: '0x', // USDT transfer data would go here
        gas: '0x5208', // 21000 gas limit
        gasPrice: '0x3b9aca00', // 1 gwei gas price
      }

      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })

      console.log('Transaction sent:', txHash)
      setTransactionHash(txHash)
      setStep('verification')

      // Wait for transaction confirmation
      const receipt = await waitForTransactionConfirmation(txHash)
      
      if (receipt.status === '0x1') {
        // Transaction successful, process the purchase
        await processPurchase(txHash)
      } else {
        throw new Error('Transaction failed')
      }

    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error(error.message || 'Payment failed')
      setStep('payment')
    } finally {
      setIsProcessing(false)
    }
  }

  const waitForTransactionConfirmation = async (txHash: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const checkConfirmation = async () => {
        try {
          if (!window.ethereum) {
            throw new Error('MetaMask not available')
          }
          const receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash],
          })
          
          if (receipt) {
            resolve(receipt)
          } else {
            setTimeout(checkConfirmation, 2000) // Check again in 2 seconds
          }
        } catch (error) {
          reject(error)
        }
      }
      
      checkConfirmation()
    })
  }

  const processPurchase = async (txHash: string) => {
    try {
      const purchaseResponse = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          buyerAddress: account,
          transactionHash: txHash,
          amount: totalAmount
        })
      })

      const purchaseData = await purchaseResponse.json()

      if (purchaseData.success) {
        setStep('success')
        onPaymentSuccess(txHash)
        toast.success('Payment successful! Content unlocked for your wallet.')
      } else {
        throw new Error(purchaseData.error || 'Failed to process purchase')
      }

    } catch (error) {
      console.error('Purchase processing error:', error)
      toast.error('Failed to unlock content. Please contact support.')
    }
  }

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
                Connect your MetaMask wallet to make a secure USDT payment
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Why Connect Your Wallet?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Secure Payments</div>
                    <div className="text-white/60 text-sm">Direct USDT transfer through MetaMask</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Automatic Processing</div>
                    <div className="text-white/60 text-sm">No manual copying or pasting required</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Instant Unlock</div>
                    <div className="text-white/60 text-sm">Content unlocks automatically after payment</div>
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

        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Complete Payment</h2>
              <p className="text-white/60">
                MetaMask will prompt you to send USDT to complete your purchase
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Content Price
                  </label>
                  <div className="bg-white/10 rounded-lg p-3 text-white font-semibold">
                    {price} USDT
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Platform Fee (5%)
                  </label>
                  <div className="bg-white/10 rounded-lg p-3 text-white font-semibold">
                    {platformFee.toFixed(4)} USDT
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Total Amount
                </label>
                <div className="bg-gradient-to-r from-teal-500/20 to-pink-500/20 border border-teal-500/30 rounded-lg p-4">
                  <div className="text-2xl font-bold gradient-text text-center">
                    {totalAmount.toFixed(4)} USDT
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Payment Process:</h4>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• MetaMask will open automatically</li>
                    <li>• Confirm the USDT transfer</li>
                    <li>• Wait for transaction confirmation</li>
                    <li>• Content will unlock automatically</li>
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
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Pay with MetaMask</span>
                  </>
                )}
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
              <h3 className="text-2xl font-bold text-white mb-2">Processing Payment</h3>
              <p className="text-white/60">
                Please wait while we verify your transaction...
              </p>
            </div>
            <div className="space-y-2 text-sm text-white/40">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span>Transaction confirmed...</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                <span>Verifying payment...</span>
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
                <span className="text-white/60">Amount Paid:</span>
                <span className="text-teal-400">{totalAmount.toFixed(4)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Content Unlocked:</span>
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