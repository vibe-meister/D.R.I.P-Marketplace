'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Download, 
  Eye, 
  Lock, 
  Unlock, 
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { useWallet } from '@/components/WalletProvider'
import toast from 'react-hot-toast'

interface ContentData {
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

export default function ContentAccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { account, isConnected } = useWallet()
  const [content, setContent] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const contentId = params.id as string
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      setAccessToken(token)
      verifyAccess()
    } else {
      setIsLoading(false)
    }
  }, [token])

  const verifyAccess = async () => {
    try {
      // Verify the access token and get content
      const response = await fetch(`/api/content/${contentId}/access?token=${token}`)
      const data = await response.json()

      if (data.success && data.hasAccess) {
        setContent(data.content)
        setHasAccess(true)
      } else {
        setHasAccess(false)
      }
    } catch (error) {
      console.error('Access verification failed:', error)
      setHasAccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (content?.fileUrl) {
      // Create download link
      const link = document.createElement('a')
      link.href = content.fileUrl
      link.download = content.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started!')
    }
  }

  const handleViewContent = () => {
    if (content?.fileUrl) {
      window.open(content.fileUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!hasAccess || !content) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 max-w-md w-full text-center"
        >
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Access Denied
          </h2>
          <p className="text-white/60 mb-8">
            You don't have access to this content. Please purchase it first.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/marketplace'}
            className="btn-primary text-lg px-8 py-4"
          >
            Browse Marketplace
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mb-6"
          >
            <Unlock className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Content Unlocked!
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            You now have access to this exclusive content
          </p>
        </motion.div>

        {/* Content Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={content.thumbnailUrl || content.fileUrl}
                alt={content.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{content.title}</h2>
                <p className="text-white/60 mb-4">by {content.creator.username}</p>
                <p className="text-white/40 leading-relaxed">{content.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {content.category}
                </div>
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Unlocked</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewContent}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Content</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="btn-secondary flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Access Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Access Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white/60 mb-2">Access Token</h4>
              <p className="text-teal-400 font-mono text-sm break-all">{accessToken}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white/60 mb-2">Content ID</h4>
              <p className="text-white font-mono text-sm">{contentId}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
