import { BrandsModule } from './brands/brands.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.production.env' : '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `${process.env.DATABASE_PATH}/${process.env.DATABASE_NAME}` || `${configService.get('DATABASE_PATH')}/${configService.get('DATABASE_NAME')}`,
      }),
    }),
    ProductsModule,
    FeedbacksModule,
    CategoriesModule,
    BrandsModule
  ]
})
export class AppModule {}
