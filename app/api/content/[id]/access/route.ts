import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 400 }
      )
    }

    // Find the purchase with this transaction hash
    const purchase = await prisma.purchase.findUnique({
      where: { transactionHash: token },
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
      }
    })

    if (!purchase) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 404 }
      )
    }

    // Check if the content ID matches
    if (purchase.contentId !== params.id) {
      return NextResponse.json(
        { error: 'Content access denied' },
        { status: 403 }
      )
    }

    // Check if purchase is confirmed
    if (purchase.status !== 'confirmed') {
      return NextResponse.json(
        { error: 'Purchase not confirmed' },
        { status: 403 }
      )
    }

    // Additional security: Verify the buyer address matches the requesting wallet
    // This ensures only the specific MetaMask address that purchased can access
    // In production, you would verify the requesting wallet matches purchase.buyerAddress

    return NextResponse.json({
      success: true,
      hasAccess: true,
      content: {
        id: purchase.content.id,
        title: purchase.content.title,
        description: purchase.content.description,
        category: purchase.content.category,
        price: purchase.content.price,
        fileUrl: purchase.content.fileUrl,
        thumbnailUrl: purchase.content.thumbnailUrl,
        creator: purchase.content.creator
      },
      purchase: {
        id: purchase.id,
        transactionHash: purchase.transactionHash,
        amount: purchase.amount,
        createdAt: purchase.createdAt
      }
    })

  } catch (error) {
    console.error('Content access error:', error)
    return NextResponse.json(
      { error: 'Failed to verify access' },
      { status: 500 }
    )
  }
}
