import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ICreateCategoryDto } from './dto';
import { ApiResponse } from '../../../utils/http-response.util';
import { AdminUser } from 'src/api/admin/common/decorators/admin.decorator';
import { IUser } from 'src/types/global';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: ICreateCategoryDto, @AdminUser() loggedInUser: IUser) {
    console.log(loggedInUser, '--');
    const response = await this.categoryService.create(data);

    //
    return new ApiResponse({
      message: 'Category created successfully',
      data: response,
    });
  }
}
