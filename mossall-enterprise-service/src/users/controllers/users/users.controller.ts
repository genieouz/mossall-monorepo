import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '~/auth/auth.guard';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { FileUploadService } from '~/users/file.upload.service';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private fileUploadService: FileUploadService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  async addUsers(
    @Body() payload: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.csv' })],
      }),
    )
    file: Express.Multer.File,
    @CurrentOrganization() organization: IOrganization,
  ) {
    return this.fileUploadService.uploadCsvFile(file, organization._id);
  }
}
