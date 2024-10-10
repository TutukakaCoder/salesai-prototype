import mongoose, { Document, Model } from 'mongoose';

export interface ILinkedInProfile {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType: 'introducer' | 'vendor' | 'buyer' | 'unassigned';
  linkedinId?: string;
  linkedinAccessToken?: string;
  linkedinRefreshToken?: string;
  linkedinTokenExpiry?: Date;
  linkedinProfile?: ILinkedInProfile;
  image?: string;
  company?: string;
  expertise?: string[];
  industries?: string[];
  successfulIntroductions?: number;
  products?: string[];
  services?: string[];
  commissionRates?: { [key: string]: number };
  requirements?: string[];
  budget?: number;
}

const LinkedInProfileSchema = new mongoose.Schema<ILinkedInProfile>({
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: String,
});

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
    enum: ['introducer', 'vendor', 'buyer', 'unassigned'],
    default: 'unassigned',
  },
  linkedinId: {
    type: String,
    unique: true,
    sparse: true,
  },
  linkedinAccessToken: String,
  linkedinRefreshToken: String,
  linkedinTokenExpiry: Date,
  linkedinProfile: LinkedInProfileSchema,
  image: String,
  company: String,
  expertise: [String],
  industries: [String],
  successfulIntroductions: {
    type: Number,
    default: 0,
  },
  products: [String],
  services: [String],
  commissionRates: {
    type: Map,
    of: Number,
  },
  requirements: [String],
  budget: Number,
}, { timestamps: true });

// Index for faster queries on linkedinId and userType
UserSchema.index({ linkedinId: 1, userType: 1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function(this: IUser) {
  if (this.linkedinProfile) {
    return `${this.linkedinProfile.firstName} ${this.linkedinProfile.lastName}`;
  }
  return this.name;
});

// Method to check if the user has linked their LinkedIn account
UserSchema.methods.hasLinkedInAccount = function(this: IUser): boolean {
  return !!this.linkedinId;
};

// Method to update LinkedIn token information
UserSchema.methods.updateLinkedInTokens = function(this: IUser, accessToken: string, refreshToken: string, expiryDate: Date) {
  this.linkedinAccessToken = accessToken;
  this.linkedinRefreshToken = refreshToken;
  this.linkedinTokenExpiry = expiryDate;
};

// Method to get user-specific information based on userType
UserSchema.methods.getUserTypeInfo = function(this: IUser) {
  switch (this.userType) {
    case 'introducer':
      return {
        expertise: this.expertise,
        industries: this.industries,
        successfulIntroductions: this.successfulIntroductions,
      };
    case 'vendor':
      return {
        company: this.company,
        products: this.products,
        services: this.services,
        commissionRates: this.commissionRates,
      };
    case 'buyer':
      return {
        company: this.company,
        requirements: this.requirements,
        budget: this.budget,
      };
    default:
      return {};
  }
};

// Ensure the model is not redefined if it already exists
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;