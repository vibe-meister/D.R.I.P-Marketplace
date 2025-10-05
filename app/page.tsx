'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Users, DollarSign, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold gradient-text">D.R.I.P</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <Link href="/marketplace" className="text-white/60 hover:text-white transition-colors">
              Marketplace
            </Link>
            <Link href="/create" className="text-white/60 hover:text-white transition-colors">
              Create
            </Link>
            <Link href="/library" className="text-white/60 hover:text-white transition-colors">
              Library
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2"
            >
              Connect Wallet
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold gradient-text leading-tight"
            >
              D.R.I.P
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto"
            >
              Decentralized Revenue In Payments
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Fan-Funded Freedom on Chain
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Start Creating
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose D.R.I.P?
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The future of content monetization is here. Secure, decentralized, and creator-focused.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                description: "MetaMask integration ensures your transactions are safe and transparent."
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "Content unlocks immediately after verified payment on the blockchain."
              },
              {
                icon: Users,
                title: "Creator Focused",
                description: "Direct creator-to-fan relationships with fair revenue sharing."
              },
              {
                icon: DollarSign,
                title: "Transparent Fees",
                description: "Clear 5% platform fee with 95% going directly to creators."
              },
              {
                icon: Heart,
                title: "Fan Support",
                description: "Support your favorite creators directly through blockchain payments."
              },
              {
                icon: ArrowRight,
                title: "Easy to Use",
                description: "Simple interface that works with your existing MetaMask wallet."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Drip or Dip Out?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join the decentralized content revolution. Create, share, and monetize your content with complete freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Browse Content
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold gradient-text">D.R.I.P</span>
          </div>
          <p className="text-white/40">
            Decentralized Revenue In Payments - Fan-Funded Freedom on Chain
          </p>
        </div>
      </footer>
    </div>
  )
}