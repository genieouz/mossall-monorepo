import { registerEnumType } from '@nestjs/graphql';

export enum AmountUnit {
  Fixed = 'Fixed',
  Percentage = 'Percentage',
}

export enum DurationUnit {
  Day = 'day',
  Month = 'month',
}

registerEnumType(AmountUnit, {
  name: 'AmountUnit',
});

registerEnumType(DurationUnit, {
  name: 'DurationUnit',
});
