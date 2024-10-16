import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { userType } = await req.json();

  if (!userType) {
    return NextResponse.json({ error: 'User type is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { userType, onboardingCompleted: true },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User type updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user type:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}