import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import UserModel from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, userType, ...additionalData } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Process additional data based on user type
    let processedData = {};
    if (userType === 'Introducer') {
      processedData = {
        expertise: additionalData.expertise.split(',').map((item: string) => item.trim()),
        industries: additionalData.industries.split(',').map((item: string) => item.trim()),
      };
    } else if (userType === 'Vendor') {
      processedData = {
        company: additionalData.company,
        products: additionalData.products.split(',').map((item: string) => item.trim()),
        services: additionalData.services.split(',').map((item: string) => item.trim()),
        commissionRates: Object.fromEntries(
          additionalData.commissionRates.split(',').map((item: string) => {
            const [key, value] = item.split(':');
            return [key.trim(), parseFloat(value.trim())];
          })
        ),
      };
    } else if (userType === 'Buyer') {
      processedData = {
        company: additionalData.company,
        requirements: additionalData.requirements.split(',').map((item: string) => item.trim()),
        budget: parseFloat(additionalData.budget),
      };
    }

    // Create new user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      userType,
      ...processedData,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}