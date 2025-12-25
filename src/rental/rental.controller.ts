import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { FinishRentalDto } from './dto/finish-rental.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  // Создание аренды
  @UseGuards(JwtAuthGuard)
  @Post()
  createRental(@Req() req, @Body() dto: CreateRentalDto) {
    return this.rentalService.createRental(req.user.id, dto);
  }

  // Завершение аренды
  @UseGuards(JwtAuthGuard)
  @Patch(':id/finish')
  finishRental(
    @Param('id') id: string,
    @Body() dto: FinishRentalDto,
  ) {
    return this.rentalService.finishRental(+id, dto);
  }

  // Получение всех аренд
  @UseGuards(JwtAuthGuard)
  @Get('/all-rentals')
  getAllActiveRentals() {
    return this.rentalService.getAllActiveRentals();
  }

  // Отмена аренды
  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancelRental(@Param('id') id: string) {
    return this.rentalService.cancelRental(+id);
  }

  // Старт аренды
  @UseGuards(JwtAuthGuard)
  @Patch(':id/start')
  startRental(@Param('id') id: string) {
    return this.rentalService.startRental(+id);
  }


  // История аренд пользователя
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getUserRentals(@Param('id') id: string) {
    return this.rentalService.getUserRentalHistory(+id);
  }

  // Получение аренды по id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRental(@Param('id') id: string) {
    return this.rentalService.getRental(+id);
  }
}
