import * as mongoose from 'mongoose';

export const feedbackSchema: mongoose.Schema = new mongoose.Schema({
  advantages: {
    required: false,
    type: String,
  },
  product: {
    required: true,
    type: String,
  },
  rate: {
    required: true,
    type: Number,
  },
});
