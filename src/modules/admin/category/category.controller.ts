import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ICreateCategoryDto, IUpdateCategoryDto } from './dto';
import { ApiResponse } from '../../../utils/http-response.util';
import { AdminUser } from '../../../common/decorators/user.decorator';
import { IUser } from '../../../types/global';
import { MongoIdParam } from '../../../common/decorators/param.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@AdminUser() user: IUser, @Body() data: ICreateCategoryDto) {
    const response = await this.categoryService.create(user, data);

    //
    return new ApiResponse({
      message: 'Category created successfully',
      data: response,
    });
  }

  @Get()
  async getAll(@AdminUser() user: IUser) {
    const response = await this.categoryService.getAll(user);

    //
    return new ApiResponse({
      message: 'Category fetched successfully',
      data: response,
    });
  }

  @Get(':id')
  async getOne(@AdminUser() user: IUser, @MongoIdParam() id: string) {
    const response = await this.categoryService.getById(user, id);

    //
    return new ApiResponse({
      message: 'Category fetched successfully',
      data: response,
    });
  }

  @Patch(':id')
  async update(@AdminUser() user: IUser, @MongoIdParam() id: string, @Body() data: IUpdateCategoryDto) {
    await this.categoryService.update(user, id, data);

    //
    return new ApiResponse({
      message: 'Category updated successfully',
    });
  }

  @Delete(':id')
  async delete(@AdminUser() user: IUser, @MongoIdParam() id: string) {
    await this.categoryService.delete(user, id);

    //
    return new ApiResponse({
      message: 'Category deleted successfully',
    });
  }
}
