import { Document, Schema, SchemaDefinition } from 'mongoose';
import BasicSchema from './BaseSchema';

interface IUser {
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
}

const userFields: SchemaDefinition = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  avatar: { type: String, default: '' },
};

const schema = new BasicSchema(userFields);

export { IUser, schema };


