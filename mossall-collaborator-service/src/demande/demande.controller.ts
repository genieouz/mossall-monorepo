import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { getMonthNameFromIndex } from '~/commons/time';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DemandesMetricsInput } from './dto/demandes-metrics.input';
import { DemandeStatus } from './enums/demande-status.enum';
import { DemandeService } from './services/demande.service';

@Controller('demande')
export class DemandeController {
    constructor(
        private demandeService: DemandeService
    ) {}

    @Get('user/:userId')
    @Public()
    fetchUserDemandes(@Param('userId') userId: string) {
        return this.demandeService.findMany({ owner: userId });
    }

    @Post('organization/:organizationId')
    @Public()
    fetchOrganizationDemandes(
        @Param('organizationId') organizationId: string,
        @Body('metricsInput') metricsInput: DemandesMetricsInput
    ) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        console.log({ $gte: new Date(metricsInput.startDate), $lt: endDate })
        return this.demandeService.findMany({ 
            organization: organizationId,
            createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate }
        });
    }

    @Post('validate')
    @Public()
    validateDemande(
        @Body('demandeId') demandeId: string,
        @Body('admin') admin: IUser
    ) {
        // return this.demandeService.validate(demandeId, admin);
    }

    @Post('paye')
    @Public()
    payeDemande(
        @Body('demandeId') demandeId: string,
        @Body('admin') admin: IUser
    ) {
        return this.demandeService.paye(demandeId, admin);
    }

    // @Post('cancel')
    // @Public()
    // cancelDemande(
    //     @Body('demandeId') demandeId: string,
    //     @Body('admin') admin: IUser
    // ) {
    //     return this.demandeService.cancelByAdmin(demandeId, admin);
    // }

    // @Post('reject')
    // @Public()
    // rejectDemande(
    //     @Body('demandeId') demandeId: string,
    //     @Body('rejectedReason') rejectedReason: string,
    //     @Body('admin') admin: IUser
    // ) {
    //     return this.demandeService.rejectByAdmin(demandeId, admin, rejectedReason);
    // }

    @Post('metrics')
    @Public()
    async fetchDemandesMetrics(
        @Body('admin') admin: IUser,
        @Body('metricsInput') metricsInput: DemandesMetricsInput
    ) { 
        return this.demandeService.getDemandesMetrics(admin, metricsInput);
    }
}
