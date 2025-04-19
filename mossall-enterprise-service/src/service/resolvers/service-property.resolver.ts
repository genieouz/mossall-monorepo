import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Service } from '../dto/service.entity';
import { IService } from '../schemas/interfaces/service.interface';

@Resolver((of) => Service)
export class ServicePropertyResolver {
  constructor() {}
}
