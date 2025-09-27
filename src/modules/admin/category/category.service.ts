import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './category.model';
import { buildUserQuery } from '../../../utils/build-query.util';

import type { IUser } from '../../../types/global';
import type { ICreateCategoryDto, IUpdateCategoryDto } from './dto';
import { HistoryLogService } from '../history-logs/history-log.service';
import { HistoryLogMethodEnum, HistoryLogTypeEnum } from '../history-logs/history-log.type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly historyLogService: HistoryLogService,
  ) {}

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

    await this.historyLogService.createHistory({
      title: data.title,
      userSnapShot: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      type: HistoryLogTypeEnum.CATEGORY,
      method: HistoryLogMethodEnum.CREATED,
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
      .populate('user', ['id', 'firstName', 'lastName', 'role'])
      .select(['id', 'title', 'description', 'createdAt']);

    //
    return categories;
  }

  async getById(user: IUser, id: string) {
    const category = await this.categoryModel
      .findOne(
        buildUserQuery(user, {
          _id: id,
        }),
      )
      .populate('user', ['id', 'email', 'lastName', 'role']);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    //
    return category;
  }

  async update(user: IUser, id: string, data: IUpdateCategoryDto) {
    await this._getOne(user, id);
    await this.categoryModel.findByIdAndUpdate(id, {
      ...(data.title && {
        title: data.title,
      }),
      ...(data.description && {
        description: data.description,
      }),
    });
    return;
  }

  async delete(user: IUser, id: string) {
    await this._getOne(user, id);
    await this.categoryModel.findByIdAndDelete(id);
    return;
  }
}

// test
