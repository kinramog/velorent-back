import { BicycleModelService } from './bicycle-model.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { UpdateBicycleModelDto } from './dto/update-bicycle-model.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/storage/multer.config';
@Controller('bicycle-model')
export class BicycleModelController {
  constructor(private readonly bicycleModelService: BicycleModelService) { }

  // Получение всех моделей
  @Get()
  getModels() {
    return this.bicycleModelService.getAllModels();
  }

  // Получение модели по ID
  @Get(':id')
  getModel(@Param('id') id: string) {
    return this.bicycleModelService.getModel(+id);
  }

  // Создание модели (только для админа)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createModel(@Body() createDto: CreateBicycleModelDto) {
    return this.bicycleModelService.createModel(createDto);
  }

  // Обновление модели
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  updateModel(@Param('id') id: string, @Body() updateDto: UpdateBicycleModelDto) {
    return this.bicycleModelService.updateModel(+id, updateDto);
  }

  // Удаление модели
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  removeModel(@Param('id') id: string) {
    return this.bicycleModelService.removeModel(+id);
  }

  // Загрузка картинки модели
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    return this.bicycleModelService.updateImage(+id, file);
  }
}
