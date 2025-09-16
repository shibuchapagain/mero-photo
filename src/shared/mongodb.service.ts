import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/admin/user/user.model';

@Injectable()
export class MongoDBService {
  constructor(@InjectModel(User.name) public readonly userModel: Model<UserDocument>) {}
}
