import * as fs from 'fs';
import * as util from 'util';
import * as mongoose from 'mongoose';
import {
  IBaseCategory,
  IBaseProduct,
  IBaseSubcategory,
  ICategory,
  IJsonData,
  IProduct,
  ISubCategory,
} from './interfaces';

const fileName: string = 'jsons/limited.json';
const asyncFileReader: (filename: string) => Promise<Buffer> = util.promisify(
  fs.readFile
);
// tslint:disable-next-line:no-any
const asyncFileWriter: (
  filename: string,
  data: any,
  encode: string
) => Promise<void> = util.promisify(fs.writeFile);
main();

async function main(): Promise<void> {
  try {
    const buffer: Buffer = await asyncFileReader(`${__dirname}/${fileName}`);
    const json: IJsonData = JSON.parse(buffer.toString()) as IJsonData;
    let subCategories: ISubCategory[] = [];
    let products: IProduct[] = [];
    const categories: ICategory[] = json.categories
      .filter(({ count }: IBaseCategory) => count > 0)
      .map(
        ({ title, id }: IBaseCategory): ICategory => {
          const categoryId: mongoose.Types.ObjectId = mongoose.Types.ObjectId();
          const subcategories: ISubCategory[] = json.subcategories
            .filter(
              ({ category, count }: IBaseSubcategory) =>
                id === category && count > 0
            )
            .map(({ title: subTitle, id: subId }: IBaseSubcategory) => {
              const products1: IProduct[] = json.products
                .filter(
                  ({ subcategory }: IBaseProduct) => subcategory === subId
                )
                .map(
                  ({
                    title: prodTitle,
                    price: prodPrice,
                    brand: prodBrand,
                    status: prodStatus,
                    description: prodDescription,
                    characteristics: prodCharacteristics,
                    id: productId,
                    images: prodImages,
                  }: IBaseProduct): IProduct => {
                    return {
                      _id: productId,
                      description: prodDescription,
                      brand: prodBrand,
                      characteristics: prodCharacteristics,
                      images: prodImages,
                      name: prodTitle,
                      price: prodPrice,
                      status: prodStatus,
                      subCategory: subId,
                    };
                  }
                );
              products = [...products, ...products1];
              return { name: subTitle, _id: subId, category: categoryId };
            });
          subCategories = [...subCategories, ...subcategories];
          return { name: title, _id: categoryId };
        }
      );
    if (!fs.existsSync(`${__dirname}/output`)) {
      fs.mkdirSync(`${__dirname}/output`);
    }
    await asyncFileWriter(
      `${__dirname}/output/json-products.json`,
      JSON.stringify(products, null, 4),
      'utf8'
    );
    await asyncFileWriter(
      `${__dirname}/output/json-categories.json`,
      JSON.stringify(categories, null, 4),
      'utf8'
    );
    await asyncFileWriter(
      `${__dirname}/output/json-sub-categories.json`,
      JSON.stringify(subCategories, null, 4),
      'utf8'
    );
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}
