import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({},{ message: 'Ingrese un emael válido por favor' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}