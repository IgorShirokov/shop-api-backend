import * as mongoose from 'mongoose';

export interface IBaseCategory {
  id: string;
  title: string;
  count: number;
  weight: number;
}

export interface IBaseSubcategory {
  id: string;
  slug: string;
  title: string;
  count: number;
  category: string;
  weight: number;
}
export interface IBaseImage {
  url: string;
  source: string;
}
export interface IBaseItems {
  name: string;
  value: string;
  isExtended: boolean;
}
export interface IBaseCharacteristics {
  title: string;
  items: IBaseItems[];
  isExtended: boolean;
}
export interface IBaseProduct {
  id: string;
  title: string;
  description: string;
  brand: string;
  quantity: number;
  subcategory: string;
  status: boolean;
  characteristics: IBaseCharacteristics[];
  images: IBaseImage[];
  price: number;
  rating: number;
  discount: number;
}
export interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
}
export interface ISubCategory {
  _id: string;
  name: string;
}
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  subCategory: string;
  characteristics: IBaseCharacteristics[];
  images: IBaseImage[];
  price: number;
  status: boolean;
}

export interface IFeedbackFromJson {
  rating: string;
  text: string;
  author: string;
}
export interface IJsonData {
  categories: IBaseCategory[];
  subcategories: IBaseSubcategory[];
  products: IBaseProduct[];
}

export interface IFeedback {
  _id: mongoose.Types.ObjectId;
  product: string;
  rate: number;
  advantages?: string;
}
