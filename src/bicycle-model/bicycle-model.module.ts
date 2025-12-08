import { Module } from '@nestjs/common';
import { BicycleModelService } from './bicycle-model.service';
import { BicycleModelController } from './bicycle-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { BicycleModel } from './entities/bicycle-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BicycleModel])
  ],
  controllers: [BicycleModelController],
  providers: [BicycleModelService],
})
export class BicycleModelModule { }
