import { PartialType } from '@nestjs/mapped-types';
import { CreateBicycleModelDto } from './create-bicycle-model.dto';

export class UpdateBicycleModelDto extends PartialType(CreateBicycleModelDto) {}
