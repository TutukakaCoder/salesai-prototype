import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await dbConnect();

    const { id } = session.user as { id: string };
    const { userType } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { userType }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User type updated successfully', user: updatedUser });
  } catch (error) {
    console.error('User type update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}