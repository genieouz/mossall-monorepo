import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
import { IUser } from "~/users/schemas/interfaces/user.interface";
export declare class Notification extends Timestamps {
    entityId: string;
    title: string;
    content: string;
    by: IUser;
}
