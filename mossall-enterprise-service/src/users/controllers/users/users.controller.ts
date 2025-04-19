import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AuthGuard } from '~/auth/auth.guard';
import { TOKEN_NAME } from '~/auth/constant';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { UserRole } from '~/users/enums/user-role.enum';
import { FileUploadService } from '~/users/file.upload.service';
import {
  IUser,
  UploadUserResponse,
} from '~/users/schemas/interfaces/user.interface';

@ApiTags('users')
@ApiBearerAuth(TOKEN_NAME)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private fileUploadService: FileUploadService) {}

  @ApiOperation({ summary: 'Upload XLSX file' })
  @ApiResponse({
    status: 201,
    description: 'The upload file has been successfully done.',
    type: UploadUserResponse, // Assuming UploadUserResponse is the response DTO
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `XLSX file containing user data \n the format is: \n
   Prénom   |  Nom   |  Adresse e-mail   |  Date de naissance      |  adresse     |  Identifiant unique   |  salaire   |  Compte bancaire   |  Téléphone | Fonction`,
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'XSLX',
          format: '.xlsx',
        },
      },
    },
  })
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
        validators: [
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentOrganization() organization: IOrganization,
    @Query('type') type: UserRole,
  ) {
    return this.fileUploadService.uploadCsvFile(file, organization.id, type);
  }
}
