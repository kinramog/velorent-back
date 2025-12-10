import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalStatusService } from './rental-status.service';
import { CreateRentalStatusDto } from './dto/create-rental-status.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';

@Controller('rental-status')
export class RentalStatusController {
  constructor(private readonly rentalStatusService: RentalStatusService) {}

  @Post()
  create(@Body() createRentalStatusDto: CreateRentalStatusDto) {
    return this.rentalStatusService.create(createRentalStatusDto);
  }

  @Get()
  findAll() {
    return this.rentalStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalStatusDto: UpdateRentalStatusDto) {
    return this.rentalStatusService.update(+id, updateRentalStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalStatusService.remove(+id);
  }
}
