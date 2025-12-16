import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationBicycleService } from './station-bicycle.service';
import { CreateStationBicycleDto } from './dto/create-station-bicycle.dto';
import { ChangeBicycleQuantityOnStationDto } from './dto/change-bicycle-quantity.dto';

@Controller('station-bicycle')
export class StationBicycleController {
  constructor(private readonly stationBicycleService: StationBicycleService) { }

  // Добавление велосипеда на станцию проката
  @Post()
  addBicycleToStation(@Body() createStationBicycleDto: CreateStationBicycleDto) {
    return this.stationBicycleService.addBicycleToStation(createStationBicycleDto);
  }

  // Получение все связи велосипедов со станциями
  @Get()
  getAllBicycleStations() {
    return this.stationBicycleService.getAllBicycleStations();
  }

  // Получение всех станций, на которых есть велосипед
  @Get('bicycle/:id')
  getBicycleStations(@Param('id') id: string) {
    return this.stationBicycleService.getBicycleStations(+id);
  }

  // Изменить связь велосипедов и станций
  // (количество, станции, велосипеды)
  @Patch(':id')
  changeBicycleQuantity(@Param('id') id: string, @Body() changeBicycleQuantityOnStationDto: ChangeBicycleQuantityOnStationDto) {
    return this.stationBicycleService.changeBicycleQuantity(+id, changeBicycleQuantityOnStationDto);
  }

  @Delete(':id')
  removeBicycleFromStation(@Param('id') id: string) {
    return this.stationBicycleService.removeBicycleFromStation(+id);
  }

  @Get(':id')
  getBicycleStation(@Param('id') id: string) {
    return this.stationBicycleService.getBicycleStation(+id);
  }
}
