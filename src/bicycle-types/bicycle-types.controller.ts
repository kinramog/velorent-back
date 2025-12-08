import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicycleTypesService } from './bicycle-types.service';
import { CreateBicycleTypeDto } from './dto/create-bicycle-type.dto';
import { UpdateBicycleTypeDto } from './dto/update-bicycle-type.dto';

@Controller('bicycle-types')
export class BicycleTypesController {
  constructor(private readonly bicycleTypesService: BicycleTypesService) {}

  @Post()
  create(@Body() createBicycleTypeDto: CreateBicycleTypeDto) {
    return this.bicycleTypesService.create(createBicycleTypeDto);
  }

  @Get()
  findAll() {
    return this.bicycleTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleTypeDto: UpdateBicycleTypeDto) {
    return this.bicycleTypesService.update(+id, updateBicycleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleTypesService.remove(+id);
  }
}
