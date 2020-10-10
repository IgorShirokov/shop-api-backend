import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  public constructor(
    @InjectModel('Categories') private readonly categoryModel: Model<ICategory>
  ) {}

  public async findCategories(): Promise<ICategory[]> {
    return this.categoryModel.aggregate([
      {
        $lookup: {
          as: 'subCategories',
          foreignField: 'category',
          from: 'subCategories',
          localField: '_id',
        },
      },
      { $unwind: { path: '$subCategories', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          subCategories: { $push: '$subCategories' },
        },
      },
    ]);
  }
}
