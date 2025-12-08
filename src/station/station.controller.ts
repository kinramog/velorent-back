import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.createStation(createStationDto);
  }

  @Get()
  findAll() {
    return this.stationService.getStations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.getStation(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.updateStation(+id, updateStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.removeStation(+id);
  }
}
