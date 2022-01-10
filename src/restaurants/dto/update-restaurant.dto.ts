import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsEnum, IsEmpty } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from "../schemas/restaurant.schema";

export class UpdateRestaurantDto {

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEmail({},{ message: 'Debe ingresar un email válido' })
  readonly email: string;

  @IsOptional()
  @IsPhoneNumber('US', {
    message: 'EL número debe ser válido'
  })
  readonly phoneNo: number;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsEnum(Category, { message: 'Por favor escribir una categoría correcta' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot provide the user ID.' })
  readonly user: User
}