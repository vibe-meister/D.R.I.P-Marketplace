'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/components/WalletProvider'
import { 
  Download, 
  Eye, 
  Calendar, 
  User, 
  ExternalLink,
  Lock,
  Unlock
} from 'lucide-react'
import toast from 'react-hot-toast'

interface LibraryItem {
  id: string
  content: {
    id: string
    title: string
    description: string
    category: string
    price: number
    fileUrl: string
    thumbnailUrl?: string
    creator: {
      username: string
      avatar?: string
    }
  }
  accessUrl: string
  createdAt: string
}

export default function LibraryPage() {
  const { account, isConnected } = useWallet()
  const [library, setLibrary] = useState<LibraryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isConnected && account) {
      fetchLibrary()
    }
  }, [isConnected, account])

  const fetchLibrary = async () => {
    try {
      const response = await fetch(`/api/purchase?walletAddress=${account}`)
      const data = await response.json()
      
      if (data.library) {
        setLibrary(data.library)
      }
    } catch (error) {
      console.error('Failed to fetch library:', error)
      toast.error('Failed to load your library')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (item: LibraryItem) => {
    // In a real app, this would trigger the download
    toast.success('Download started!')
  }

  const handleViewContent = (item: LibraryItem) => {
    // Open content in new tab
    window.open(item.accessUrl, '_blank')
  }

  if (!isConnected) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 max-w-md w-full text-center"
        >
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-white/60 mb-8">
            Please connect your MetaMask wallet to view your purchased content library.
          </p>
        </motion.div>
      </div>
    )
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
            My Library
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Access all your purchased content and exclusive materials
          </p>
        </motion.div>

        {/* Library Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Unlock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">{library.length}</h3>
            <p className="text-white/60">Items Purchased</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              {library.length > 0 ? new Date(library[0].createdAt).toLocaleDateString() : 'N/A'}
            </h3>
            <p className="text-white/60">Latest Purchase</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              {new Set(library.map(item => item.content.creator.username)).size}
            </h3>
            <p className="text-white/60">Creators Supported</p>
          </div>
        </motion.div>

        {/* Library Content */}
        {library.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Content Yet</h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              You haven't purchased any content yet. Start exploring the marketplace to build your library!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/marketplace'}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore Marketplace
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {library.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden card-hover"
              >
                <div className="relative">
                  <img
                    src={item.content.thumbnailUrl || item.content.fileUrl}
                    alt={item.content.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Unlock className="w-4 h-4" />
                    <span>Unlocked</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    {item.content.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.content.title}</h3>
                  <p className="text-white/60 mb-2">by {item.content.creator.username}</p>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">{item.content.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-teal-400 font-semibold">{item.content.price} ETH</span>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewContent(item)}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(item)}
                      className="btn-secondary flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
