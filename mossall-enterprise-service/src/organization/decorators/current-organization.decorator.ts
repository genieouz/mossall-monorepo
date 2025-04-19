import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { getRequestFromContext } from '~/commons/utils';

export const CurrentOrganization = createParamDecorator(
  (pick: string, context: any) => {
    const req = getRequestFromContext(context);

    const data = req.organization;
    return pick ? data[pick] : data;
  },
);
