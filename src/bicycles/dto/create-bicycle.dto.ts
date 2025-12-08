import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBicycleDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    type_id: number;

    @IsNotEmpty()
    price_per_hour: number;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    model_id: number;

    @IsNotEmpty()
    img_path: string;
}
