import { Document, Types } from 'mongoose';
export interface IFeedback extends Document {
  _id: Types.ObjectId;
  product: string;
  rate: number;
  advantages?: string;
}
