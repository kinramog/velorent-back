import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBicycleDto {
    @IsNumber()
    @IsNotEmpty()
    model_id: number;

    @IsNumber()
    @IsNotEmpty()
    station_id: number;
}
