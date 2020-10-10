import * as mongoose from 'mongoose';

export const brandsSchema: mongoose.Schema = new mongoose.Schema({
  brands: {
    type: Array,
  },
});