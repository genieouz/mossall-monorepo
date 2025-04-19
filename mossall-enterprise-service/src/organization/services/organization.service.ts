import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '~/auth/auth.service';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { generatePassword } from '~/commons/utils';
import { ADMIN_FRONT_URL, KEYCLOAK_ENTERPRISE_REALM } from '~/config/env';
import { OrganizationInput } from '../dto/organization.input';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { organizationModelName } from '../schemas/organization.model-name';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { OrganizationType } from '../enums/organization-type.enum';
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { ObjectId } from 'bson';

@Injectable()
export class OrganizationService extends AbstractService<IOrganization> {
  constructor(
    @InjectModel(organizationModelName) private model: Model<IOrganization>,
    private eventEmitter: EventEmitter2,
    private readonly userSerive: UserService,
    private authService: AuthService
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    super(model);
  }

  // async findOneById(id: string) {
  //   const key = `organization_${id}`;
  //   let org = await this.cacheManager.get(key) as IOrganization;
  //   if(org) {
  //     console.log({org})
  //     return org;
  //   }
  //   org = await this.model.findById(id);
  //   await this.cacheManager.set(key, org);
  //   return org as any;
  // }

  async createOrganization(payload: OrganizationInput, type=OrganizationType.DEFAULT) {
    const realm = KEYCLOAK_ENTERPRISE_REALM;
    const password = generatePassword(12, { numbers: true, uppercase: true, symbols: true });
    // const password = "1234";
    const newUserData = { 
      email: payload.rootEmail,
      firstName: payload.rootFirstname,
      lastName: payload.rootLastname
    };
    // const rootUserCreation = await this.userSerive.createKeycloakAdmin({ 
    //   email: payload.rootEmail,
    //   firstName: payload.rootFirstname,
    //   lastName: payload.rootLastname
    // } as IUser, password);
    // if(!rootUserCreation.success) {
    //   throw new ConflictException("Email déjà utilisé");
    // }
    // const rootUser = await this.userSerive.getKeycloakUserByEmail(payload.rootEmail, realm);
    const hasedPassword = this.authService.hashPassword(password)
    const rootUser = await this.userSerive.insertOne({ 
      ...newUserData, 
      password: hasedPassword,
      organization: new ObjectId(), 
      role: type === OrganizationType.FINANCIAL ? 'SUPER_ADMIN_FINANCE' : 'SUPER_ADMIN_ORG', 
      realm 
    } as any)
    
    const organization = await this.insertOne({ name: payload.name, rootUser: rootUser.id, rootEmail: payload.rootEmail } as IOrganization);
    await this.userSerive.updateOneById(rootUser.id, { organization: organization.id })
    this.eventEmitter.emit(
      'organization.created',
      { email: payload.rootEmail, password, frontUrl: ADMIN_FRONT_URL })
    return organization;
  }
}

