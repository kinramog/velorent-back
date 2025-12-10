import { Injectable } from '@nestjs/common';
import { CreateRentalStatusDto } from './dto/create-rental-status.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';

@Injectable()
export class RentalStatusService {
  create(createRentalStatusDto: CreateRentalStatusDto) {
    return 'This action adds a new rentalStatus';
  }

  findAll() {
    return `This action returns all rentalStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentalStatus`;
  }

  update(id: number, updateRentalStatusDto: UpdateRentalStatusDto) {
    return `This action updates a #${id} rentalStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentalStatus`;
  }
}
