import { Schema, Types } from 'mongoose';

const characteristicsItemsSchema: Schema = new Schema({
  name: { required: true, type: String },
  value: { required: true, type: String },
});

const characteristicsSchema: Schema = new Schema({
  title: {
    requried: true,
    type: String,
  },
  items: [characteristicsItemsSchema],
});
const images: Schema = new Schema({
  url: { required: true, type: String },
  source: { required: true, type: String },
});
export const productSchema: Schema = new Schema({
  description: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
  characteristics: {
    required: true,
    type: [characteristicsSchema],
  },
  images: { required: false, type: [images] },
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: Number,
  },
  subCategory: {
    required: true,
    type: Types.ObjectId,
  },
});
