import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const data = await req.json();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        vendorProfile: data,
        onboardingCompleted: true
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vendor onboarding completed successfully', user });
  } catch (error) {
    console.error('Error completing vendor onboarding:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}