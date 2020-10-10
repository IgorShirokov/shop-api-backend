import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './products.schema';

@Module({
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
