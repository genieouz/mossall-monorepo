import { IUser } from "~/users/schemas/interfaces/user.interface";
export interface INotification {
    entityId?: string;
    title: string;
    content: string;
    author: IUser;
    organization: string;
}
