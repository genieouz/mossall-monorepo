import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '~/users/dto/user.entity';
import { UserService } from '~/users/user.service';
import { Demande } from '../dto/demande.entity';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IDemande } from '../schemas/interfaces/demande.interface';

@Resolver((of) => Demande)
export class DemandePropertyResolver {
  constructor(
    private userService: UserService,
    private organisationServiceService: OrganisationServiceService,
  ) {}

  @ResolveField((returns) => User)
  async collaborator(@Parent() demande: IDemande) {
    return this.userService.findOne({ _id: demande.owner });
  }

  @ResolveField((returns) => OrganisationService, { nullable: true })
  async organisationService(@Parent() demande: IDemande) {
    return this.organisationServiceService.findOneById(
      demande.organizationServiceId,
    );
  }
}
