import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import {
  CategorySociopro,
  PaginatedCategorySocioproResult,
} from '../dto/category-sociopro.entity';
import { CategorySocioproInput } from '../dto/category-sociopro.input';
import { CategorySocioproUpdateInput } from '../dto/category-sociopro.update.input';
import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
import { CategorySocioproService } from '../services/category-sociopro.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { OrganizationService } from '~/organization/services/organization.service';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { UserService } from '~/users/user.service';
import { ObjectId } from 'bson';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';

@UseGuards(AuthGuard)
@Resolver()
export class CategorySocioproResolver {
  constructor(
    private categorySocioproService: CategorySocioproService,
    private categorySocioproServiceService: CategorySocioproServiceService,
    private organizationService: OrganizationService,
    private collaboratorService: UserService,
  ) {}

  @Mutation((returns) => CategorySociopro)
  async createCategorySociopro(
    @Args({ name: 'categorySocioproInput', type: () => CategorySocioproInput })
    categorySocioproInput: ICategorySociopro,
    @Args({ name: 'organizationId', type: () => ID })
    organizationId: string,
  ): Promise<ICategorySociopro> {
    const organisation = await this.organizationService.findOneByIdOrFail(
      organizationId,
    );

    categorySocioproInput.organizationId = organizationId;

    return this.categorySocioproService.insertOne(categorySocioproInput);
  }

  @Mutation((returns) => Boolean)
  updateCategorySociopro(
    @Args({
      name: 'categorySocioproInput',
      type: () => CategorySocioproUpdateInput,
    })
    categorySocioproInput: ICategorySociopro,
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
  ): Promise<boolean> {
    return this.categorySocioproService.updateOneById(
      categorySocioproId,
      categorySocioproInput,
    );
  }

  @Query((returns) => PaginatedCategorySocioproResult)
  fetchCategorySociopros(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @CurrentUser() user: any,
  ): Promise<IPaginatedResult<ICategorySociopro>> {
    return this.categorySocioproService.findManyAndPaginate(
      {
        organizationId: user.organization,
      },
      queryConfig,
    );
  }

  @Query((returns) => [CategorySociopro])
  fetchAllCategorySociopros(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @CurrentUser() user: any,
  ): Promise<ICategorySociopro[]> {
    return this.categorySocioproService.findMany(
      {
        organizationId: user.organization,
      },
      queryConfig,
    );
  }

  @Query((returns) => CategorySociopro)
  fetchCategorySociopro(
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
  ): Promise<ICategorySociopro> {
    let _id: any = categorySocioproId;
    return this.categorySocioproService.findOneOrFail({ _id });
  }

  @Mutation((returns) => Boolean)
  async deleteCategorySociopro(
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
  ): Promise<boolean> {
    const categorySocioPro = new ObjectId(categorySocioproId);

    const isUseByCollaborator = await this.collaboratorService.findOne({
      categorySocioPro,
    });

    if (isUseByCollaborator)
      throw new Error(
        'Impossible de supprimer cette catégorie, elle est utilisée par un ou plusieurs collaborateurs',
      );

    const isUseByOrganisationService =
      await this.categorySocioproServiceService.findOne({
        categorySocioproId: categorySocioPro,
      });

    if (isUseByOrganisationService)
      throw new Error(
        'Impossible de supprimer cette catégorie, elle est utilisée par un ou plusieurs services',
      );

    let _id: any = categorySocioproId;
    return this.categorySocioproService.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  activateCategorySociopro(
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
    @Args({ name: 'activatedAt', type: () => Date, nullable: true })
    activatedAt: Date,
  ): Promise<boolean> {
    let _id: any = categorySocioproId;
    return this.categorySocioproService.updateOne(
      { _id },
      {
        activated: true,
        activatedAt: activatedAt || new Date(),
      },
    );
  }

  @Mutation((returns) => Boolean)
  deactivateCategorySociopro(
    @Args({ name: 'categorySocioproId', type: () => ID })
    categorySocioproId: string,
  ): Promise<boolean> {
    let _id: any = categorySocioproId;
    return this.categorySocioproService.updateOne(
      { _id },
      { activated: false, activatedAt: null },
    );
  }
}
