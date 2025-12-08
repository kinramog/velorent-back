import { IsNotEmpty } from "class-validator";

export class CreateStationBicycleDto {
    @IsNotEmpty()
    station_id: number;

    @IsNotEmpty()
    bicycle_id: number;

    @IsNotEmpty()
    quantity: number;
}
