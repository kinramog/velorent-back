import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bicycle } from './entities/bicycle.entity';
import { BicycleModel } from 'src/bicycle-model/entities/bicycle-model.entity';
import { Station } from 'src/station/entities/station.entity';

import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { BulkCreateBicycleDto } from './dto/bulk-create-bicycle.dto';
import { RentalStatusEnum } from 'src/rental/constants/rental-status.enum';

@Injectable()
export class BicyclesService {
  constructor(
    @InjectRepository(Bicycle) private readonly bicycleRepository: Repository<Bicycle>,
    @InjectRepository(BicycleModel) private readonly modelRepository: Repository<BicycleModel>,
    @InjectRepository(Station) private readonly stationRepository: Repository<Station>,
  ) { }

  // Все физические велосипеды (админка)
  async getBicycles() {
    return this.bicycleRepository.find({
      relations: {
        model: true,
        station: true,
      },
    });
  }

  // Один физический велосипед
  async getBicycle(id: number) {
    const bicycle = await this.bicycleRepository.findOne({
      where: { id },
      relations: {
        model: true,
        station: true,
      },
    });

    if (!bicycle) {
      throw new NotFoundException('Велосипед не найден');
    }

    return bicycle;
  }

  // Создание физического велосипеда
  async createBicycle(data: CreateBicycleDto) {
    const model = await this.modelRepository.findOne({
      where: { id: data.model_id },
    });

    if (!model) {
      throw new NotFoundException('Модель велосипеда не найдена');
    }

    const station = await this.stationRepository.findOne({
      where: { id: data.station_id },
    });

    if (!station) {
      throw new NotFoundException('Станция не найдена');
    }

    const bicycle = this.bicycleRepository.create({
      model,
      station,
    });

    return this.bicycleRepository.save(bicycle);
  }

  // Обновление
  async updateBicycle(id: number, data: UpdateBicycleDto) {
    const bicycle = await this.getBicycle(id);

    if (data.model_id) {
      const model = await this.modelRepository.findOne({
        where: { id: data.model_id },
      });

      if (!model) {
        throw new NotFoundException('Модель велосипеда не найдена');
      }

      bicycle.model = model;
    }

    if (data.station_id) {
      const station = await this.stationRepository.findOne({
        where: { id: data.station_id },
      });

      if (!station) {
        throw new NotFoundException('Станция не найдена');
      }

      bicycle.station = station;
    }

    return this.bicycleRepository.save(bicycle);
  }

  // Удаление
  async removeBicycle(id: number) {
    const bicycle = await this.getBicycle(id);
    await this.bicycleRepository.remove(bicycle);
  }

  // Создание сразу нескольких велосипедов на станции
  async bulkCreate(dto: BulkCreateBicycleDto) {
    const model = await this.modelRepository.findOne({
      where: { id: dto.model_id },
    });

    if (!model) {
      throw new NotFoundException("Модель велосипеда не найдена");
    }

    const station = await this.stationRepository.findOne({
      where: { id: dto.station_id },
    });

    if (!station) {
      throw new NotFoundException("Станция не найдена");
    }

    const bicycles = Array.from({ length: dto.count }).map(() =>
      this.bicycleRepository.create({
        model,
        station,
      })
    );

    await this.bicycleRepository.save(bicycles);

    return { created: bicycles.length };
  }

  async bulkRemove(dto: BulkCreateBicycleDto) {
    // Получаем доступные велосипеды этой модели на станции
    const bikes = await this.bicycleRepository.find({
      where: {
        model: { id: dto.model_id },
        station: { id: dto.station_id },
      },
      relations: ['rentals'],
    });

    // Фильтруем только свободные (нет активной аренды)
    const removable = bikes.filter(bike =>
      !bike.rentals.some(r => r.status.id === RentalStatusEnum.ACTIVE)
    );

    if (removable.length === 0) {
      throw new Error('Нет доступных велосипедов для удаления');
    }

    // Ограничиваем по count
    const toRemove = removable.slice(0, dto.count);

    await this.bicycleRepository.remove(toRemove);

    return { removed: toRemove.length };
  }


}
