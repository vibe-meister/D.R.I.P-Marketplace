'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Heart
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Creator {
  id: string
  username: string
  walletAddress: string
  content: any[]
  _count: {
    content: number
    purchases: number
  }
}

interface CreatorDashboardProps {
  creator: Creator
  token: string
}

export default function CreatorDashboard({ creator, token }: CreatorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'analytics'>('overview')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Art',
    file: null as File | null,
    preview: null as string | null
  })
  const [isUploading, setIsUploading] = useState(false)

  const categories = [
    { value: 'Art', label: 'Digital Art' },
    { value: 'Video', label: 'Video Content' },
    { value: 'Music', label: 'Music & Audio' },
    { value: 'Education', label: 'Educational' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Lifestyle', label: 'Lifestyle' }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadData(prev => ({
        ...prev,
        file,
        preview: URL.createObjectURL(file)
      }))
    }
  }

  const handleContentUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uploadData.title || !uploadData.description || !uploadData.price || !uploadData.file) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsUploading(true)

    try {
      // Upload file first
      const formData = new FormData()
      formData.append('file', uploadData.file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const uploadData_result = await uploadResponse.json()

      if (!uploadData_result.success) {
        throw new Error(uploadData_result.error)
      }

      // Create content record
      const contentResponse = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: uploadData.title,
          description: uploadData.description,
          price: uploadData.price,
          category: uploadData.category,
          fileUrl: uploadData_result.fileUrl
        })
      })

      const contentData = await contentResponse.json()

      if (contentData.success) {
        toast.success('Content uploaded successfully!')
        setShowUploadForm(false)
        setUploadData({
          title: '',
          description: '',
          price: '',
          category: 'Art',
          file: null,
          preview: null
        })
        // Refresh content list
        window.location.reload()
      } else {
        throw new Error(contentData.error)
      }

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload content')
    } finally {
      setIsUploading(false)
    }
  }

  const stats = [
    {
      label: 'Total Content',
      value: creator._count.content,
      icon: Upload,
      color: 'from-teal-500 to-teal-600'
    },
    {
      label: 'Total Sales',
      value: creator._count.purchases,
      icon: DollarSign,
      color: 'from-pink-500 to-pink-600'
    },
    {
      label: 'Total Views',
      value: '2.5K',
      icon: Eye,
      color: 'from-deepBlue-500 to-deepBlue-600'
    },
    {
      label: 'Earnings',
      value: '1.2 ETH',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Creator Dashboard
          </h1>
          <p className="text-xl text-white/60">
            Welcome back, {creator.username}! Manage your content and track your earnings.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center hover-glow"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'content', label: 'My Content', icon: Upload },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadForm(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Content</span>
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {creator.content.slice(0, 4).map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-xl p-4 card-hover"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={content.thumbnailUrl || '/placeholder.jpg'}
                        alt={content.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{content.title}</h4>
                        <p className="text-white/60 text-sm mb-2">{content.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-teal-400 font-semibold">{content.price} ETH</span>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Eye className="w-4 h-4" />
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">My Content</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadForm(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                {creator.content.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-xl p-6 card-hover"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={content.thumbnailUrl || '/placeholder.jpg'}
                        alt={content.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">{content.title}</h4>
                        <p className="text-white/60 mb-2">{content.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                              {content.category}
                            </span>
                            <span className="text-teal-400 font-semibold">{content.price} ETH</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Analytics</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Earnings Overview</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">This Month</span>
                      <span className="text-teal-400 font-semibold">0.8 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Earnings</span>
                      <span className="text-teal-400 font-semibold">1.2 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Platform Fees</span>
                      <span className="text-red-400 font-semibold">0.06 ETH</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Top Performing Content</h4>
                  <div className="space-y-3">
                    {creator.content.slice(0, 3).map((content, index) => (
                      <div key={content.id} className="flex items-center justify-between">
                        <span className="text-white/60">{content.title}</span>
                        <span className="text-teal-400 font-semibold">0 sales</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Upload Modal */}
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upload New Content</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadForm(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ×
                </motion.button>
              </div>

              <form onSubmit={handleContentUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Upload File *
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-teal-500/50 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {uploadData.preview ? (
                        <div className="space-y-4">
                          <img
                            src={uploadData.preview}
                            alt="Preview"
                            className="w-full max-w-md mx-auto rounded-lg"
                          />
                          <p className="text-white/60">Click to change file</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-2">Drop your file here or click to browse</p>
                            <p className="text-white/60">Supports images, videos, audio, and documents</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={uploadData.title}
                      onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter content title"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Category *
                    </label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-teal-500 transition-colors"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Description *
                  </label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your content..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Price (ETH) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={uploadData.price}
                    onChange={(e) => setUploadData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <p className="text-white/40 text-sm mt-2">
                    Platform fee: 5% of each sale
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isUploading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Publish Content'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
