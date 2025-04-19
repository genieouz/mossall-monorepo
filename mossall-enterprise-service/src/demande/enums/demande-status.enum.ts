import { registerEnumType } from "@nestjs/graphql";

export enum DemandeStatus {
    VALIDATED = 'VALIDATED',
    PAYED = 'PAYED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING',
    IN_PROCESS = 'IN_PROCESS',
    CANCELLED = 'CANCELLED'
}

registerEnumType(DemandeStatus, { name: 'DemandeStatus' });
