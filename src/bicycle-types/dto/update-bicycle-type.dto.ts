import { PartialType } from '@nestjs/mapped-types';
import { CreateBicycleTypeDto } from './create-bicycle-type.dto';

export class UpdateBicycleTypeDto extends PartialType(CreateBicycleTypeDto) {}
