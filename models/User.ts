import mongoose, { Schema, Document } from 'mongoose';
import { hash } from 'bcryptjs';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  userType: 'Introducer' | 'Vendor' | 'Buyer';
  createdAt: Date;
  updatedAt: Date;
  expertise?: string[];
  industries?: string[];
  successfulIntroductions?: number;
  company?: string;
  products?: string[];
  services?: string[];
  commissionRates?: Map<string, number>;
  requirements?: string[];
  budget?: number;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  userType: {
    type: String,
    enum: ['Introducer', 'Vendor', 'Buyer'],
    required: [true, 'Please specify user type'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expertise: {
    type: [String],
    required: function(this: IUser) { return this.userType === 'Introducer'; }
  },
  industries: {
    type: [String],
    required: function(this: IUser) { return this.userType === 'Introducer'; }
  },
  successfulIntroductions: {
    type: Number,
    default: 0,
  },
  company: {
    type: String,
    required: function(this: IUser) { return this.userType === 'Vendor' || this.userType === 'Buyer'; }
  },
  products: {
    type: [String],
    required: function(this: IUser) { return this.userType === 'Vendor'; }
  },
  services: {
    type: [String],
    required: function(this: IUser) { return this.userType === 'Vendor'; }
  },
  commissionRates: {
    type: Map,
    of: Number,
    required: function(this: IUser) { return this.userType === 'Vendor'; }
  },
  requirements: {
    type: [String],
    required: function(this: IUser) { return this.userType === 'Buyer'; }
  },
  budget: {
    type: Number,
    required: function(this: IUser) { return this.userType === 'Buyer'; }
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
  next();
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);