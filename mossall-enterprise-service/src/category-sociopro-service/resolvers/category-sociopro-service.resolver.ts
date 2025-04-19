import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import {
  CategorySocioproService as CategorySocioproServiceEntity,
  PaginatedCategorySocioproServiceResult,
} from '../dto/category-sociopro-service.entity';
import { CategorySocioproServiceInput } from '../dto/category-sociopro-service.input';
import { CategorySocioproServiceUpdateInput } from '../dto/category-sociopro-service.update.input';
import { ICategorySocioproService } from '../schemas/interfaces/category-sociopro-service.interface';
import { CategorySocioproServiceService } from '../services/category-sociopro-service.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { EventService } from '~/event/services/event.service';

@UseGuards(AuthGuard)
@Resolver()
export class CategorySocioproServiceResolver {
  constructor(
    private categorySocioproServiceService: CategorySocioproServiceService,
    private categorySocioproService: CategorySocioproService,
    private organisationServiceService: OrganisationServiceService,
    private eventService: EventService,
  ) {}

  @Mutation((returns) => CategorySocioproServiceEntity)
  async createCategorySocioproService(
    @Args({
      name: 'categorySocioproServiceInput',
      type: () => CategorySocioproServiceInput,
    })
    categorySocioproServiceInput: ICategorySocioproService,
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
    @Args({ name: 'eventId', type: () => ID, nullable: true })
    eventId: string,
  ): Promise<ICategorySocioproService> {
    await this.organisationServiceService.findOneByIdOrFail(
      organisationServiceId,
    );
    await this.categorySocioproService.findOneByIdOrFail(categorySocioproId);
    await this.organisationServiceService.findOneByIdOrFail(
      organisationServiceId,
    );
    if (eventId) {
      await this.eventService.findOneByIdOrFail(eventId);
      categorySocioproServiceInput.eventId = eventId;
    }

    categorySocioproServiceInput.categorySocioproId = categorySocioproId;
    categorySocioproServiceInput.organisationServiceId = organisationServiceId;

    return this.categorySocioproServiceService.insertOne(
      categorySocioproServiceInput,
    );
  }

  @Mutation((returns) => Boolean)
  updateCategorySocioproService(
    @Args({
      name: 'categorySocioproServiceInput',
      type: () => CategorySocioproServiceUpdateInput,
    })
    categorySocioproServiceInput: ICategorySocioproService,
    @Args({ name: 'categorySocioproServiceId', type: () => ID })
    categorySocioproServiceId: string,
  ): Promise<boolean> {
    return this.categorySocioproServiceService.updateOneById(
      categorySocioproServiceId,
      categorySocioproServiceInput,
    );
  }

  @Query((returns) => PaginatedCategorySocioproServiceResult)
  fetchCategorySocioproServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<IPaginatedResult<ICategorySocioproService>> {
    return this.categorySocioproServiceService.findManyAndPaginate(
      {},
      queryConfig,
    );
  }

  @Query((returns) => [CategorySocioproServiceEntity])
  fetchAllCategorySocioproServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<ICategorySocioproService[]> {
    return this.categorySocioproServiceService.findMany(
      {
        organisationServiceId,
      },
      queryConfig,
    );
  }

  @Query((returns) => CategorySocioproServiceEntity)
  fetchCategorySocioproService(
    @Args({ name: 'categorySocioproServiceId', type: () => ID })
    categorySocioproServiceId: string,
  ): Promise<ICategorySocioproService> {
    let _id: any = categorySocioproServiceId;
    return this.categorySocioproServiceService.findOneOrFail({ _id });
  }

  @Mutation((returns) => Boolean)
  deleteCategorySocioproService(
    @Args({ name: 'categorySocioproServiceId', type: () => ID })
    categorySocioproServiceId: string,
  ): Promise<boolean> {
    let _id: any = categorySocioproServiceId;
    return this.categorySocioproServiceService.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  activateCategorySocioproService(
    @Args({ name: 'categorySocioproServiceId', type: () => ID })
    categorySocioproServiceId: string,
  ): Promise<boolean> {
    let _id: any = categorySocioproServiceId;
    return this.categorySocioproServiceService.updateOne(
      { _id },
      { activated: true, activatedAt: new Date() },
    );
  }

  @Mutation((returns) => Boolean)
  deactivateCategorySocioproService(
    @Args({ name: 'categorySocioproServiceId', type: () => ID })
    categorySocioproServiceId: string,
  ): Promise<boolean> {
    let _id: any = categorySocioproServiceId;
    return this.categorySocioproServiceService.updateOne(
      { _id },
      { activated: false, activatedAt: null },
    );
  }
}
