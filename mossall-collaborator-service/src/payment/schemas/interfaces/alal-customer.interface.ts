export interface IALALCustomer {
  full_name: string;
  email: string;
  phone: string;
  bank_name?: string;
  bank_id?: string;
  bank_account_name?: string;
}

export interface IALALDisburseRequestBody {
  amount: number;
  network: string;
  customer: IALALCustomer;
  webhook_url?: string;
}

export interface Disburse {
  business: string;
  customer: IALALCustomer;
  slug: string;
  reference: string;
  kind: string;
  network: string;
  amount: number;
  status: string;
  expired_at: string;
  meta: any;
}

export interface ALALApiResponseData {
  disburse: Disburse;
}

export interface ALALApiResponse {
  message: string;
  statusCode: number;
  data: ALALApiResponseData;
}
