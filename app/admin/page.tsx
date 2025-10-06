'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

interface AdminStats {
  totalRevenue: number
  platformFees: number
  creatorPayouts: number
  totalTransactions: number
  activeCreators: number
  totalContent: number
}

interface Transaction {
  id: string
  transactionHash: string
  buyerAddress: string
  amount: number
  platformFee: number
  creatorEarnings: number
  status: string
  createdAt: string
  content: {
    title: string
    creator: {
      username: string
    }
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      // In a real app, you would fetch from your admin API
      // For now, we'll use mock data
      setStats({
        totalRevenue: 12.5,
        platformFees: 0.625,
        creatorPayouts: 11.875,
        totalTransactions: 25,
        activeCreators: 8,
        totalContent: 45
      })

      setTransactions([
        {
          id: '1',
          transactionHash: '0x1234...5678',
          buyerAddress: '0xabcd...efgh',
          amount: 0.5,
          platformFee: 0.025,
          creatorEarnings: 0.475,
          status: 'confirmed',
          createdAt: '2024-01-15T10:30:00Z',
          content: {
            title: 'Digital Art Collection',
            creator: { username: 'CryptoArtist' }
          }
        },
        {
          id: '2',
          transactionHash: '0x9876...5432',
          buyerAddress: '0xijkl...mnop',
          amount: 0.3,
          platformFee: 0.015,
          creatorEarnings: 0.285,
          status: 'confirmed',
          createdAt: '2024-01-15T09:15:00Z',
          content: {
            title: 'Music Track',
            creator: { username: 'MusicProducer' }
          }
        }
      ])
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Monitor platform performance, transactions, and manage payouts
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.totalRevenue} USDT</div>
            <div className="text-white/60 text-sm">Total Revenue</div>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.platformFees} USDT</div>
            <div className="text-white/60 text-sm">Platform Fees</div>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.creatorPayouts} USDT</div>
            <div className="text-white/60 text-sm">Creator Payouts</div>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.totalTransactions}</div>
            <div className="text-white/60 text-sm">Transactions</div>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.activeCreators}</div>
            <div className="text-white/60 text-sm">Active Creators</div>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{stats?.totalContent}</div>
            <div className="text-white/60 text-sm">Total Content</div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Transaction</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Buyer</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Content</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Amount</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Fee</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Status</th>
                  <th className="text-left py-4 px-2 text-white/60 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-teal-400 font-mono text-sm">
                          {formatAddress(tx.transactionHash)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-white font-mono text-sm">
                        {formatAddress(tx.buyerAddress)}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div>
                        <div className="text-white font-semibold">{tx.content.title}</div>
                        <div className="text-white/60 text-sm">by {tx.content.creator.username}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-teal-400 font-semibold">{tx.amount} USDT</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-yellow-400 font-semibold">{tx.platformFee} USDT</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium capitalize">
                          {tx.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-white/60 text-sm">
                        {formatDate(tx.createdAt)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Platform Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Platform Wallet & Payouts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Your Wallet Address</h3>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-teal-400 font-mono text-sm break-all">
                    0x39d36a64a1e16e52d8353eff82ace7c96502f269
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-2">
                All buyer payments are sent to this wallet address first
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Creator Payouts</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Pending Payouts</span>
                    <span className="text-yellow-400 font-semibold">2.5 USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Platform Fees Earned</span>
                    <span className="text-teal-400 font-semibold">0.125 USDT</span>
                  </div>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-400 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Payment Flow</span>
                  </div>
                  <div className="text-green-300 text-sm space-y-1">
                    <div>1. Buyers pay to your wallet</div>
                    <div>2. Content unlocked for their address</div>
                    <div>3. You pay creators from your wallet</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary"
                >
                  Process Creator Payouts
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
