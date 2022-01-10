import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEmail({},{ message: 'Ingrese un emael válido por favor' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string
}