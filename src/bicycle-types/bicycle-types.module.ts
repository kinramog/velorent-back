import { Module } from '@nestjs/common';
import { BicycleTypesService } from './bicycle-types.service';
import { BicycleTypesController } from './bicycle-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { BicycleType } from './entities/bicycle-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bicycle, BicycleType])
  ],
  controllers: [BicycleTypesController],
  providers: [BicycleTypesService],
})
export class BicycleTypesModule { }
