import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { ICategory } from './interfaces/category.interface';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private categoriesService: CategoriesService) {}

  @Get('')
  @ApiOperation({ description: 'Get categories' })
  @ApiResponse({
    description: 'Categories was successfully got',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findCategories(@Res() res: Response): Promise<Response> {
    try {
      const categories: ICategory[] = await this.categoriesService.findCategories();
      return res.status(HttpStatus.OK).json({ data: categories, error: null });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error });
    }
  }
}
