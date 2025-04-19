import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { DemandeService } from '~/demande/services/demande.service';
import { UserService } from './user.service';

@Controller('collaborator')
export class UserController {
  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
  ) {}

  @Public()
  @Get(':id/balance')
  async getCollaboratorBalance(@Param('id') userId: string) {
    const user = await this.userService.findById(userId);
    return this.demandeService.getBalance(user);
  }
}
