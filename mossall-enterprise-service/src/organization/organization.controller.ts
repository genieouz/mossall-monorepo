import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { OrganizationService } from './services/organization.service';

@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService) {}

    @Public()
    @Get(':id')
    async fetchOrganizationById(
        @Param('id') id: string
    ) {
        console.log({id})
        const result = await this.organizationService.findOneByIdOrFail(id);
        return { ...result.toObject(), id: result._id }
    }
}
