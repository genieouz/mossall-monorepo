import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CategorySociopro } from '../dto/category-sociopro.entity';
import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { Organization } from '~/organization/dto/organization.entity';

@Resolver((of) => CategorySociopro)
export class CategorySocioproPropertyResolver {
  constructor(private readonly organisationService: OrganizationService) {}

  @ResolveField((returns) => Organization)
  organisation(@Parent() categorySociopro: ICategorySociopro) {
    return this.organisationService.findOneById(
      categorySociopro.organizationId,
    );
  }
}
