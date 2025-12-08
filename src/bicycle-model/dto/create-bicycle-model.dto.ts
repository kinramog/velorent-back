import { IsNotEmpty } from "class-validator";

export class CreateBicycleModelDto {
    @IsNotEmpty()
    name: string;
}
