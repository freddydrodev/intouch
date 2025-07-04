import { TCashinServiceCode } from "./common";

export type CashinResponseData = {
  //both
  status?: "SUCCESSFUL" | "INITIATED" | "PENDING";

  //error case
  message?: string;

  //success case
  idFromClient?: string;
  idFromGU?: string;
  amount?: number;
  fees?: number;
  serviceCode?: TCashinServiceCode;
  recipientNumber?: string;
  dateTime?: number;
  numTransaction?: string;
  payment_url?: string;
  detailMessage?: string;
};

export type BaseCashinData = {
  service_id: TCashinServiceCode;
  recipient_phone_number: string;
  amount: number;
  partner_id: string;
  partner_transaction_id: string;
  login_api: string;
  password_api: string;
  call_back_url: string;
};

export type OM_CI_CashinData = BaseCashinData & {
  service_id: "CASHINOMCIPART";
};

export type MOOV_CI_CashinData = BaseCashinData & {
  service_id: "CASHINMOOVPART";
};

export type MTN_CI_CashinData = BaseCashinData & {
  service_id: "CASHINMTNPART";
};

export type WAVE_CI_CashinData = BaseCashinData & {
  service_id: "CI_CASHIN_WAVE_PART";
};
