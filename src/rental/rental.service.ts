import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from 'src/station/entities/station.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { RentalStatus } from 'src/rental-status/entities/rental-status.entity';
import { Rental } from './entities/rental.entity';
import { StationBicycle } from 'src/station-bicycle/entities/station-bicycle.entity';
import { RentalStatusEnum } from './constants/rental-status.enum';
import { FinishRentalDto } from './dto/finish-rental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Bicycle) private bicycleRepository: Repository<Bicycle>,
    @InjectRepository(RentalStatus) private rentalStatusRepository: Repository<RentalStatus>,
    @InjectRepository(StationBicycle) private stationBicycleRepository: Repository<StationBicycle>,
  ) { }

  async createRental(user_id: number, data: CreateRentalDto) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const bicycle = await this.bicycleRepository.findOne({
      where: { id: data.bicycle_id }
    });
    if (!bicycle) {
      throw new Error('Велосипед не найден');
    }

    const station = await this.stationRepository.findOne({
      where: { id: data.station_id },
    });
    if (!station) {
      throw new Error('Станция проката не найдена');
    }

    const station_bicycle = await this.stationBicycleRepository.findOne({
      where: {
        station: { id: station.id },
        bicycle: { id: bicycle.id },
      }
    });

    console.log(station_bicycle);
    if (!station_bicycle) {
      throw new Error('Велосипед отсутствует на этой станции проката');
    }

    // Проверяем, что время старта меньше времени конца
    const start = new Date(data.start_time);
    const end = new Date(data.end_time);

    if (end <= start) {
      throw new Error('Время окончания аренды должно быть больше времени старта');
    }

    // Проверяем, что время старта и конца аренды больше текущего    
    const now = new Date();
    if (start <= now) {
      throw new Error("Время начала аренды должно быть больше текущего");
    }
    if (end <= now) {
      throw new Error("Время конца аренды должно быть больше текущего");
    }

    // Считаем цену за аренду
    const hours = (end.getTime() - start.getTime()) / 1000 / 3600;
    const total_price = hours * Number(bicycle.price_per_hour);

    // Получаем статус аренды
    const status = await this.rentalStatusRepository.findOne({
      where: { id: RentalStatusEnum.ACTIVE },
    });

    if (!status) {
      throw new Error('Статус аренды не найден');
    }

    const rental = this.rentalRepository.create({
      user,
      bicycle,
      station,
      status,
      total_price,
      start_time: data.start_time,
      end_time: data.end_time,
      start_time_actual: data.start_time,
      end_time_actual: data.end_time,
    });

    return await this.rentalRepository.save(rental);
  }

  // Завершение аренды
  async finishRental(rental_id: number, data: FinishRentalDto) {
    const rental = await this.rentalRepository.findOne({
      where: { id: rental_id },
      relations: {
        user: true,
        status: true
      },
    });

    if (!rental) {
      throw new Error("Аренда не найдена");
    }

    if (rental.status.id !== RentalStatusEnum.ACTIVE) {
      throw new BadRequestException('Аренда не активна');
    }

    const status = await this.rentalStatusRepository.findOne({
      where: { id: RentalStatusEnum.COMPLETED },
    });

    rental.end_time_actual = data.end_time_actual
      ? new Date(data.end_time_actual)
      : rental.end_time;

    const hours = (rental.end_time_actual.getTime() - rental.start_time.getTime()) / (1000 * 3600);
    rental.total_price = hours * Number(rental.bicycle.price_per_hour);

    return this.rentalRepository.save(rental);
  }

  async getUserRentalHistory(user_id: number) {
    const history = await this.rentalRepository.find({
      where: {
        user:
          { id: user_id }
      },
      relations: {
        bicycle: true,
        station: true,
        status: true
      },
      order: { start_time: 'DESC' },
    });
    return history;
  }

  async getRental(id: number) {
    const rental = await this.stationRepository.findOneBy({ id })
    return rental;
  }

}
