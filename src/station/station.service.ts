import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { Repository } from 'typeorm';
import { StorageService } from 'src/storage/storage.service';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(Bicycle) private bicycleRepository: Repository<Bicycle>,
    private readonly storageService: StorageService,
  ) { }

  // Создании станции проката
  async createStation(data: CreateStationDto) {
    const model = this.stationRepository.create(data);
    return await this.stationRepository.save(model);
  }

  // Получение всех станций проката
  async getStations() {
    const stations = await this.stationRepository.find();
    return stations;
  }

  // Получение станции проката
  async getStation(id: number) {
    const station = await this.stationRepository.findOneBy({ id })
    return station;
  }

  async getStationsByBicycleModel(modelId: number) {
    // Берем все велосипеды этой модели с их станциями
    const bicycles = await this.bicycleRepository.find({
      where: { model: { id: modelId } },
      relations: {
        station: true
      },
    });

    // Собираем уникальные станции
    const stationMap = new Map<number, Station>();
    bicycles.forEach(bike => {
      if (bike.station) {
        stationMap.set(bike.station.id, bike.station);
      }
    });

    return Array.from(stationMap.values());
  }

  // Обновление данных станции проката
  async updateStation(id: number, data: UpdateStationDto) {
    const model = this.stationRepository.create({ id, ...data });
    return await this.stationRepository.save(model);
  }

  // Удаление станции проката
  async removeStation(id: number) {
    await this.stationRepository.delete(id);
  }

  // Добавление изображения
  async updateImage(id: number, file: Express.Multer.File) {
    const station = await this.getStation(id);

    if (!station) {
      throw new NotFoundException('Станция не найдена');
    }

    // удаляем старый файл
    if (station.img_path) {
      this.storageService.deleteFile(station.img_path);
    }

    // сохраняем новый файл
    const newPath = this.storageService.saveFile(file);

    station.img_path = newPath;
    return this.stationRepository.save(station);
  }
}
