import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.updateStation(+id, updateStationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.removeStation(+id);
  }
}
