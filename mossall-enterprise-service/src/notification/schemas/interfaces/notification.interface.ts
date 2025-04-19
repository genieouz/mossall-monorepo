import { Document } from 'mongoose';
import { IUser } from '~/users/schemas/interfaces/user.interface';

export interface INotification extends Document {
    title: string;
    content: string;
    date: Date;
    author: IUser;
    organization: string;
}
