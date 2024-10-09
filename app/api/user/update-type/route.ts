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
    const { userType } = await req.json();

    if (!['introducer', 'vendor', 'buyer'].includes(userType)) {
      return NextResponse.json({ message: 'Invalid user type' }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { userType },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User type updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update user type error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}