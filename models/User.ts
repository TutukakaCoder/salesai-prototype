import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  userType: 'introducer' | 'vendor' | 'buyer';
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
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  userType: {
    type: String,
    enum: ['introducer', 'vendor', 'buyer'],
    default: 'buyer',
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);