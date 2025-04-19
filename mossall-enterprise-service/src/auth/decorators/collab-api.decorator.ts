import { SetMetadata } from '@nestjs/common';

export const IS_COLLAB_API = 'isCollabApi';
export const CollabApi = () => SetMetadata(IS_COLLAB_API, true);
