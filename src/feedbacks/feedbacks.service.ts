import { IFeedback } from './interfaces/feedbacks.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackDto } from './dtos/feedbacks.dto';
import { IProduct } from 'products/interfaces/product.interface';
import { Model } from 'mongoose';

@Injectable()
export class FeedbacksService {
  public constructor(
    @InjectModel('Feedbacks') private readonly feedbackModel: Model<IFeedback>,
    @InjectModel('Products') private readonly productModel: Model<IProduct>
  ) {}
  public async createFeedback(feedback: FeedbackDto): Promise<IProduct[]> {
    await new this.feedbackModel(feedback).save();
    return this.productModel.aggregate([
      { $match: { _id: feedback.product } },
      {
        $lookup: {
          as: 'feedbacks',
          foreignField: 'product',
          from: 'feedbacks',
          localField: '_id',
        },
      },
      { $unwind: { path: '$feedbacks', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          rating: {
            $avg: '$feedbacks.rate',
          },
        },
      },
    ]);
  }
}
