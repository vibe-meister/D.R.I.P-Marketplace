import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateWalletAddress, validateTransactionHash, logSecurityEvent } from '@/lib/security'

// Process purchase and unlock content
export async function POST(request: NextRequest) {
  try {
    // Check if database is available (not during build)
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { 
      contentId, 
      buyerAddress, 
      transactionHash, 
      amount 
    } = await request.json()

    // Security validation
    if (!contentId || !buyerAddress || !transactionHash || !amount) {
      logSecurityEvent('INVALID_PURCHASE_REQUEST', { contentId, buyerAddress, transactionHash, amount }, request)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate wallet address format
    if (!validateWalletAddress(buyerAddress)) {
      logSecurityEvent('INVALID_WALLET_ADDRESS', { buyerAddress }, request)
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    // Validate transaction hash format
    if (!validateTransactionHash(transactionHash)) {
      logSecurityEvent('INVALID_TRANSACTION_HASH', { transactionHash }, request)
      return NextResponse.json(
        { error: 'Invalid transaction hash format' },
        { status: 400 }
      )
    }

    // Get content details
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: { creator: true }
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    // Check if already purchased
    const existingPurchase = await prisma.purchase.findUnique({
      where: { transactionHash }
    })

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Transaction already processed' },
        { status: 400 }
      )
    }

    // Calculate fees
    const platformFee = amount * 0.05 // 5% platform fee
    const creatorEarnings = amount - platformFee

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        contentId,
        buyerAddress,
        transactionHash,
        amount,
        platformFee,
        creatorEarnings,
        status: 'confirmed',
        buyerId: content.creatorId
      }
    })

    // Add to user library - content is unlocked ONLY for this specific wallet address
    const accessUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/content/${contentId}/access?token=${transactionHash}`
    
    await prisma.userLibrary.create({
      data: {
        walletAddress: buyerAddress, // Only this wallet address can access
        contentId,
        purchaseId: purchase.id,
        accessUrl
      }
    })

    // Record creator earnings - they will be paid from your wallet
    await prisma.earnings.create({
      data: {
        creatorId: content.creatorId,
        amount: creatorEarnings,
        source: 'content_sale',
        status: 'pending_payout' // Creator needs to be paid from your wallet
      }
    })

    return NextResponse.json({
      success: true,
      purchase: {
        id: purchase.id,
        transactionHash: purchase.transactionHash,
        amount: purchase.amount,
        creatorEarnings: purchase.creatorEarnings,
        accessUrl
      }
    })

  } catch (error) {
    console.error('Purchase error:', error)
    return NextResponse.json(
      { error: 'Failed to process purchase' },
      { status: 500 }
    )
  }
}

// Get user's purchased content
export async function GET(request: NextRequest) {
  try {
    // Check if database is available (not during build)
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      )
    }

    const library = await prisma.userLibrary.findMany({
      where: { walletAddress },
      include: {
        content: {
          include: {
            creator: {
              select: {
                username: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ library })

  } catch (error) {
    console.error('Get library error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch library' },
      { status: 500 }
    )
  }
}
