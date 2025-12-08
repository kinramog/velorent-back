import { IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    fio: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
