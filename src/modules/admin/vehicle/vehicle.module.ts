import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Vehicle, VehicleSchema } from './model/vehicle.model';
import { VehiclePlan, VehiclePlanSchema } from './model/vehicle-plan.model';
import { VehicleImage, VehicleImageSchema } from './model/vehicle-image.model';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: VehicleImage.name, schema: VehicleImageSchema },
      { name: VehiclePlan.name, schema: VehiclePlanSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})

//
export class VehicleModule {}
