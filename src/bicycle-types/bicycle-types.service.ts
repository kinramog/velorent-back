import { Injectable } from '@nestjs/common';
import { CreateBicycleTypeDto } from './dto/create-bicycle-type.dto';
import { UpdateBicycleTypeDto } from './dto/update-bicycle-type.dto';

@Injectable()
export class BicycleTypesService {
  create(createBicycleTypeDto: CreateBicycleTypeDto) {
    return 'This action adds a new bicycleType';
  }

  findAll() {
    return `This action returns all bicycleTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bicycleType`;
  }

  update(id: number, updateBicycleTypeDto: UpdateBicycleTypeDto) {
    return `This action updates a #${id} bicycleType`;
  }

  remove(id: number) {
    return `This action removes a #${id} bicycleType`;
  }
}
