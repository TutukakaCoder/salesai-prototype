// File: models/User.ts

import mongoose, { Document, Model } from 'mongoose';

export type UserType = 'unassigned' | 'introducer' | 'vendor' | 'buyer';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  userType: UserType;
  image?: string;
  onboardingCompleted: boolean;
  company?: string;
  companySize?: string;
  foundingDate?: Date;
  location?: string;
  requirements?: string;
  budget?: number;
  products?: string[];
  services?: string[];
  expertise?: string[];
  industries?: string[];
  successfulIntroductions?: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: [true, 'Please provide a name'] },
  email: { type: String, required: [true, 'Please provide an email'], unique: true },
  password: { type: String },
  userType: { 
    type: String, 
    enum: ['unassigned', 'introducer', 'vendor', 'buyer'], 
    default: 'unassigned' 
  },
  image: { type: String },
  onboardingCompleted: { type: Boolean, default: false },
  company: { type: String },
  companySize: { type: String },
  foundingDate: { type: Date },
  location: { type: String },
  requirements: { type: String },
  budget: { type: Number },
  products: [{ type: String }],
  services: [{ type: String }],
  expertise: [{ type: String }],
  industries: [{ type: String }],
  successfulIntroductions: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;