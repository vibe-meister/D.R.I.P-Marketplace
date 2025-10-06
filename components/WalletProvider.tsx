'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface WalletContextType {
  account: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnected: boolean
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true)
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
        toast.success('Wallet connected successfully!')
      } catch (error) {
        console.error('Error connecting wallet:', error)
        toast.error('Failed to connect wallet')
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error('MetaMask not detected. Please install MetaMask.')
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    toast.success('Wallet disconnected')
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(null)
        }
      })
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        isConnected: !!account,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

