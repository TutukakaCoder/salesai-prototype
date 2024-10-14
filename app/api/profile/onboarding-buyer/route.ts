// File: app/api/profile/onboarding-buyer/route.ts

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

    const { company, companySize, foundingDate, location, requirements, budget } = await req.json();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.company = company;
    user.companySize = companySize;
    user.foundingDate = new Date(foundingDate);
    user.location = location;
    user.requirements = requirements;
    user.budget = budget;
    user.userType = 'buyer';
    user.onboardingCompleted = true;

    await user.save();

    return NextResponse.json({ message: 'Buyer profile updated successfully' });
  } catch (error) {
    console.error('Error updating buyer profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}