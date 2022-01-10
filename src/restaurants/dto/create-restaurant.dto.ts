import { User } from 'src/auth/schemas/user.schema';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsEnum, IsEmpty } from 'class-validator';
import { Category } from "../schemas/restaurant.schema";

export class CreateRestaurantDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({},{ message: 'Debe ingresar un email válido' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('US', {
    message: 'EL número debe ser válido'
  })
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Por favor escribir una categoría correcta' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot provide the user ID.' })
  readonly user: User

}