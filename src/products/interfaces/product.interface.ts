import { Document } from 'mongoose';
export interface IProduct extends Document {
  _id: string;
  description: string;
  brand?: string;
  characteristics?: ICharacteristic[];
  images: IImage[];
  name: string;
  price: number;
  status: number;
  subCategory?: string;
  feedbacksCount?: number;
  rating?: number;
}

interface IImage {
  url: string;
  source: string;
}

interface ICharacteristic {
  title: string;
  items: ICharacteristicsItem[];
}

interface ICharacteristicsItem {
  name: string;
  value: string;
}
