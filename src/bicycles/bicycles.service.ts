import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicycle } from './entities/bicycle.entity';
import { In, Repository } from 'typeorm';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class BicyclesService {
  constructor(
    @InjectRepository(Bicycle) private bicycleRepository: Repository<Bicycle>,
    @InjectRepository(BicycleModel) private modelRepository: Repository<BicycleModel>,
    private readonly storageService: StorageService,
  ) { }

  // Получение всех велосипедов
  async getBicycles() {
    const bicycles = await this.bicycleRepository.find({
      relations: {
        type: true,
        model: true
      }
    });
    return bicycles;
  }

  // Получение велосипеда по id
  async getBicycle(bicycle_id: number) {
    const bicycle = await this.bicycleRepository.find({
      where: { id: bicycle_id },
      relations: {
        model: true,
        type: true
      }
    })
    return bicycle[0];
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
      frame_size: data.frame_size,
      cyclist_min_height: data.cyclist_min_height,
      cyclist_max_height: data.cyclist_max_height,
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
      frame_size: data.frame_size,
      cyclist_min_height: data.cyclist_min_height,
      cyclist_max_height: data.cyclist_max_height,
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

  // Добавление изображения
  async updateImage(id: number, file: Express.Multer.File) {
    const bicycle = await this.getBicycle(id);

    if (!bicycle) {
      throw new NotFoundException('Велосипед не найден');
    }

    // удаляем старый файл
    if (bicycle.img_path) {
      this.storageService.deleteFile(bicycle.img_path);
    }

    // сохраняем новый файл
    const newPath = this.storageService.saveFile(file);

    bicycle.img_path = newPath;
    return this.bicycleRepository.save(bicycle);
  }
}
