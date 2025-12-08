import { Module } from '@nestjs/common';
import { BicycleTypesService } from './bicycle-types.service';
import { BicycleTypesController } from './bicycle-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bicycle])
  ],
  controllers: [BicycleTypesController],
  providers: [BicycleTypesService],
})
export class BicycleTypesModule { }
