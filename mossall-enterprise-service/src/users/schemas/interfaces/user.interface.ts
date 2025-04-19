import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EnumState } from '~/commons/interfaces/state.interface';

export interface IUser extends Document {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  phoneNumber?: string;
  address?: string;
  position?: string;
  uniqueIdentifier?: string;
  salary?: number;
  balance?: number;
  wizallAccountNumber?: string;
  bankAccountNumber?: string;
  totalDemandeAmount: number;
  role?: string;
  realm?: string;
  blocked?: boolean;
  password?: string;
  status: EnumState;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  categorySocioPro?: string;
}

export class UploadUserResponse {
  @ApiProperty({ example: 12 })
  totalErrors: number;
  @ApiProperty({ example: 0 })
  error: number;

  @ApiProperty({ example: ['email is required'] })
  errors: string[];
  @ApiProperty({ example: 12 })
  totalSuccess: number;

  @ApiProperty({
    example: [
      {
        error: true,
        message: 'email is required',
        errorsArray: ['email is required'],
      },
    ],
  })
  errorsArray: {
    error: boolean;
    message: string;
    errorsArray: string[];
  }[];

  @ApiProperty({
    example: [
      {
        createdAt: '2022-06-02T16:41:35.000Z',
        updatedAt: '2022-06-02T16:41:35.000Z',
        id: '62a7c7c8d9e7b4a5f0b6c7d8',
        email: 'qG0X6@example.com',
        balance: 0,
        totalDemandeAmount: 0,
        error: true,
        errorsArray: ['email is required'],
      },
    ],
  })
  dataRows: Partial<IUser>;
}
