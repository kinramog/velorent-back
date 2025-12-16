import { Module } from '@nestjs/common';
import { BicycleTypesService } from './bicycle-types.service';
import { BicycleTypesController } from './bicycle-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleType } from './entities/bicycle-type.entity';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BicycleModel, BicycleType])
  ],
  controllers: [BicycleTypesController],
  providers: [BicycleTypesService],
})
export class BicycleTypesModule { }
