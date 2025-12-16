import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BicycleModel } from './entities/bicycle-model.entity';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { UpdateBicycleModelDto } from './dto/update-bicycle-model.dto';
import { StorageService } from 'src/storage/storage.service';
import { BicycleType } from 'src/bicycle-types/entities/bicycle-type.entity';

@Injectable()
export class BicycleModelService {
  constructor(
    @InjectRepository(BicycleModel) private modelRepository: Repository<BicycleModel>,
    @InjectRepository(BicycleType) private typeRepository: Repository<BicycleType>,
    private readonly storageService: StorageService,
  ) { }

  // Получение всех моделей
  async getAllModels() {
    return await this.modelRepository.find({
      relations: ['bicycles']
    });
  }

  // Получение модели по id
  async getModel(id: number) {
    const model = await this.modelRepository.findOne({
      where: { id },
      relations: ['bicycles', 'type'],
    });
    if (!model) throw new NotFoundException('Модель не найдена');
    return model;
  }

  // Создание модели
  async createModel(data: CreateBicycleModelDto) {
    const type = await this.typeRepository.findOne({
      where: {
        id: data.type_id
      }
    });

    const model = this.modelRepository.create({
      name: data.name,
      description: data.description,
      price_per_hour: data.price_per_hour,
      frame_size: data.frame_size,
      cyclist_min_height: data.cyclist_min_height,
      cyclist_max_height: data.cyclist_max_height,
      img_path: data.img_path,
      type: type,
    });
    return await this.modelRepository.save(model);
  }

  // Обновление модели
  async updateModel(id: number, data: UpdateBicycleModelDto) {
    let model = await this.getModel(id);

    model.id = id;
    model.name = data.name ?? model.name;
    model.description = data.description ?? model.description;
    model.price_per_hour = data.price_per_hour ?? model.price_per_hour;
    model.frame_size = data.frame_size ?? model.frame_size;
    model.cyclist_min_height = data.cyclist_min_height ?? model.cyclist_min_height;
    model.cyclist_max_height = data.cyclist_max_height ?? model.cyclist_max_height;
    model.img_path = data.img_path ?? model.img_path;

    return await this.modelRepository.save(model);
  }

  // Удаление модели
  async removeModel(id: number) {
    const model = await this.getModel(id);
    return await this.modelRepository.delete(model.id);
  }

  // Обновление изображения модели
  async updateImage(id: number, file: Express.Multer.File) {
    const model = await this.getModel(id);

    if (!model) {
      throw new NotFoundException('Велосипед не найден');
    }

    // удаляем старый файл
    if (model.img_path) {
      this.storageService.deleteFile(model.img_path);
    }

    // сохраняем новый файл
    const newPath = this.storageService.saveFile(file);
    model.img_path = newPath;

    return await this.modelRepository.save(model);
  }
}
