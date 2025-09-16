import { NestFactory } from '@nestjs/core';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../modules/admin/user/user.model';
import { AppModule } from '../app.module';
import { Role } from '../types/role';
import * as argon from 'argon2';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  try {
    const superAdmin = await userModel.findOne({ role: Role.SUPER_ADMIN });

    if (superAdmin) return;
    const hashPassword = await argon.hash('Pass@123');
    const usersToSeed = [
      {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@system.com',
        password: hashPassword,
        role: Role.SUPER_ADMIN,
        isVerified: true,
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@system.com',
        password: hashPassword,
        role: Role.ADMIN,
        isVerified: true,
      },
      {
        firstName: 'Normal',
        lastName: 'User',
        email: 'user@system.com',
        password: hashPassword,
        role: Role.USER,
        isVerified: true,
      },
    ];
    await userModel.insertMany(usersToSeed);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

//
seed()
  .then(() => console.log('Seed Completed'))
  .catch((error) => console.log(error));
