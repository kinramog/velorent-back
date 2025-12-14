import { IsNotEmpty } from "class-validator"

export class SignUpDto {
    fio: string;

    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
