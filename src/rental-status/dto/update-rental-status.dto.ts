import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalStatusDto } from './create-rental-status.dto';

export class UpdateRentalStatusDto extends PartialType(CreateRentalStatusDto) {}
