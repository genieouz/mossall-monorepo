import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
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
import { CollabApi } from '~/auth/decorators/collab-api.decorator';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { DemandeFileService } from '~/demande/services/demande-file.service';
import { DemandeService } from '~/demande/services/demande.service';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import {
  IUser,
  UploadUserResponse,
} from '~/users/schemas/interfaces/user.interface';

@UseGuards(AuthGuard)
@ApiTags('demande')
@ApiBearerAuth(TOKEN_NAME)
@Controller('demande')
export class DemandeController {
  constructor(
    private demandeFileService: DemandeFileService,
    private readonly demandeService: DemandeService,
  ) {}
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
    description: `XLSX file containing request of collaborators \n the format is: \n
   Prénom   |  Nom   |  Email    |  Identifiant unique    |  Telephone | Avance renboursée`,
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
  async uploadDemandes(
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
    @CurrentUser() user: IUser,
  ) {
    return this.demandeFileService.uploadFile(file, organization, user);
  }

  @CollabApi()
  @Post('autovalidate')
  async autoValidateDemandes(
    @Body() payload: { demandeId: string; user: IUser },
  ) {
    const { demandeId, user } = payload;

    return this.demandeService.validate(demandeId, user, true);
  }
}
