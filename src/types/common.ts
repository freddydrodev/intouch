export type TCashoutServiceCode =
  | "PAIEMENTMARCHANDOMPAYCIDIRECT"
  | "PAIEMENTMARCHAND_MOOV_CI"
  | "PAIEMENTMARCHAND_MTN_CI"
  | "CI_PAIEMENTWAVE_TP";

export type TCashinServiceCode =
  | "CASHINOMCIPART"
  | "CASHINMOOVPART"
  | "CASHINMTNPART"
  | "CI_CASHIN_WAVE_PART";

export type TTransactionProvider = "OM_CI" | "MOOV_CI" | "MTN_CI" | "WAVE_CI";
