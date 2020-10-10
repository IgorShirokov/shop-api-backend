import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}
  @Get('')
  @ApiOperation({ description: 'Get products' })
  @ApiResponse({
    description: 'Got Products',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiQuery({ name: 'subCat', required: false, description: 'Subcategory ID' })
  @ApiQuery({ name: 'text', required: false, description: 'Search by name' })
  @ApiQuery({ name: 'prices', required: false, description: '100,500' })
  @ApiQuery({ name: 'brands', required: false, description: 'apple,samsung' })
  public async findProducts(
    @Res() res: Response,
    @Query('subCat') subCat: string | undefined,
    @Query('text') text: string | undefined,
    @Query('prices') prices: string | undefined,
    @Query('brands') brands: string | undefined
  ): Promise<Response> {
    try {
      const products: [IProduct[]] = await this.productsService.findProducts(
        subCat,
        text,
        prices,
        brands
      );
      const productsForPrices: [
        IProduct[]
      ] = await this.productsService.findProducts(subCat);
      const allPrices: number[] = productsForPrices[0].map(
        (product: IProduct): number => product.price
      );
      return res.status(HttpStatus.OK).json({
        data: {
          items: products[0],
          prices: {
            min: Math.min.apply(Math, allPrices),
            max: Math.max.apply(Math, allPrices),
          },
        },
        error: null,
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
  @Get('/suggestion')
  @ApiOperation({ description: 'Get suggested products' })
  @ApiResponse({
    description: 'Got suggested products ',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findSuggestedProducts(@Res() res: Response): Promise<Response> {
    try {
      const products: [
        IProduct[]
      ] = await this.productsService.suggestedProducts();
      return res.status(HttpStatus.OK).json({
        data: {
          items: products[0],
          quantity: products[0].length,
        },
        error: null,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get one product by id' })
  @ApiResponse({
    description: 'Got one product by id ',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error  find',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findProduct(
    @Res() res: Response,
    @Param('id') param: string
  ): Promise<Response> {
    try {
      const product: IProduct[] = await this.productsService.findProduct(param);
      return res.status(HttpStatus.OK).json({ data: product[0], error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
