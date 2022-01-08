import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsEnum } from 'class-validator';
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
}