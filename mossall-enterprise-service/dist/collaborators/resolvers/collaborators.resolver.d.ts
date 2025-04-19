import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { CollaboratorsService } from '../collaborators.service';
import { InviteCollaboratorInput } from '../dto/invite-collaborator.input';
import { UpdateCollaboratorInput } from '../dto/update-collaborator.input';
export declare class CollaboratorResolver {
    private collaboratorService;
    private userService;
    constructor(collaboratorService: CollaboratorsService, userService: UserService);
    inviteCollaborator(collaborator: InviteCollaboratorInput, categorySocioProId: string, user: IUser): Promise<boolean>;
    inviteAdmin(collaborator: InviteCollaboratorInput, user: IUser): Promise<boolean>;
    updateCollaborator(collaborator: UpdateCollaboratorInput, collaboratorId: string, categorySocioProId: string): Promise<boolean>;
    fetchOrganizationCollaborator(collaboratorId: string): Promise<IUser>;
}
