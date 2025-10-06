import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get pending payouts for creators
export async function GET(request: NextRequest) {
  try {
    // Check if database is available (not during build)
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const pendingPayouts = await prisma.earnings.findMany({
      where: {
        status: 'pending_payout'
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            walletAddress: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Group by creator
    const creatorPayouts = pendingPayouts.reduce((acc, earning) => {
      const creatorId = earning.creatorId
      if (!acc[creatorId]) {
        acc[creatorId] = {
          creator: earning.creator,
          totalAmount: 0,
          earnings: []
        }
      }
      acc[creatorId].totalAmount += earning.amount
      acc[creatorId].earnings.push(earning)
      return acc
    }, {} as any)

    return NextResponse.json({
      success: true,
      payouts: Object.values(creatorPayouts)
    })

  } catch (error) {
    console.error('Get payouts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payouts' },
      { status: 500 }
    )
  }
}

// Process payouts to creators
export async function POST(request: NextRequest) {
  try {
    // Check if database is available (not during build)
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { creatorId, earningsIds } = await request.json()

    if (!creatorId || !earningsIds || !Array.isArray(earningsIds)) {
      return NextResponse.json(
        { error: 'Creator ID and earnings IDs are required' },
        { status: 400 }
      )
    }

    // Update earnings status to paid
    await prisma.earnings.updateMany({
      where: {
        id: {
          in: earningsIds
        }
      },
      data: {
        status: 'paid',
        paidAt: new Date()
      }
    })

    // Get creator info for confirmation
    const creator = await prisma.creator.findUnique({
      where: { id: creatorId },
      select: {
        username: true,
        walletAddress: true
      }
    })

    return NextResponse.json({
      success: true,
      message: `Payout processed for ${creator?.username}`,
      creator: {
        username: creator?.username,
        walletAddress: creator?.walletAddress
      }
    })

  } catch (error) {
    console.error('Process payout error:', error)
    return NextResponse.json(
      { error: 'Failed to process payout' },
      { status: 500 }
    )
  }
}
