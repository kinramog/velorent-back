import { IsNotEmpty } from "class-validator";

export class CreateRentalDto {
    @IsNotEmpty()
    station_id: number;

    @IsNotEmpty()
    bicycle_id: number;

    @IsNotEmpty()
    start_time: string;

    @IsNotEmpty()
    end_time: string;
}
