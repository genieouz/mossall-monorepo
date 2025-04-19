import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    SUPER_ADMIN_ORG = 'SUPER_ADMIN_ORG',
    COLLABORATOR = 'COLLABORATOR'
}

registerEnumType(UserRole, { name: 'UserRole', description: "Possible user role" });