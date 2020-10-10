import * as mongoose from 'mongoose';

export const categoriesSchema: mongoose.Schema = new mongoose.Schema({
  category: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  }
});
