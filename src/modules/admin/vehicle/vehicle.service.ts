import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Vehicle } from './model/vehicle.model';
import { VehiclePlan } from './model/vehicle-plan.model';
import { VehicleImage } from './model/vehicle-image.model';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    @InjectModel(VehicleImage.name) private vehicleImageModel: Model<VehicleImage>,
    @InjectModel(VehiclePlan.name) private vehiclePlanModel: Model<VehiclePlan>,
  ) {}

  // create vehicle
}
