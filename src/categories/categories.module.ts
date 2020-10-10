import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categoriesSchema } from './categories.schema';

@Module({
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Categories', schema: categoriesSchema },
    ]),
  ],
  providers: [CategoriesService],
})
export class CategoriesModule {}
