import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    // Skip during build process
    if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Check if creator already exists
    let creator = await prisma.creator.findUnique({
      where: { walletAddress }
    })

    if (!creator) {
      // Create new creator with auto-generated username
      creator = await prisma.creator.create({
        data: {
          walletAddress,
          username: `Creator_${walletAddress.slice(0, 6)}`,
          email: null,
          bio: null
        }
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        creatorId: creator.id, 
        walletAddress: creator.walletAddress 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      success: true,
      creator: {
        id: creator.id,
        walletAddress: creator.walletAddress,
        username: creator.username,
        email: creator.email,
        bio: creator.bio,
        avatar: creator.avatar
      },
      token
    })

  } catch (error) {
    console.error('Creator auth error:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate creator' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Skip during build process
    if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const creator = await prisma.creator.findUnique({
      where: { id: decoded.creatorId },
      include: {
        content: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            content: true,
            purchases: true
          }
        }
      }
    })

    if (!creator) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ creator })

  } catch (error) {
    console.error('Get creator error:', error)
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
