import { IsInt, Min } from "class-validator";

export class BulkCreateBicycleDto {
    @IsInt()
    model_id: number;

    @IsInt()
    station_id: number;

    @IsInt()
    @Min(1)
    count: number;
}
