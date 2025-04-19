import {
  Body,
  Controller,
  ForbiddenException,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import {
  ALALApiResponseData,
  Disburse,
} from '../schemas/interfaces/alal-customer.interface';
import { IPayment } from '../schemas/interfaces/payment.interface';
import { PaymentService } from '../services/payment.service';
import * as crypto from 'crypto';
import { ALAL_API_KEY } from '~/config/env';
import { Request } from 'express';
import { DemandeService } from '~/demande/services/demande.service';
import { DemandeStatus } from '~/demande/enums/demande-status.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '~/auth/constant';
@ApiTags('Payment')
@ApiBearerAuth(TOKEN_NAME)
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(`🖇️ ${PaymentController.name}🖇️`);
  constructor(
    private paymentService: PaymentService,
    private demandeService: DemandeService,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({ summary: 'Update Disburse' })
  @ApiResponse({
    status: 201,
    description: 'Disburse updated successfully',
    // type: UploadUserResponse, // Assuming UploadUserResponse is the response DTO
  })
  @Post('disburses/update')
  async updateDisburse(
    @Body() body: { event: string; data: Disburse },
    @Req() req: Request,
  ) {
    this.logger.log('===> IN WEBHOOK');
    const hash = crypto
      .createHmac('sha512', ALAL_API_KEY)
      .update(JSON.stringify(body))
      .digest('hex');
    this.logger.log('===> IN WEBHOOK HASH');
    this.logger.log(hash);
    if (hash == req.headers['x-alal-signature']) {
      this.logger.log('===> IN WEBHOOK HASH VALID');
      const disburse: Disburse = body.data;

      this.logger.log('WEBHOOK BODY ===> ');
      this.logger.log(body);
      this.logger.log('Search for transaction');
      const found = await this.paymentService.findOne({
        reference: disburse.reference,
      });
      this.logger.log({ foundTransaction: found });
      if (!found) {
        // await this.paymentService.insertOne(disburse as IPayment);
        throw new ForbiddenException(`Transaction non reconnue!`);
      } else {
        const demandeByRef = await this.demandeService.findOne({
          transactionReference: disburse.reference,
        });
        this.logger.log('Search Demande By Transaction Reference');
        if (!demandeByRef) {
          this.logger.log('Missing Demande By Transaction Reference');
        } else {
          this.logger.log(
            'Found Demande By Transaction Reference ' + String(demandeByRef.id),
          );
        }
        const disburseWithoutMeta = disburse;
        delete disburseWithoutMeta.meta;
        const updateTransactionResult = await this.paymentService.updateOne(
          { reference: disburse.reference },
          disburseWithoutMeta,
        );
        this.logger.log({ updateTransactionResult });
        const date = new Date();
        const demande = await this.demandeService.findOneAndUpdate(
          { _id: demandeByRef.id },
          { status: DemandeStatus.VALIDATED, pendingPayment: false },
        );
        this.logger.log({ demandeUpdateResult: demande });

        // return demande;
      }
    } else {
      this.logger.log('===> IN WEBHOOK HASH NOT VALID');
    }
  }
}
