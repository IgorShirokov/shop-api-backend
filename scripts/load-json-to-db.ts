import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import * as ora from 'ora';
import { Db } from 'mongodb';

const promisifiedFileRead: (
  filename: string
) => Promise<Buffer> = util.promisify(fs.readFile);
const promisifiedReadDir: (
  filename: string
) => Promise<string[]> = util.promisify(fs.readdir);

const dbName: string = process.env.DATABASE_NAME as string;
const dbPath: string = `${process.env.DATABASE_PATH}/${dbName}` as string;

async function main(): Promise<void> {
  const spinner: ora.Ora = ora('Loading').start();
  try {
    spinner.text = 'Connect to db';
    const connection: mongodb.MongoClient = await mongodb.MongoClient.connect(
      dbPath,
      { useNewUrlParser: true }
    );
    const db: Db = connection.db(dbName);

    const categories: { name: string; _id: string }[] = await readJSON(
      'output/json-categories.json'
    );
    await loadCategories(db, categories, spinner);

    const subCategories: {
      name: string;
      _id: string;
      category: string;
    }[] = await readJSON('output/json-sub-categories.json');
    await loadSubCategories(db, subCategories, spinner);

    const productsFileNames: string[] = await promisifiedReadDir(
      path.resolve(__dirname, 'output')
    );
    await loadProducts(db, productsFileNames, spinner);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  } finally {
    spinner.stop();
    process.exit();
  }
}

main();

async function loadCategories(
  db: Db,
  categories: { name: string; _id: string }[],
  spinner: ora.Ora
): Promise<void> {
  spinner.text = 'Loading categories';
  try {
    for (const category of categories) {
      await db
        .collection('categories')
        .insertOne({ ...category, _id: mongoose.Types.ObjectId(category._id) });
    }
  } catch (e) {
    spinner.stop();
    // tslint:disable-next-line:no-console
    console.log(e);
  }
  spinner.stop();
  // tslint:disable-next-line:no-console
  console.log('\n Categories added');
}

// tslint:disable-next-line:max-line-length
async function loadSubCategories(
  db: Db,
  subCategories: {
    name: string;
    category: string;
    _id: string;
  }[],
  spinner: ora.Ora
): Promise<void> {
  spinner.start();
  spinner.text = 'Loading subCategories';
  try {
    for (const subCategory of subCategories) {
      await db.collection('subCategories').insertOne({
        ...subCategory,
        _id: subCategory._id,
        category: mongoose.Types.ObjectId(subCategory.category),
      });
    }
  } catch (e) {
    spinner.stop();
    // tslint:disable-next-line:no-console
    console.log(e);
  }
  spinner.stop();
  // tslint:disable-next-line:no-console
  console.log('\n SubCategories added');
}

async function loadProducts(
  db: Db,
  productsFileNames: string[],
  spinner: ora.Ora
): Promise<void> {
  spinner.start();
  spinner.text = 'Loading products';
  try {
    for (let i: number = 0; i < productsFileNames.length; i++) {
      const products: any[] = await readJSON(`output/${productsFileNames[i]}`);
      for (const product of products) {
        if (!product.name || !product.price || !product.description) {
          continue;
        }
        await db.collection('products').insertOne(product);
      }
    }
  } catch (e) {
    spinner.stop();
    // tslint:disable-next-line:no-console
    console.log(e);
  }
  spinner.stop();
  // tslint:disable-next-line:no-console
  console.log('\n Products added');
}

async function readJSON<T>(fileName: string): Promise<T> {
  const buffer: Buffer = await promisifiedFileRead(
    path.resolve(__dirname, fileName)
  );
  return JSON.parse(buffer.toString());
}
