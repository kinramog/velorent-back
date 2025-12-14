import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBicycleDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    type_id: number;

    @IsNumber()
    @IsNotEmpty()
    price_per_hour: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    frame_size: number;

    @IsNumber()
    @IsNotEmpty()
    cyclist_min_height: number;

    @IsNumber()
    @IsNotEmpty()
    cyclist_max_height: number;

    @IsNumber()
    @IsNotEmpty()
    model_id: number;

    @IsNumber()
    @IsNotEmpty()
    img_path: string;
}
