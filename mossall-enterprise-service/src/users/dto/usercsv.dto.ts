import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserCSVDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  birthDate: string | Date;

  @IsNotEmpty()
  @Transform(({ value }) => String(value)) // Conversion de number en string
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @Transform(({ value }) => String(value)) // Conversion de number en string
  @IsString()
  uniqueIdentifier: number;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  organization: any;

  @IsOptional()
  @IsString()
  realm: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  // @IsNotEmpty()
  // @IsString()
  // wizallAccountNumber: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  bankAccountNumber: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // favoriteWallet: string;

  @IsOptional()
  @IsBoolean()
  enableEmailNotification: string;
}
