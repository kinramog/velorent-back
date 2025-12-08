import { Module } from '@nestjs/common';
import { StationBicycleService } from './station-bicycle.service';
import { StationBicycleController } from './station-bicycle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from 'src/station/entities/station.entity';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { StationBicycle } from './entities/station-bicycle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, Bicycle, StationBicycle])
  ],
  controllers: [StationBicycleController],
  providers: [StationBicycleService],
})
export class StationBicycleModule { }
