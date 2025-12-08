import { IsNotEmpty } from 'class-validator';

export class ChangeBicycleQuantityOnStationDto {
    @IsNotEmpty()
    quantity: number;
}
