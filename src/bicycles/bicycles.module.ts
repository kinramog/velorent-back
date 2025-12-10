import { Module } from '@nestjs/common';
import { BicyclesService } from './bicycles.service';
import { BicyclesController } from './bicycles.controller';
import { Bicycle } from './entities/bicycle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';
import { BicycleType } from 'src/bicycle-types/entities/bicycle-type.entity';
import { Rental } from 'src/rental/entities/rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bicycle, BicycleModel, BicycleType, Rental])
  ],
  controllers: [BicyclesController],
  providers: [BicyclesService],
})
export class BicyclesModule { }
