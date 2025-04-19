import { Document } from 'mongoose';
export interface ICategorySociopro extends Document {
    title: string;
    description: string;
    activated: boolean;
    activatedAt: Date;
    organizationId: string;
    addedBy?: string;
}
