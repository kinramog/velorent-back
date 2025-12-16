import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Station } from './entities/station.entity';
import { Rental } from 'src/rental/entities/rental.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, Bicycle, Rental]),
    StorageModule
  ],
  controllers: [StationController],
  providers: [StationService],
})
export class StationModule { }
