import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Station } from 'src/station/entities/station.entity';
import { RentalStatus } from 'src/rental-status/entities/rental-status.entity';
import { Rental } from './entities/rental.entity';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, Station, Bicycle, User, RentalStatus, BicycleModel ])
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService]

})
export class RentalModule { }
