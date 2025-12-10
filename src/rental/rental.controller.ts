import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FinishRentalDto } from './dto/finish-rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRental(@Body() createRentalDto: CreateRentalDto, @Req() req) {
    return this.rentalService.createRental(req.user.id, createRentalDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/finish')
  finishRental(@Param('id') id: number, @Body() finishRentalDto: FinishRentalDto) {
    return this.rentalService.finishRental(id, finishRentalDto);
  }

  @Get('user/:id')
  getAllUserRentals(@Param('id') id: string) {
    return this.rentalService.getUserRentalHistory(+id);
  }

  @Get(':id')
  getRental(@Param('id') id: string) {
    return this.rentalService.getRental(+id);
  }

}
