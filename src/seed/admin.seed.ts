import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from 'src/config/database.config';
import { MongoDBService } from 'src/shared/mongodb.service';
import { Role } from 'src/types/role';

export async function seed() {
  const appContext = await NestFactory.createApplicationContext(DatabaseModule);

  try {
    const mongoService = appContext.get(MongoDBService);

    const superAdmin = await mongoService.userModel.findOne({ role: Role.SUPER_ADMIN });
    const admin = await mongoService.userModel.findOne({ role: Role.ADMIN });

    if (!superAdmin) {
      await mongoService.userModel.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@system.com',
        password: 'Pass@123',
        role: Role.SUPER_ADMIN,
      });
      console.log('✅ Super Admin created');
    } else {
      console.log('ℹ️ Super Admin already exists');
    }

    if (!admin) {
      await mongoService.userModel.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@system.com',
        password: 'Pass@123',
        role: Role.ADMIN,
      });
      console.log('✅ Admin created');
    } else {
      console.log('ℹ️ Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error during seeding', error);
  } finally {
    await appContext.close();
  }
}
