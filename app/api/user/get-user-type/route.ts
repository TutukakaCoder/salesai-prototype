import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ userType: user.userType });
  } catch (error) {
    console.error('Error fetching user type:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}