export interface IProductQuery {
  subCategory: string;
  price: {
    $gt: number;
    $lt: number;
  };
  name: { $regex: string; $options: string };
  brand: { $in: RegExp[] };
}
