import { Module } from '@nestjs/common';
import { BicycleModelService } from './bicycle-model.service';
import { BicycleModelController } from './bicycle-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleModel } from './entities/bicycle-model.entity';
import { Rental } from 'src/rental/entities/rental.entity';
import { StorageModule } from 'src/storage/storage.module';
import { BicycleType } from 'src/bicycle-types/entities/bicycle-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BicycleModel, Rental, BicycleType]),
    StorageModule
  ],
  controllers: [BicycleModelController],
  providers: [BicycleModelService],
  exports: [BicycleModelService]
})
export class BicycleModelModule { }
