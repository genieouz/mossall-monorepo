import { Schema } from 'mongoose';
// import { Wallet } from '~/payment/enums/wallet.enum';
import { UserRole } from '../enums/user-role.enum';
// import { EnumState } from '~/commons/interfaces/state.interface';

export const userSchema = new Schema(
  {
    // id: { type: String, required: false },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    realm: { type: String },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.COLLABORATOR,
    },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    position: { type: String, required: false },
    uniqueIdentifier: { type: String, required: false },
    salary: { type: Number, required: false },
    wizallAccountNumber: { type: String, required: false },
    bankAccountNumber: { type: String, required: false },
    totalDemandeAmount: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    blocked: { type: Boolean, default: false },
    birthDate: { type: Date, required: false },
    // favoriteWallet: { type: String, required: false, default: Wallet.WAVE },
    enableEmailNotification: { type: Boolean, default: true, required: false },
    password: { type: String, required: true },
    status: { type: String, required: false },
    enabled: { type: Boolean, default: false, required: false },
    fonction: { type: String, required: false },
  },
  { strict: false, timestamps: true },
);
userSchema.index({ email: 1, realm: 1 }, { unique: true });
userSchema.index(
  { phoneNumber: 1, realm: 1, organization: 1 },
  { unique: true },
);
userSchema.index(
  { uniqueIdentifier: 1, realm: 1, organization: 1 },
  { unique: true },
);
userSchema.index(
  { bankAccountNumber: 1, realm: 1, organization: 1 },
  { unique: true },
);
