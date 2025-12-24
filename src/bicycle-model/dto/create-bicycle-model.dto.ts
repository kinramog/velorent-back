import { IsNotEmpty } from "class-validator";

export class CreateBicycleModelDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price_per_hour: number;

    @IsNotEmpty()
    frame_size: number;

    @IsNotEmpty()
    cyclist_min_height: number;

    @IsNotEmpty()
    cyclist_max_height: number;
    
    img_path: string;

    @IsNotEmpty()
    type_id: number;
}
