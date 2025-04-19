import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { User } from './dto/user.entity';
import { IUser } from './schemas/interfaces/user.interface';
export declare class UserService extends AbstractService<IUser> {
    private httpService;
    constructor(model: Model<IUser>, httpService: HttpService);
    findById(_id: string): Promise<IUser>;
    createAdmin(payload: User, password: string): Promise<void>;
    createCollaborator(payload: User, password: string): Promise<void>;
    createUser(payload: User): Promise<void>;
}
