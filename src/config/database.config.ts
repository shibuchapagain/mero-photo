// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         uri: config.get<string>('MONGODB_URI'),
//         // connectionFactory: (connection) => {
//         //   const logger = new Logger('Database');
//         //   logger.log('✅ Database connected successfully', connection);
//         // },
//       }),
//     }),
//   ],
// })

// //
// export class DatabaseModule {}

// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/admin/user/user.model';
import { MongoDBService } from 'src/shared/mongodb.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [MongoDBService],
  exports: [MongoDBService], // 👈 make available to other modules
})

//
export class DatabaseModule {}
