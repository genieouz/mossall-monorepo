import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
import { InviteCollaboratorInput } from './dto/invite-collaborator.input';
import { UpdateCollaboratorInput } from './dto/update-collaborator.input';
import { AuthService } from '~/auth/auth.service';
export declare class CollaboratorsService {
    private eventEmitter;
    private readonly userSerive;
    private authService;
    constructor(eventEmitter: EventEmitter2, userSerive: UserService, authService: AuthService);
    inviteCollaborator(payload: InviteCollaboratorInput, categorySocioProId: string, currentUserId: string): Promise<boolean>;
    inviteAdmin(payload: InviteCollaboratorInput, currentUserId: string): Promise<boolean>;
    updateCollaborator(payload: UpdateCollaboratorInput, collaboratorId: string, categorySocioProId: string): Promise<boolean>;
}
