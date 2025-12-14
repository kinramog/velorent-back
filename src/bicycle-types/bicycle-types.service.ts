import { Injectable } from '@nestjs/common';
import { CreateBicycleTypeDto } from './dto/create-bicycle-type.dto';
import { UpdateBicycleTypeDto } from './dto/update-bicycle-type.dto';
import { BicycleType } from './entities/bicycle-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BicycleTypesService {
  constructor(
    @InjectRepository(BicycleType) private bicycleRepository: Repository<BicycleType>,
  ) { }
  create(createBicycleTypeDto: CreateBicycleTypeDto) {
    return 'This action adds a new bicycleType';
  }

  async findAll() {
    const bicycleTypes = await this.bicycleRepository.find();
    return bicycleTypes;
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
