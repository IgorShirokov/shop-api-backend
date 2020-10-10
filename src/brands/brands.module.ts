import { ProductsService } from 'products/products.service';
import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { brandsSchema } from './brands.schema';
import { productSchema } from 'products/products.schema';


@Module({
    controllers: [BrandsController],
    imports: [
      MongooseModule.forFeature([
        { name: 'Brands', schema: brandsSchema },
      ]),
      MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
    ],
    providers: [BrandsService, ProductsService],
  })
  export class BrandsModule {}