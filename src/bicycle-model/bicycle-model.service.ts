import { Injectable } from '@nestjs/common';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { UpdateBicycleModelDto } from './dto/update-bicycle-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BicycleModel } from './entities/bicycle-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BicycleModelService {
  constructor(
    @InjectRepository(BicycleModel) private bicycleModelRepository: Repository<BicycleModel>,
  ) { }

  async createBicycleModel(data: CreateBicycleModelDto) {
    const model = this.bicycleModelRepository.create(data);

    return await this.bicycleModelRepository.save(model);
  }

  async getBicycleModels() {
    const bicycleModels = await this.bicycleModelRepository.find();
    return bicycleModels;
  }

  async getBicycleModel(id: number) {
    const bicycleModel = await this.bicycleModelRepository.findOneBy({ id })
    return bicycleModel;
  }

  async updateBicycleModel(id: number, updateBicycleModelDto: UpdateBicycleModelDto) {
    return `This action updates a #${id} bicycleModel`;
  }

  async removeBicycleModel(id: number) {
    await this.bicycleModelRepository.delete(id);
  }
}
