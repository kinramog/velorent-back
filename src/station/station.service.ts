import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { Repository } from 'typeorm';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
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
