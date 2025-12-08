import { IsNotEmpty } from "class-validator";

export class CreateStationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    img_path: string;
}
