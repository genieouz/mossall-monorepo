import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import {
  DemandeMetric,
  DemandeMetricFilter,
} from '../dto/demande-metrics.entity';
import { Demande } from '../dto/demande.entity';
import { DemandeInput } from '../dto/demande.input';
import { DemandeUpdateInput } from '../dto/demande.update.input';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
import { AuthGuard } from '~/auth/auth.guard';
import { WaveFees } from '../demande.constant';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { AmountUnit, DurationUnit } from '~/commons/enum';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
import { ObjectId } from 'bson';
import { EventService } from '~/event/services/event.service';
import { ServiceService } from '~/service/services/service.service';
import { IEvent } from '~/event/schemas/interfaces/event.interface';

@UseGuards(AuthGuard)
@Resolver()
export class DemandeResolver {
  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
    private organisationServiceService: OrganisationServiceService,
    private categorySocioproServiceService: CategorySocioproServiceService,
    private eventService: EventService,
    private serviceService: ServiceService,
  ) {}

  @Mutation((returns) => Demande)
  async addDemande(
    @Args({ name: 'demandeInput', type: () => DemandeInput })
    demandeInput: IDemande,
    @Args({ name: 'organizationServiceId', type: () => ID })
    organizationServiceId: string,
    @Args({ name: 'eventId', type: () => ID, nullable: true }) eventId: string,
    @CurrentUser() currentUser: any,
  ): Promise<IDemande> {
    const organisationService =
      await this.organisationServiceService.findOneByIdOrFail(
        organizationServiceId,
      );
    let event: IEvent = null;

    if (eventId) event = await this.eventService.findOneById(eventId);

    const categorySocioproService =
      await this.categorySocioproServiceService.findOne({
        categorySocioproId: currentUser.categorySocioPro,
        organisationServiceId: new ObjectId(organizationServiceId),
        eventId: eventId ? new ObjectId(eventId) : null,
      });

    const service = await this.serviceService.findOneByIdOrFail(
      organisationService.serviceId,
    );

    console.log('service', service);

    // return;
    if (!categorySocioproService)
      // throw new BadRequestException(
      //   "Catégorie Socio Pro n'est pas défini pour ce service",
      // );
      console.log("Catégorie Socio Pro n'est pas défini pour ce service");

    if (service?.identifier == 'avance_event') {
      event = await this.eventService.findOneById(eventId);

      if (!event) throw new BadRequestException("L'évènement n'existe pas");

      console.log('event', event);

      if (event && event.activated === false)
        throw new BadRequestException("L'évènement n'est pas activé");

      if (event && event.startDate > new Date())
        throw new BadRequestException(
          "L'évènement n'est pas encore disponible",
        );

      if (event && event.endDate < new Date())
        throw new BadRequestException("L'évènement est terminé");
    }

    if (
      !organisationService.activated &&
      service?.identifier !== 'avance_event'
    ) {
      throw new BadRequestException('Service non activé');
    }

    if (service?.identifier !== 'avance_event') {
      if (organisationService.amountUnit === AmountUnit.Fixed) {
        if (demandeInput.amount > organisationService.amount) {
          throw new BadRequestException(
            `[Paramètre Généraux] : Le montant est supérieur au montant autorisé (${organisationService.amount} FCFA)`,
          );
        }
      } else if (organisationService.amountUnit === AmountUnit.Percentage) {
        const amount = (currentUser.salary * organisationService.amount) / 100;

        if (demandeInput.amount > amount) {
          throw new BadRequestException(
            `[Paramètre Généraux] Le montant est supérieur au montant autorisé (${amount} FCFA)`,
          );
        }
      }
      if (demandeInput.refundDuration > organisationService.refundDuration) {
        throw new BadRequestException(
          `[Paramètre Généraux] La durée de remboursement est supérieur à la durée autorisée (${organisationService.refundDuration} mois)`,
        );
      }
    }

    // saytou categorie socio param
    if (categorySocioproService) {
      if (!categorySocioproService?.activated) {
        throw new BadRequestException('Categorie Socio Pro non activé');
      }

      if (categorySocioproService.amountUnit === AmountUnit.Fixed) {
        if (demandeInput.amount > categorySocioproService.amount) {
          throw new BadRequestException(
            `[Categorie Socio Pro] : Le montant est supérieur au montant autorisé (${categorySocioproService.amount} FCFA)`,
          );
        }
      } else if (categorySocioproService.amountUnit === AmountUnit.Percentage) {
        const amount =
          (currentUser.salary * categorySocioproService.amount) / 100;

        if (demandeInput.amount > amount) {
          throw new BadRequestException(
            `[Categorie Socio Pro] Le montant est supérieur au montant autorisé (${amount} FCFA)`,
          );
        }
      }

      if (
        demandeInput.refundDuration > categorySocioproService.refundDuration
      ) {
        throw new BadRequestException(
          `[Categorie Socio Pro] La durée de remboursement est supérieur à la durée autorisée (${categorySocioproService.refundDuration} mois)`,
        );
      }
    }

    console.log('event', event);
    console.log('categorySocioproService', categorySocioproService);
    console.log('organisationService', organisationService);

    if (event && !categorySocioproService) {
      console.log('event check');

      if (event.amountUnit === AmountUnit.Fixed) {
        if (demandeInput.amount > event.amount) {
          throw new BadRequestException(
            `[Event] : Le montant est supérieur au montant autorisé (${event.amount} FCFA)`,
          );
        }
      } else if (event.amountUnit === AmountUnit.Percentage) {
        const amount = (currentUser.salary * event.amount) / 100;

        if (demandeInput.amount > amount) {
          throw new BadRequestException(
            `[Event] Le montant est supérieur au montant autorisé (${amount} FCFA)`,
          );
        }
      }

      if (demandeInput.refundDuration > event.refundDuration) {
        throw new BadRequestException(
          `[Event] La durée de remboursement est supérieur à la durée autorisée (${event.refundDuration} mois)`,
        );
      }
    }

    return this.demandeService.create(
      demandeInput,
      currentUser,
      organizationServiceId,
      eventId,
    );
  }

  @Mutation((returns) => Boolean)
  async updateDemande(
    @Args({ name: 'demandeInput', type: () => DemandeUpdateInput })
    demandeInput: IDemande,
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<boolean> {
    return this.demandeService.update(demandeId, demandeInput, currentUser);
  }

  @Mutation((returns) => Boolean)
  async cancelDemande(
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<boolean> {
    return this.demandeService.cancel(demandeId, currentUser);
  }

  @Query((returns) => [DemandeMetric])
  async fetchMyDemandesMetrics(
    @Args({ name: 'metricsFilter', type: () => DemandeMetricFilter })
    metricsFilter: DemandeMetricFilter = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentUser() currentUser: IUser,
  ): Promise<DemandeMetric[]> {
    return this.demandeService.getMyDemandesMetrics(
      metricsFilter,
      currentUser._id,
    );
  }

  @Query((returns) => Float)
  async checkMyDemandeFees(
    @Args({ name: 'demandeAmount', type: () => Float }) amount: number,
    @CurrentUser() currentUser: IUser,
  ): Promise<number> {
    return amount * WaveFees;
  }

  @Query((returns) => [Demande])
  fetchMyDemandes(@CurrentUser('_id') currentUser: IUser): Promise<IDemande[]> {
    return this.demandeService.findMany({ owner: currentUser._id });
  }

  @Query((returns) => Demande)
  fetchMyDemande(
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<IDemande> {
    return this.demandeService.findOneOrFail({
      _id: demandeId,
      owner: currentUser._id,
    });
  }
}
