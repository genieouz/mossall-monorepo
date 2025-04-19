import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { CollaboratorsService } from '~/collaborators/collaborators.service';
import { IDemande } from '~/collaborators/models/interfaces/demande.interface';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ALAL_API_KEY, ALAL_API_URL } from '~/config/env';
import { DemandeService } from '~/demande/services/demande.service';
import { UserService } from '~/users/user.service';
import {
  ALALApiResponse,
  ALALApiResponseData,
  Disburse,
  IALALDisburseRequestBody,
} from '../schemas/interfaces/alal-customer.interface';
import { IPayment } from '../schemas/interfaces/payment.interface';
import { paymentModelName } from '../schemas/payment.model-name';

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
    const admin = await this.userService.findOneById(validatedBy);
    const collab = await this.userService.findByIdOrFail(demande.owner);
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
      };
      const result: any = (await lastValueFrom(
        this.httpService.post(
          `${ALAL_API_URL}/disburses/create`,
          body,
          headers,
        ),
      )) as any;
      const payment = await this.insertOne({
        ...result.data.data.disburse,
        meta: { demandeId: demande.id, validatedBy },
      })
      
      this.eventEmitter.emit('activity.demande.validate', { initialValue: demande, user: admin });
      // this.eventEmitter.emit('new_payment', {
      //   ...result.data.data.disburse,
      //   meta: { demandeId: demande.id },
      // });
      return payment;
    } catch (error) {
      this.eventEmitter.emit('activity.demande.validate', { initialValue: demande, user: admin });
      console.log(error);
      throw error;
    }
  }

  @OnEvent('new_payment')
  private async newPayment(payment: Disburse) {
    await this.insertOne(payment as IPayment);
  }
}
