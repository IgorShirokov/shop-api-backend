import { Document, Types } from 'mongoose';

export interface IBrand extends Document {
  _id: Types.ObjectId;
  name: string;
}