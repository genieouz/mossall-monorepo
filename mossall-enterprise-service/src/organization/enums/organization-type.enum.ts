import { registerEnumType } from "@nestjs/graphql";

export enum OrganizationType {
    FINANCIAL = 'FINANCIAL',
    DEFAULT = 'DEFAULT'
}

registerEnumType(OrganizationType, { name: 'OrganizationType' });
