import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { FinishRentalDto } from './dto/finish-rental.dto';

import { User } from 'src/user/entities/user.entity';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Station } from 'src/station/entities/station.entity';
import { RentalStatus } from 'src/rental-status/entities/rental-status.entity';

import { RentalStatusEnum } from './constants/rental-status.enum';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Bicycle) private readonly bicycleRepository: Repository<Bicycle>,
    @InjectRepository(Station) private readonly stationRepository: Repository<Station>,
    @InjectRepository(RentalStatus) private readonly rentalStatusRepository: Repository<RentalStatus>,
  ) { }

  // Создание аренды
  async createRental(userId: number, data: CreateRentalDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const station = await this.stationRepository.findOne({
      where: { id: data.station_id },
    });

    if (!station) {
      throw new NotFoundException('Станция не найдена');
    }

    // Проверка времени
    const start = new Date(data.start_time);
    const end = new Date(data.end_time);
    const now = new Date();

    if (end <= start) {
      throw new BadRequestException(
        'Время окончания аренды должно быть больше времени начала',
      );
    }

    if (start <= now || end <= now) {
      throw new BadRequestException(
        'Время начала и окончания аренды должно быть больше текущего',
      );
    }

    // Все велосипеды нужной модели на станции
    const bicycles = await this.bicycleRepository.find({
      where: {
        station: { id: station.id },
        model: { id: data.model_id },
      },
      relations: {
        model: true,
      },
    });

    if (!bicycles.length) {
      throw new BadRequestException(
        'На станции нет велосипедов этой модели',
      );
    }

    // Ищем свободный велосипед
    let freeBicycle: Bicycle | null = null;

    for (const bicycle of bicycles) {
      const conflict = await this.rentalRepository
        .createQueryBuilder('rental')
        .where('rental.bicycle_id = :bicycleId', {
          bicycleId: bicycle.id,
        })
        .andWhere('rental.start_time < :end', { end })
        .andWhere('rental.end_time > :start', { start })
        .andWhere('rental.status_id IN (:...statuses)', {
          statuses: [
            RentalStatusEnum.CREATED,
            RentalStatusEnum.ACTIVE,
          ],
        })
        .getOne();

      if (!conflict) {
        freeBicycle = bicycle;
        break;
      }
    }

    if (!freeBicycle) {
      throw new BadRequestException(
        'Нет свободных велосипедов на выбранное время',
      );
    }

    // Статус CREATED
    const status = await this.rentalStatusRepository.findOne({
      where: { id: RentalStatusEnum.CREATED },
    });

    if (!status) {
      throw new NotFoundException('Статус аренды не найден');
    }

    // Предварительный расчёт стоимости
    const hours = (end.getTime() - start.getTime()) / (1000 * 3600);
    const totalPrice = hours * Number(freeBicycle.model.price_per_hour);

    const rental = this.rentalRepository.create({
      user,
      bicycle: freeBicycle,
      station,
      status,
      start_time: start,
      end_time: end,
      start_time_actual: start,
      end_time_actual: end,
      total_price: totalPrice,
    });

    return this.rentalRepository.save(rental);
  }

  // Завершение аренды
  async finishRental(
    rentalId: number,
    data: FinishRentalDto,
  ) {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
      relations: {
        bicycle: true,
        status: true,
      },
    });

    if (!rental) {
      throw new NotFoundException('Аренда не найдена');
    }

    if (rental.status.id !== RentalStatusEnum.ACTIVE) {
      throw new BadRequestException('Аренда не активна');
    }

    const status = await this.rentalStatusRepository.findOne({
      where: { id: RentalStatusEnum.COMPLETED },
    });

    if (!status) {
      throw new NotFoundException('Статус аренды не найден');
    }

    rental.end_time_actual = data.end_time_actual
      ? new Date(data.end_time_actual)
      : rental.end_time;

    const hours =
      (rental.end_time_actual.getTime() -
        rental.start_time.getTime()) /
      (1000 * 3600);

    rental.total_price =
      hours * Number(rental.bicycle.model.price_per_hour);

    rental.status = status;

    return this.rentalRepository.save(rental);
  }

  // Отмена аренды
  async cancelRental(rentalId: number) {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
      relations: { status: true },
    });

    if (!rental) {
      throw new NotFoundException('Аренда не найдена');
    }

    if (rental.status.id !== RentalStatusEnum.CREATED) {
      throw new BadRequestException(
        'Отменить можно только созданную аренду',
      );
    }

    const status = await this.rentalStatusRepository.findOne({
      where: { id: RentalStatusEnum.CANCELLED },
    });

    if (!status) {
      throw new NotFoundException('Статус аренды не найден');
    }

    rental.status = status;
    return this.rentalRepository.save(rental);
  }

  // История аренд пользователя
  async getUserRentalHistory(userId: number) {
    console.log(userId);
    return this.rentalRepository.find({
      where: { user: { id: userId } },
      relations: {
        bicycle: {
          model: {
            type: true
          },
        },
        station: true,
        status: true,
      },
      order: { start_time: 'DESC' },
    });
  }

  // Получение аренды по id
  async getRental(id: number) {
    return this.rentalRepository.findOne({
      where: { id },
      relations: {
        user: true,
        bicycle: true,
        station: true,
        status: true,
      },
    });
  }
}
