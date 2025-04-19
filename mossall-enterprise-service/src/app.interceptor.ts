import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { getRequestFromContext } from './commons/utils';
import { OrganizationService } from './organization/services/organization.service';
import { UserService } from './users/user.service';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(
    private userService: UserService,
    private organizationService: OrganizationService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = getRequestFromContext(context);

      //   const org = this.userService.aggregateOne([
      //   {
      //     $match: {
      //       id: req.user?.sub
      //     }
      //   },
      //   { $set: { organization: { $toObjectId: "$organization" } } },
      //   {
      //     $lookup: {
      //       from: "organizations",
      //       localField: "organization",
      //       foreignField: "_id",
      //       as: "organization"
      //     }
      //   },
      //   { $unwind: "$organization" },
      //   {
      //     $replaceRoot: { newRoot: "$organization" }
      //   }
      // ])
      return from(this.addCustomDataToRequest(req)).pipe(
        switchMap(() => next.handle())
      );

      
    // return next.handle().pipe(tap(async () => {
    //   const user = await this.userService.findById(req?.user?.sub);
    //   const org = await this.organizationService.findOneById(user?.organization);

    //   console.log({interceptor: org})
    //   req.organization = org;

    // }))
  }

  private async addCustomDataToRequest(request: any) {
    if (request.user) {
      const user = await this.userService.findById(request?.user?._id);
      const org = await this.organizationService.findOneById(user?.organization);
      request.organization = org;
      request.internalUser = user;
    }
  }
}

