// File: app/api/user/update-type/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const { userType } = await req.json();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.userType = userType;
    await user.save();

    return NextResponse.json({ message: 'User type updated successfully' });
  } catch (error) {
    console.error('Error updating user type:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}