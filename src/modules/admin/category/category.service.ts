import { ICreateCategoryDto } from './dto';
import { Category } from './category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(data: ICreateCategoryDto) {
    const isCategoryExist = await this.categoryModel.countDocuments({
      title: new RegExp(`^${data.title}$`, 'i'),
    });

    if (isCategoryExist) {
      throw new BadRequestException('Category already exist');
    }

    const category = await this.categoryModel.create({
      title: data.title,
      description: data.description,
    });

    //
    return category;
  }
}
