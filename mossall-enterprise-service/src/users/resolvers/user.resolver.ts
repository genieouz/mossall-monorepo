import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import {
  KEYCLOAK_COLLABORATOR_REALM,
  KEYCLOAK_ENTERPRISE_REALM,
} from '~/config/env';
import { User } from '../dto/user.entity';
import { UpdateMyAdminProfileInput } from '../dto/user.input';
import { IUser } from '../schemas/interfaces/user.interface';
import { UserService } from '../user.service';
import { ObjectId } from 'bson';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { AuthGuard } from '~/auth/auth.guard';

// import { GraphQLUpload } from 'graphql-upload/GraphQLUploadExpress';

@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => Boolean)
  updateMyAdminPassword(
    @Args({ name: 'oldPassword', type: () => String }) oldPassword: string,
    @Args({ name: 'newPassword', type: () => String }) newPassword: string,
    @CurrentUser() user: IUser,
  ) {
    return this.userService.updateMyAdminPassword(
      user,
      oldPassword,
      newPassword,
    );
  }

  @Mutation((returns) => Boolean)
  async lockUser(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @CurrentUser() user: IUser,
  ) {
    const admin = await this.userService.findByIdOrFail(user._id);
    return this.userService.updateOne(
      { _id: userId, organization: admin.organization },
      { blocked: true },
    );
  }

  @Mutation((returns) => Boolean)
  async unlockUser(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @CurrentUser() user: IUser,
  ) {
    const admin = await this.userService.findByIdOrFail(user._id);
    return this.userService.updateOne(
      { _id: userId, organization: admin.organization },
      { blocked: false },
    );
  }

  @Mutation((returns) => Boolean)
  async enableEmailNotification(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @CurrentOrganization() org: IOrganization,
  ) {
    return this.userService.updateOne(
      { _id: userId, organization: org.id },
      { enableEmailNotification: true },
    );
  }

  @Mutation((returns) => Boolean)
  async disableEmailNotification(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @CurrentOrganization() org: IOrganization,
  ) {
    return this.userService.updateOne(
      { _id: userId, organization: org.id },
      { enableEmailNotification: false },
    );
  }

  @Query((returns) => User)
  fetchCurrentAdmin(@CurrentUser() user: IUser) {
    return this.userService.findOneOrFail({ email: user.email });
  }

  @Mutation((returns) => Boolean)
  updateMyAdminProfile(
    @Args({ name: 'userInput', type: () => UpdateMyAdminProfileInput })
    userInput: UpdateMyAdminProfileInput,
    @CurrentUser() user: IUser,
  ) {
    return this.userService.updateMyProfile(user._id, userInput);
  }

  @Query((returns) => Boolean)
  async phoneNumberExists(
    @Args({ name: 'phoneNumber', type: () => String }) phoneNumber: string,
    @Args({ name: 'userId', type: () => String, nullable: true })
    userId: string,
    @Args({ name: 'isAdmin', type: () => Boolean, nullable: true })
    isAdmin: boolean,
    @CurrentUser() user: IUser,
  ) {
    // if(!phoneNumber) {
    //     return false;
    // }
    // let realm = KEYCLOAK_COLLABORATOR_REALM;
    // if(isAdmin) {
    //     realm = KEYCLOAK_ENTERPRISE_REALM;
    // }
    // const cu = await this.userService.findById(user._id);
    // const found = await this.userService.findOne({ organization: cu.organization, phoneNumber, realm });
    // return Boolean(found);
    const cu = await this.userService.findById(user._id);
    return this.userService.checkExistingFieldValue(
      cu.organization,
      'phoneNumber',
      phoneNumber,
      isAdmin,
      userId,
    );
  }

  @Query((returns) => Boolean)
  async uniqueIdentifierExists(
    @Args({ name: 'uniqueIdentifier', type: () => String })
    uniqueIdentifier: string,
    @Args({ name: 'userId', type: () => String, nullable: true })
    userId: string,
    @Args({ name: 'isAdmin', type: () => Boolean, nullable: true })
    isAdmin: boolean,
    @CurrentUser() user: IUser,
  ) {
    // if(!uniqueIdentifier) {
    //     return false;
    // }
    // let realm = KEYCLOAK_COLLABORATOR_REALM;
    // if(isAdmin) {
    //     realm = KEYCLOAK_ENTERPRISE_REALM;
    // }
    // const cu = await this.userService.findById(user._id);
    // const found = await this.userService.findOne({ organization: cu.organization, uniqueIdentifier, realm });
    // return Boolean(found);

    const cu = await this.userService.findById(user._id);
    return this.userService.checkExistingFieldValue(
      cu.organization,
      'uniqueIdentifier',
      uniqueIdentifier,
      isAdmin,
      userId,
    );
  }

  @Query((returns) => Boolean)
  async bankAccountNumberExists(
    @Args({ name: 'bankAccountNumber', type: () => String })
    bankAccountNumber: string,
    @Args({ name: 'userId', type: () => String, nullable: true })
    userId: string,
    @Args({ name: 'isAdmin', type: () => Boolean, nullable: true })
    isAdmin: boolean,
    @CurrentUser() user: IUser,
  ) {
    // if(!bankAccountNumber) {
    //     return false;
    // }
    // let realm = KEYCLOAK_COLLABORATOR_REALM;
    // if(isAdmin) {
    //     realm = KEYCLOAK_ENTERPRISE_REALM;
    // }
    // const cu = await this.userService.findById(user._id);
    // const found = await this.userService.findOne({ organization: cu.organization, bankAccountNumber, realm });
    // return Boolean(found);

    const cu = await this.userService.findById(user._id);
    return this.userService.checkExistingFieldValue(
      cu.organization,
      'bankAccountNumber',
      bankAccountNumber,
      isAdmin,
      userId,
    );
  }

  @Query((returns) => Boolean)
  async emailExists(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'userId', type: () => String, nullable: true })
    userId: string,
    @Args({ name: 'isAdmin', type: () => Boolean, nullable: true })
    isAdmin: boolean,
    @CurrentUser() user: IUser,
  ) {
    // if(!email) {
    //     return false;
    // }
    // let realm = KEYCLOAK_COLLABORATOR_REALM;
    // if(isAdmin) {
    //     realm = KEYCLOAK_ENTERPRISE_REALM;
    // }
    // const cu = await this.userService.findById(user._id);
    // const found = await this.userService.findOne({ email, realm });
    // return Boolean(found);
    // const cu = await this.userService.findById(user._id);
    return this.userService.checkExistingFieldValue(
      null,
      'email',
      email,
      isAdmin,
      userId,
    );
  }

  @Mutation((returns) => Boolean)
  async upladFile(
    @Args({ name: 'file', type: () => String }) file: String,
    @Args({ name: 'destination', type: () => String }) destination: String,
  ) {
    return true;
  }
}
