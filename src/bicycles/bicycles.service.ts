import { Injectable } from '@nestjs/common';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicycle } from './entities/bicycle.entity';
import { In, Repository } from 'typeorm';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';

@Injectable()
export class BicyclesService {
  constructor(
    @InjectRepository(Bicycle) private bicycleRepository: Repository<Bicycle>,
    @InjectRepository(BicycleModel) private modelRepository: Repository<BicycleModel>,
  ) { }

  // Получение всех велосипедов
  async getBicycles() {
    const bicycles = await this.bicycleRepository.find();
    return bicycles;
  }

  // Получение велосипеда по id
  async getBicycle(bicycle_id: number) {
    const bicycle = await this.bicycleRepository.findOneBy({ id: bicycle_id })
    return bicycle;
  }

  // Создание велосипеда 
  async createBicycle(data: CreateBicycleDto) {
    const models = await this.modelRepository.find({
      where: {
        id: In([data.model_id])
      }
    });
    const model = models[0];

    const types = await this.modelRepository.find({
      where: {
        id: In([data.type_id])
      }
    });
    const type = types[0];

    const bicycle = this.bicycleRepository.create({
      name: data.name,
      description: data.description,
      price_per_hour: data.price_per_hour,
      quantity: data.quantity,
      model: model,
      type: type,
      img_path: data.img_path
    });

    return await this.bicycleRepository.save(bicycle);
  }

  // Обновление данных велосипеда
  async updateBicycle(id: number, data: UpdateBicycleDto) {
    const models = await this.modelRepository.find({
      where: {
        id: In([data.model_id])
      }
    });
    const model = models[0];

    const types = await this.modelRepository.find({
      where: {
        id: In([data.type_id])
      }
    });
    const type = types[0];

    const bicycle = this.bicycleRepository.create({
      id: id,
      name: data.name,
      description: data.description,
      price_per_hour: data.price_per_hour,
      quantity: data.quantity,
      model: model,
      type: type,
      img_path: data.img_path
    });

    return await this.bicycleRepository.save(bicycle);
  }

  // Удаление велосипеда
  async removeBicycle(id: number) {
    await this.modelRepository.delete(id);
  }
}
