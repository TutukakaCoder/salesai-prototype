import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType: 'buyer', // Default user type
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}