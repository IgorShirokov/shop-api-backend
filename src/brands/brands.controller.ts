import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductsService } from 'products/products.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  public constructor(private productsService: ProductsService) {}

  @Get('')
  @ApiOperation({ description: 'Get brands' })
  @ApiResponse({
    description: 'brands was successfully got',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findCategories(
    @Res() res: Response,
    @Query('subCat') id: string | undefined,
    @Query('prices') prices: string | undefined
  ): Promise<Response> {
    try {
      let brands: string[] = [];
      // tslint:disable-next-line: typedef
      const product = await this.productsService.findProducts(
        id,
        undefined,
        prices,
        undefined
      );
      // tslint:disable-next-line: no-any
      const ids: string[] = product[0].map((item: any) => String(item._id));
      // tslint:disable-next-line: typedef
      for (let index = 0; index < ids.length; index++) {
        // tslint:disable-next-line: no-any
        const data: any = await this.productsService.findProduct(
          String(ids[index])
        );
        const { brand } = data[0];
        brands.push(brand);
      }
      // tslint:disable-next-line: typedef
      brands = brands.filter((x, i, a) => a.indexOf(x) === i);
      return res.status(HttpStatus.OK).json({ data: brands, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
