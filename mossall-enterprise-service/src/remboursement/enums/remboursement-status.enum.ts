import { registerEnumType } from '@nestjs/graphql';

export enum RemboursementStatus {
  PAYED = 'PAYED',
  PENDING = 'PENDING',
}

registerEnumType(RemboursementStatus, { name: 'RemboursementStatus' });
