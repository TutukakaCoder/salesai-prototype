import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const { userId, ...profileData } = data
    
    await dbConnect()
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...profileData, onboardingCompleted: true },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}