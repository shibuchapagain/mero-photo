import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './category.model';
import { buildUserQuery } from '../../../utils/build-query.util';

import type { IUser } from '../../../types/global';
import type { ICreateCategoryDto, IUpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async _getOne(user: IUser, id: string) {
    const category = await this.categoryModel.findOne(
      buildUserQuery(user, {
        _id: id,
      }),
    );

    if (!category) throw new NotFoundException('Category not found');

    //
    return category;
  }

  async create(user: IUser, data: ICreateCategoryDto) {
    const isCategoryExist = await this.categoryModel.countDocuments({
      title: new RegExp(`^${data.title}$`, 'i'),
    });

    if (isCategoryExist) {
      throw new BadRequestException('Category already exist');
    }

    const category = await this.categoryModel.create({
      title: data.title,
      description: data.description,
      user: user._id,
    });

    //
    return category;
  }

  async getAll(user: IUser) {
    const categories = await this.categoryModel
      .find(
        buildUserQuery(user, {
          user: user._id,
        }),
      )
      .populate('user');

    //
    return categories;
  }

  async getById(user: IUser, id: string) {
    const categories = await this.categoryModel
      .findOne(
        buildUserQuery(user, {
          _id: id,
        }),
      )
      .populate('user');

    //
    return categories;
  }

  async update(user: IUser, id: string, data: IUpdateCategoryDto) {
    await this._getOne(user, id);

    return await this.categoryModel.findByIdAndUpdate(id, {
      ...(data.title && {
        title: data.title,
      }),
      ...(data.description && {
        description: data.description,
      }),
    });
  }

  async delete(user: IUser, id: string) {
    const category = await this._getOne(user, id);

    // check vehicle are linked with this category or not

    //
    category.deleteOne();
    return await category.save();
  }
}

// test
