import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicycleModelService } from './bicycle-model.service';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { UpdateBicycleModelDto } from './dto/update-bicycle-model.dto';

@Controller('bicycle-model')
export class BicycleModelController {
  constructor(private readonly bicycleModelService: BicycleModelService) {}

  @Post()
  createBicycleModel(@Body() createBicycleModelDto: CreateBicycleModelDto) {
    return this.bicycleModelService.createBicycleModel(createBicycleModelDto);
  }

  @Get()
  findAll() {
    return this.bicycleModelService.getBicycleModels();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleModelService.getBicycleModel(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleModelDto: UpdateBicycleModelDto) {
    return this.bicycleModelService.updateBicycleModel(+id, updateBicycleModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleModelService.removeBicycleModel(+id);
  }
}
