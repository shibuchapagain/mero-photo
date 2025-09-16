import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  // The 'providers' array declares the services that belong to this module.
  providers: [JwtService],

  // The 'exports' array is crucial. It makes the providers in this module
  // available to any other module that imports SharedModule.
  exports: [JwtService],
})
export class SharedModule {}
