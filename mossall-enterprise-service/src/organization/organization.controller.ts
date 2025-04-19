import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { OrganizationService } from './services/organization.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '~/auth/constant';
import { Organization } from './dto/organization.entity';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @ApiOperation({ summary: 'get one organization' })
  @ApiResponse({
    status: 200,
    description: 'get organization by id',
    type: Organization,
  })
  @Public()
  @Get(':id')
  async fetchOrganizationById(@Param('id') id: string) {
    console.log({ id });
    const result = await this.organizationService.findOneByIdOrFail(id);
    return { ...result.toObject(), id: result._id };
  }
}
