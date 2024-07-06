import mongoose, { Model } from 'mongoose';
import { IUser, schema as UserSchema } from './UserSchema';


const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema, 'User');

const models = {
  User,
};

export default models;
