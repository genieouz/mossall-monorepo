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
}
