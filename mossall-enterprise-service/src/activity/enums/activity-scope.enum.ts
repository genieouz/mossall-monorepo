import { registerEnumType } from "@nestjs/graphql";

export enum ActivityScope {
    demande = 'demande',
    authentification = 'authentification',
    collaborateur = 'collaborateur',
    organisation = 'organisation'
}

registerEnumType(ActivityScope, { name: 'ActivityScope', description: "Possible activities" });
