import { Document } from 'mongoose';
import { Disburse } from './alal-customer.interface';

export interface IPayment extends Document, Disburse {

}
