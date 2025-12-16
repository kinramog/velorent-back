import { Module } from '@nestjs/common';
import { BicyclesService } from './bicycles.service';
import { BicyclesController } from './bicycles.controller';
import { Bicycle } from './entities/bicycle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';
import { BicycleType } from 'src/bicycle-types/entities/bicycle-type.entity';
import { Rental } from 'src/rental/entities/rental.entity';
import { StorageModule } from 'src/storage/storage.module';
import { Station } from 'src/station/entities/station.entity';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bicycle, BicycleModel, BicycleType, Rental, Station, StorageService]),
  ],
  controllers: [BicyclesController],
  providers: [BicyclesService],
  exports: [BicyclesService]
})
export class BicyclesModule { }
