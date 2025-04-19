
import { ConflictException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { generatePassword } from '~/commons/utils';
import { UserService } from '~/users/user.service';
import { InviteCollaboratorInput } from './dto/invite-collaborator.input';
import { UpdateCollaboratorInput } from './dto/update-collaborator.input';
import { ObjectId } from 'bson';
import { AuthService } from '~/auth/auth.service';

@Injectable()
export class CollaboratorsService {
    constructor(
        private eventEmitter: EventEmitter2,
        private readonly userSerive: UserService,
        private authService: AuthService
      ) {
      }
    
      async inviteCollaborator(payload: InviteCollaboratorInput, currentUserId: string) {
        const password = generatePassword(12, { numbers: true, uppercase: true, symbols: true });
        // const password = "1234";
        const currentUser = await this.userSerive.findOneById(currentUserId);
        const found = await this.userSerive.findOne({ 
          $or: [
            { email: payload.email }, 
            { uniqueIdentifier: payload.uniqueIdentifier }, 
            { phoneNumber: payload.phoneNumber },
            { bankAccountNumber: payload.bankAccountNumber }
          ] 
          });
          if(found) {
            throw new ConflictException("Email ou Téléphone ou Identifiant ou compte bancaire déjà utilisé");
          }
        const tmpUser = await this.userSerive.insertOne({ ...payload, id: new ObjectId(), organization: currentUser.organization, role: 'COLLABORATOR', password: this.authService.hashPassword(password) } as any);
        this.eventEmitter.emit(
          'collaborator.invite',
          { email: payload.email, password })
        return true;

      }

      async inviteAdmin(payload: InviteCollaboratorInput, currentUserId: string) {
        const password = generatePassword(12, { numbers: true, uppercase: true, symbols: true });
        const hashedPassword = this.authService.hashPassword(password);
        const currentUser = await this.userSerive.getUserById(currentUserId);
        const found = await this.userSerive.findOne({ 
          $or: [
            { email: payload.email }, 
            { uniqueIdentifier: payload.uniqueIdentifier }, 
            { phoneNumber: payload.phoneNumber },
            { bankAccountNumber: payload.bankAccountNumber }
          ] 
          });
          if(found) {
            throw new ConflictException("Email ou Téléphone ou Identifiant ou compte bancaire déjà utilisé");
          }
        const tmpUser = await this.userSerive.insertOne({ ...payload, id: new ObjectId(), organization: currentUser.organization, role: 'ADMIN', password: hashedPassword } as any);
        this.eventEmitter.emit(
          'organization.created',
          { email: payload.email, password })
          return true;
      }

      async updateCollaborator(payload: UpdateCollaboratorInput, collaboratorId: string) {
        return this.userSerive.updateOneById(collaboratorId, payload);
      }
}
