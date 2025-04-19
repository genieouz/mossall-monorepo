import { Session } from './dto/session.type';
import { UserService } from '~/users/user.service';
export declare class SessionPropertyResolver {
    private userService;
    constructor(userService: UserService);
    user(session: Session): Promise<import("../users/schemas/interfaces/user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
