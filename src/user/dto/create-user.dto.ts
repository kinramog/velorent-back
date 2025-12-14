import { IsNotEmpty } from "class-validator"

export class CreateUserDto {
    fio: string;

    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
