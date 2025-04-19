import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { UserService } from '~/users/user.service';
import {
  ALALApiResponse,
  ALALApiResponseData,
  Disburse,
  IALALDisburseRequestBody,
} from '../schemas/interfaces/alal-customer.interface';
import { IPayment } from '../schemas/interfaces/payment.interface';
import { paymentModelName } from '../schemas/payment.model-name';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { ALAL_API_KEY, ALAL_API_URL, ENTERPRISE_SERVICE } from '~/config/env';

@Injectable()
export class PaymentService extends AbstractService<IPayment> {
  constructor(
    @InjectModel(paymentModelName) model: Model<IPayment>,
    private userService: UserService,
    // private demandeService: DemandeService,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {
    super(model);
  }

  async validateDemande(demande: IDemande, validatedBy: string) {
    // const demande = await this.demandeService.findOneByIdOrFail(demandeId);
    console.log('============== validateDemande ==============');

    const collab = await this.userService.findOneByIdOrFail(demande.owner);

    if (!collab.phoneNumber) {
      throw new BadRequestException(
        "Le collaborateur ne dispose pas d'un numéro de téléphone valide!",
      );
    }
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ALAL_API_KEY}`,
      },
    };
    try {
      const body: IALALDisburseRequestBody = {
        amount: demande.amount,
        network: 'wave-sn',
        customer: {
          email: collab.email,
          full_name: `${collab.firstName} ${collab.lastName}`,
          phone: collab.phoneNumber,
        },
        webhook_url: `${ENTERPRISE_SERVICE}/payment/disburses/update`,
      };
      const result: any = (await lastValueFrom(
        this.httpService.post(
          `${ALAL_API_URL}/disburses/create`,
          body,
          headers,
        ),
      )) as any;
      console.log('==============');
      console.log(result.data.data);
      console.log('==============');

      const payment = await this.insertOne({
        ...result.data.data.disburse,
        meta: { demandeId: demande.id, validatedBy },
      });

      this.eventEmitter.emit('activity.demande.autoValidate', {
        initialValue: demande,
        user: collab,
      });
      return payment;
    } catch (error) {
      this.eventEmitter.emit('activity.demande.autoValidate', {
        initialValue: demande,
        user: collab,
      });
      console.log(error);
      throw error;
    }
  }
}
