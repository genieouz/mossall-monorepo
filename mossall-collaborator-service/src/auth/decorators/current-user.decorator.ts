import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { getRequestFromContext } from '~/commons/utils';

export const CurrentUser = createParamDecorator(
  (pick: string, context: any) => {
    const req = getRequestFromContext(context);
    return pick ? req.user[pick] : req.user;
  },
);
