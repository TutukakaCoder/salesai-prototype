import mongoose, { Schema, Document } from 'mongoose';

export type UserType = 'Introducer' | 'Vendor' | 'Buyer';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  company: string;
  companySize: number;
  foundingDate: Date;
  location: string;
  description?: string;
  website?: string;
  socialMediaProfiles?: string[];
  expertise?: string[];
  industries?: string[];
  products?: string[];
  services?: string[];
  commissionRate?: number;
  requirements?: string;
  budget?: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Introducer', 'Vendor', 'Buyer'], required: true },
  company: { type: String, required: true },
  companySize: { type: Number, required: true },
  foundingDate: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  socialMediaProfiles: [{ type: String }],
  expertise: [{ type: String }],
  industries: [{ type: String }],
  products: [{ type: String }],
  services: [{ type: String }],
  commissionRate: { type: Number },
  requirements: { type: String },
  budget: { type: Number },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);