import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom, map } from 'rxjs';
import { AuthService } from '~/auth/auth.service';
import { UpdateCollaboratorInput } from '~/collaborators/dto/update-collaborator.input';
import { AbstractService } from '~/commons/abstract/abstract.service';
import * as bcrypt from 'bcrypt';
import {
  KEYCLOAK_COLLABORATOR_REALM,
  KEYCLOAK_ENTERPRISE_CLIENT_ID,
  KEYCLOAK_ENTERPRISE_CLIENT_SECRET,
  KEYCLOAK_ENTERPRISE_REALM,
  KEYCLOAK_URL,
  USER_SERVICE_URL,
} from '~/config/env';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
import { UpdateMyAdminProfileInput } from './dto/user.input';
import { IUser } from './schemas/interfaces/user.interface';
import { userModelName } from './schemas/user.model-name';
import { UserRole } from './enums/user-role.enum';
import { decode } from 'base64-arraybuffer';
import { parse } from 'papaparse';
import { Buffer } from 'buffer';
import { normalizeQueryDataConfig } from '~/commons/utils';
import { PaginationInfo } from '~/commons/graphql/pagination';

@Injectable()
export class UserService extends AbstractService<IUser> {
  url = USER_SERVICE_URL;
  constructor(
    @InjectModel(userModelName) model: Model<IUser>,
    // private authService: AuthService,
    private httpService: HttpService,
  ) {
    super(model, ['firstName', 'lastName', 'email', 'uniqueIdentifier']);
  }

  findById(id: string): Promise<IUser> {
    return this.findOne({ _id: id });
  }

  async checkExistingFieldValue(
    organization: string,
    fieldName: string,
    fieldValue: string,
    isAdmin: boolean,
    entityId: string,
  ) {
    if (!fieldValue) {
      return false;
    }
    const filter: any = {
      [fieldName]: fieldValue,
      // role: UserRole.COLLABORATOR,
    };
    // if (isAdmin) {
    //   filter.role = UserRole.ADMIN;
    // }
    // if (organization) {
    //   filter.organization = organization;
    // }
    if (entityId) {
      filter._id = { $ne: entityId };
    }
    const found = await this.findOne(filter);
    return Boolean(found);
  }

  findByIdOrFail(_id: string): Promise<IUser> {
    return this.findOneOrFail({ _id });
  }

  async updateMyAdminPassword(
    user: IUser,
    password: string,
    newPassword: string,
  ) {
    user.password = bcrypt.hashSync(newPassword, 10);
    return this.updateOne({ _id: user._id }, user);
  }

  async resetPassword(userId: string, newPassword: string) {
    const resetEndpoint = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_ENTERPRISE_REALM}/users/${userId}/reset-password`;
    const body = {
      type: 'password',
      value: newPassword,
      temporary: false,
    };
    const accessToken = ''; //(await this.getAdminToken()).access_token;

    const headersRequest = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await lastValueFrom(
        this.httpService.put(resetEndpoint, body, { headers: headersRequest }),
      );
      return true;
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException('Quelque chose a mal tourné!');
    }
  }

  async updateUser(userId: string, payload: UpdateCollaboratorInput) {
    return this.updateOneById(userId, payload);
  }

  async updateMyProfile(userId: string, payload: UpdateMyAdminProfileInput) {
    return this.updateOneById(userId, payload);
    // try {
    //   const response = await lastValueFrom(
    //     this.httpService.put(`${USER_SERVICE_URL}/users/${userId}`, payload),
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.warn(error);
    //   return { success: false, error: error.message };
    // }
  }

  async getUserById(_id: string) {
    return this.findOneOrFail({ _id });
  }

  async fetchMyCollaborators(
    organization: string,
    metricsInput: DemandesMetricsInput,
  ) {
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    return this.findManyAndPaginate({
      role: UserRole.COLLABORATOR,
      organization,
      createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
    });
    return this.findMany({
      role: UserRole.COLLABORATOR,
      organization,
      createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
    });
  }

  async fetchMyAdmins(organization: string) {
    return this.findMany({ organization, role: UserRole.ADMIN });
  }

  async fetchCollaboratorsThatHasPendingDemandes(
    queryConfig: any,
    queryFilter: any,
  ): Promise<any> {
    const {
      limit,
      page = 1,
      orderBy,
      search,
    } = normalizeQueryDataConfig(queryConfig);
    const skip = (page - 1) * limit;

    const stages = [
      {
        $match: {
          ...queryFilter,
        },
      },
      {
        $lookup: {
          from: 'demandes',
          localField: '_id',
          foreignField: 'owner',
          as: 'demandes',
        },
      },
      {
        $match: {
          'demandes.status': 'PENDING',
        },
      },
      {
        $addFields: {
          pendingDemandes: {
            $filter: {
              input: '$demandes',
              as: 'demande',
              cond: { $eq: ['$$demande.status', 'PENDING'] },
            },
          },
        },
      },
      {
        $addFields: {
          pendingDemandesCount: { $size: '$pendingDemandes' },
        },
      },
      {
        $match: {
          pendingDemandesCount: { $gt: 0 },
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          uniqueIdentifier: 1,
          salary: 1,
          balance: 1,
          role: 1,
          organization: 1,
          pendingDemandesCount: 1,
          pendingDemandes: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const totalCount = await this.aggregateTotal([
      ...stages,
      { $count: 'total' },
    ]);

    const results = await this.aggregateMany([
      ...stages,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $set: { id: '$_id' } },
    ]);

    const pageCount = Math.ceil(totalCount / limit);
    const currentPage = page;
    const pageSize = results.length;

    const pagination: PaginationInfo = {
      totalItems: totalCount,
      pageCount,
      currentPage,
      pageSize,
    };

    return { results, pagination };
  }
}
