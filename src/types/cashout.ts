import { TCashoutServiceCode } from "./common";

export type CashoutResponseData = {
  //both
  status?: "SUCCESSFUL" | "INITIATED" | "PENDING";

  //error case
  message?: string;

  //success case
  idFromClient?: string;
  idFromGU?: string;
  amount?: number;
  fees?: number;
  serviceCode?: TCashoutServiceCode;
  recipientNumber?: string;
  dateTime?: number;
  numTransaction?: string;
  payment_url?: string;
  detailMessage?: string;
};

export type BaseCashoutAdditionnalInfos = {
  recipientEmail: string;
  recipientFirstName: string;
  recipientLastName: string;
  destinataire: string;
};

export type BaseCashoutData = {
  idFromClient: string;
  amount: number;
  callback: string;
  recipientNumber: string;
};

export type OM_CI_CashoutData = BaseCashoutData & {
  additionnalInfos: BaseCashoutAdditionnalInfos & {
    otp: string;
  };
  serviceCode: "PAIEMENTMARCHANDOMPAYCIDIRECT";
};

export type MOOV_CI_CashoutData = BaseCashoutData & {
  additionnalInfos: BaseCashoutAdditionnalInfos;
  serviceCode: "PAIEMENTMARCHAND_MOOV_CI";
};

export type MTN_CI_CashoutData = BaseCashoutData & {
  additionnalInfos: BaseCashoutAdditionnalInfos;
  serviceCode: "PAIEMENTMARCHAND_MTN_CI";
};

export type WAVE_CI_CashoutData = BaseCashoutData & {
  additionnalInfos: BaseCashoutAdditionnalInfos & {
    partner_name: string;
    return_url: string;
    cancel_url: string;
  };
  serviceCode: "CI_PAIEMENTWAVE_TP";
};
