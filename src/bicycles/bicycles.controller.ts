import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BicyclesService } from './bicycles.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('bicycles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) { }

  // Все физические велосипеды (админка)
  @Get()
  getBicycles() {
    return this.bicyclesService.getBicycles();
  }

  // Физический велосипед по id
  @Get(':id')
  getBicycle(@Param('id') id: string) {
    return this.bicyclesService.getBicycle(+id);
  }

  // Создание физического велосипеда
  @Post()
  createBicycle(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicyclesService.createBicycle(createBicycleDto);
  }

  // Обновление
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBicycleDto: UpdateBicycleDto,
  ) {
    return this.bicyclesService.updateBicycle(+id, updateBicycleDto);
  }

  // Удаление
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicyclesService.removeBicycle(+id);
  }
}
