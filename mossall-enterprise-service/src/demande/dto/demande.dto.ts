import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class DemandeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  @IsString()
  uniqueIdentifier: string;
  @Transform(({ value }) => {
    console.log('value', value);
    if (typeof value === 'string') {
      return value.toLowerCase() === 'oui'
        ? true
        : value.toLowerCase() === 'non'
        ? false
        : value;
    }
    return value;
  })
  @IsNotEmpty()
  @IsBoolean()
  versed: boolean;

  organization: string;
  @IsNotEmpty()
  @IsString()
  service: string;
}
