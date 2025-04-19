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
  @IsNotEmpty({ message: 'Prénom est obligatoire' })
  @IsString({ message: 'Prénom doit être une chaine de caractères' })
  firstName: string;

  @IsString({ message: 'Prénom doit être une chaine de caractères' })
  @IsOptional()
  id: string;

  @IsNotEmpty({ message: 'Nom est obligatoire' })
  @IsString({ message: 'Nom doit être une chaine de caractères' })
  lastName: string;

  @IsNotEmpty({ message: 'Email est obligatoire' })
  @IsEmail({}, { message: 'Email doit être valide' })
  email: string;

  @IsNotEmpty({ message: 'Date de naissance est obligatoire' })
  @IsDate({ message: 'Date de naissance doit être une date' })
  birthDate: string | Date;

  @IsNotEmpty({ message: 'Téléphone est obligatoire' })
  @Transform(({ value }) => String(value)) // Conversion de number en string
  @IsString({ message: 'Téléphone doit être une chaine de caractères' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Adresse est obligatoire' })
  @Transform(({ value }) => String(value)) // Conversion de number en string
  @IsString({ message: 'Adresse doit être une chaine de caractères' })
  address: string;

  @IsNotEmpty({ message: 'Identifiant unique est obligatoire' })
  @Transform(({ value }) => String(value)) // Conversion de number en string
  @IsString({
    message: 'Identifiant unique doit être une chaine de caractères',
  })
  uniqueIdentifier: string;

  @IsNotEmpty({ message: 'Fonction est obligatoire' })
  @IsString({ message: 'Fonction doit être une chaine de caractères' })
  position: string;

  @IsOptional()
  organization: any;

  @IsOptional()
  @IsString()
  realm: string;

  @IsNotEmpty({ message: 'Salaire est obligatoire' })
  @Transform(({ value }) => (value ? Number(value) : value)) // Conversion de number en string
  @IsNumber({}, { message: 'Salaire doit être un nombre' })
  salary: number;

  // @IsNotEmpty()
  // @IsString()
  // wizallAccountNumber: string;

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

  @IsNotEmpty({ message: 'Catégorie socioprofessionnelle est obligatoire' })
  categorySocioPro: string;
}
