'use client'

import { useState } from 'react'
import { useWallet } from '@/components/WalletProvider'
import toast from 'react-hot-toast'

export default function TestPage() {
  const { account, isConnected, connectWallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [creator, setCreator] = useState(null)

  const testCreatorAuth = async () => {
    if (!isConnected || !account) {
      toast.error('Please connect MetaMask first')
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
      console.log('Creator auth response:', data)

      if (data.success) {
        setCreator(data.creator)
        toast.success('Creator authenticated successfully!')
      } else {
        toast.error(data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('Test error:', error)
      toast.error('Test failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">D.R.I.P Test Page</h1>
        
        <div className="glass rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">MetaMask Connection</h2>
            <div className="space-y-4">
              <div className="text-white">
                <strong>Status:</strong> {isConnected ? '✅ Connected' : '❌ Not Connected'}
              </div>
              {account && (
                <div className="text-white">
                  <strong>Account:</strong> {account}
                </div>
              )}
              {!isConnected && (
                <button
                  onClick={connectWallet}
                  className="btn-primary"
                >
                  Connect MetaMask
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Creator Authentication</h2>
            <div className="space-y-4">
              {creator ? (
                <div className="text-white">
                  <div><strong>Creator ID:</strong> {creator.id}</div>
                  <div><strong>Username:</strong> {creator.username}</div>
                  <div><strong>Wallet:</strong> {creator.walletAddress}</div>
                </div>
              ) : (
                <button
                  onClick={testCreatorAuth}
                  disabled={!isConnected || isLoading}
                  className="btn-primary disabled:opacity-50"
                >
                  {isLoading ? 'Testing...' : 'Test Creator Auth'}
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Next Steps</h2>
            <div className="text-white/60 space-y-2">
              <div>1. Connect MetaMask wallet</div>
              <div>2. Test creator authentication</div>
              <div>3. Go to /create to upload content</div>
              <div>4. Set price and upload files</div>
              <div>5. Test payment flow</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
