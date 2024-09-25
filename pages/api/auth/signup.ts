import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { hash } from 'bcryptjs';
import UserModel from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await connectToDatabase();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 12);
    console.log('Hashed password:', hashedPassword);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      userType,
      company: 'Default Company',
      companySize: 1,
      foundingDate: new Date(),
      location: 'Default Location',
    });

    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser);

    return res.status(201).json({ message: 'User created', userId: savedUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}