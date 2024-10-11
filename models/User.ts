import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  userType: 'introducer' | 'vendor' | 'buyer' | 'unassigned';
  linkedinId?: string;
  image?: string;
  // Add other fields as needed
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: String,
  userType: {
    type: String,
    enum: ['introducer', 'vendor', 'buyer', 'unassigned'],
    default: 'unassigned',
  },
  linkedinId: String,
  image: String,
  // Add other fields as needed
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;