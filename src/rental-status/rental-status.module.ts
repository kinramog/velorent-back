import { Module } from '@nestjs/common';
import { RentalStatusService } from './rental-status.service';
import { RentalStatusController } from './rental-status.controller';
import { Rental } from 'src/rental/entities/rental.entity';
import { RentalStatus } from './entities/rental-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, RentalStatus])
  ],
  controllers: [RentalStatusController],
  providers: [RentalStatusService],
  exports: [RentalStatusService]

})
export class RentalStatusModule { }
