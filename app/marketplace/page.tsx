'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Eye, 
  ShoppingCart,
  Star,
  TrendingUp,
  Clock,
  Tag,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { useWallet } from '@/components/WalletProvider'
import PurchaseModal from '@/components/PurchaseModal'
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
  isPurchased?: boolean
}

export default function MarketplacePage() {
  const { isConnected } = useWallet()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('trending')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const categories = ['All', 'Art', 'Video', 'Music', 'Photography', 'Education', 'Gaming', 'Lifestyle']

  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: 'Exclusive Digital Art Collection',
      creator: 'CryptoArtist',
      price: '0.5 ETH',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      category: 'Art',
      likes: 234,
      views: 1200,
      rating: 4.8,
      description: 'A stunning collection of digital art pieces created with AI and traditional techniques.'
    },
    {
      id: 2,
      title: 'Behind the Scenes Documentary',
      creator: 'ContentCreator',
      price: '0.2 ETH',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      category: 'Video',
      likes: 189,
      views: 800,
      rating: 4.6,
      description: 'Exclusive behind-the-scenes footage from my latest project.'
    },
    {
      id: 3,
      title: 'Premium Coding Tutorial',
      creator: 'TechGuru',
      price: '0.8 ETH',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'Education',
      likes: 456,
      views: 2000,
      rating: 4.9,
      description: 'Master advanced React patterns and Web3 integration techniques.'
    },
    {
      id: 4,
      title: 'Exclusive Music Track',
      creator: 'MusicProducer',
      price: '0.3 ETH',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'Music',
      likes: 312,
      views: 1500,
      rating: 4.7,
      description: 'Original composition with exclusive rights for NFT holders.'
    },
    {
      id: 5,
      title: 'Photography Masterclass',
      creator: 'PhotoPro',
      price: '0.4 ETH',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      category: 'Photography',
      likes: 178,
      views: 900,
      rating: 4.5,
      description: 'Learn professional photography techniques and post-processing.'
    },
    {
      id: 6,
      title: 'Gaming Strategy Guide',
      creator: 'GameMaster',
      price: '0.15 ETH',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
      category: 'Gaming',
      likes: 267,
      views: 1100,
      rating: 4.4,
      description: 'Advanced strategies and tips for competitive gaming.'
    }
  ]

  const filteredContent = contentItems
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        default:
          return b.likes - a.likes
      }
    })

  const handlePurchase = (item: ContentItem) => {
    if (!isConnected) {
      toast.error('Please connect your MetaMask wallet to make a purchase')
      return
    }
    setSelectedItem(item)
    setShowPurchaseModal(true)
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
            Marketplace
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Discover and purchase exclusive content from talented creators around the world
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search content or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort and View */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex bg-white/10 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-500' : 'hover:bg-white/20'}`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-500' : 'hover:bg-white/20'}`}
                >
                  <List className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={
                  viewMode === 'grid'
                    ? 'glass rounded-xl overflow-hidden card-hover'
                    : 'glass rounded-xl p-6 card-hover flex items-center space-x-6'
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 mb-2">by {item.creator}</p>
                      <p className="text-white/40 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold gradient-text">{item.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePurchase(item)}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Purchase</span>
                        </motion.button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-white/60">by {item.creator}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text">{item.price}</div>
                          <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/40 text-sm mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePurchase(item)}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Purchase</span>
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredContent.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No content found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedItem && (
        <PurchaseModal
          item={selectedItem}
          onClose={() => {
            setShowPurchaseModal(false)
            setSelectedItem(null)
          }}
        />
      )}
    </div>
  )
}
