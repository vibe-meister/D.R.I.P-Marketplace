'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Fire, 
  Star, 
  Heart, 
  Eye, 
  Clock,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import Link from 'next/link'

interface TrendingItem {
  id: number
  title: string
  creator: string
  price: string
  image: string
  category: string
  likes: number
  views: number
  rating: number
  change: number
  changeType: 'up' | 'down' | 'neutral'
  rank: number
}

export default function TrendingPage() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h')

  const trendingItems: TrendingItem[] = [
    {
      id: 1,
      title: 'AI-Generated Art Collection',
      creator: 'CryptoArtist',
      price: '0.8 USDC',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      category: 'Art',
      likes: 1234,
      views: 5600,
      rating: 4.9,
      change: 25.3,
      changeType: 'up',
      rank: 1
    },
    {
      id: 2,
      title: 'Web3 Development Course',
      creator: 'TechGuru',
      price: '1.2 USDC',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'Education',
      likes: 987,
      views: 4200,
      rating: 4.8,
      change: 18.7,
      changeType: 'up',
      rank: 2
    },
    {
      id: 3,
      title: 'Exclusive Music Track',
      creator: 'MusicProducer',
      price: '0.5 USDC',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'Music',
      likes: 756,
      views: 3800,
      rating: 4.7,
      change: 12.1,
      changeType: 'up',
      rank: 3
    },
    {
      id: 4,
      title: 'Photography Masterclass',
      creator: 'PhotoPro',
      price: '0.6 USDC',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      category: 'Photography',
      likes: 543,
      views: 2900,
      rating: 4.6,
      change: -2.3,
      changeType: 'down',
      rank: 4
    },
    {
      id: 5,
      title: 'Gaming Strategy Guide',
      creator: 'GameMaster',
      price: '0.3 USDC',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
      category: 'Gaming',
      likes: 432,
      views: 2100,
      rating: 4.5,
      change: 0,
      changeType: 'neutral',
      rank: 5
    }
  ]

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-400" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-white/40" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-white/40'
    }
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
            Trending Content
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Discover what's hot and trending in the D.R.I.P marketplace
          </p>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Fire className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-white">Top Performers</h2>
            </div>
            <div className="flex bg-white/10 rounded-lg p-1">
              {(['24h', '7d', '30d'] as const).map((period) => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    timeframe === period
                      ? 'bg-teal-500 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trending List */}
        <div className="space-y-6">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 card-hover"
            >
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    item.rank <= 3 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                      : 'bg-white/10 text-white'
                  }`}>
                    {item.rank}
                  </div>
                </div>

                {/* Content Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-white/60 mb-2">by {item.creator}</p>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Change */}
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text mb-2">{item.price}</div>
                      <div className={`flex items-center space-x-1 ${getChangeColor(item.changeType)}`}>
                        {getChangeIcon(item.changeType)}
                        <span className="text-sm font-medium">
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category and Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </div>
                      {item.rank <= 3 && (
                        <div className="flex items-center space-x-1 text-pink-400">
                          <Fire className="w-4 h-4" />
                          <span className="text-sm font-medium">Hot</span>
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">+45%</h3>
            <p className="text-white/60">Growth in 24h</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Fire className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">1,234</h3>
            <p className="text-white/60">Active Creators</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">4.8</h3>
            <p className="text-white/60">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
