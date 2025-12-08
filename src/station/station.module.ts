import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Station } from './entities/station.entity';
import { StationBicycle } from 'src/station-bicycle/entities/station-bicycle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, Bicycle, StationBicycle])
  ],
  controllers: [StationController],
  providers: [StationService],
})
export class StationModule { }
