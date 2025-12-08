import { Injectable } from '@nestjs/common';
import { CreateStationBicycleDto } from './dto/create-station-bicycle.dto';
import { ChangeBicycleQuantityOnStationDto } from './dto/change-bicycle-quantity.dto';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from 'src/station/entities/station.entity';
import { StationBicycle } from './entities/station-bicycle.entity';

@Injectable()
export class StationBicycleService {
  constructor(
    @InjectRepository(StationBicycle) private stationBicycleRepository: Repository<StationBicycle>,
    @InjectRepository(Bicycle) private bicycleRepository: Repository<Bicycle>,
    @InjectRepository(Station) private stationRepository: Repository<Station>,
  ) { }

  // Добавление велосипеда на станцию
  async addBicycleToStation(data: CreateStationBicycleDto) {
    const bicycles = await this.bicycleRepository.find({
      where: {
        id: In([data.bicycle_id])
      }
    });
    const bicycle = bicycles[0];

    const stations = await this.stationRepository.find({
      where: {
        id: In([data.station_id])
      }
    });
    const station = stations[0];

    if (data.quantity > bicycle.quantity) {
      return {
        success: false,
        message: "Переданное количество велосипедов больше допустимого"
      }
    }
    const stationBicycle = this.stationBicycleRepository.create({
      station: station,
      bicycle: bicycle,
      quantity: data.quantity
    });

    return await this.stationBicycleRepository.save(stationBicycle);
  }

  async getAllBicycleStations() {
    const bicycles = await this.bicycleRepository.find();
    return bicycles;
  }

  async getBicycleStation(id: number) {
    return `This action returns a #${id} stationBicycle`;
  }

  async changeBicycleQuantity(id: number, data: ChangeBicycleQuantityOnStationDto) {
    const oldStationBicycles = await this.stationBicycleRepository.find({
      relations: {
        bicycle: true
      },
      where: {
        id: In([id])
      }
    });
    const oldStationBicycle = oldStationBicycles[0];

    if (data.quantity != null && data.quantity > oldStationBicycle.bicycle.quantity) {
      return {
        success: false,
        message: "Переданное количество велосипедов больше допустимого"
      }
    }

    const stationBicycle = this.stationBicycleRepository.create({
      id: id,
      quantity: data.quantity
    });

    return await this.stationBicycleRepository.save(stationBicycle);
  }

  async removeBicycleFromStation(id: number) {
    return `This action removes a #${id} stationBicycle`;
  }
}
