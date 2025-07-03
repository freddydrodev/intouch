import { z } from "zod";
import { baseResponseDataSchema } from "./common";

/**
 * Schema for base cashout additional information
 * @typedef {Object} BaseCashoutAdditionnalInfos
 * @property {string} recipientEmail - Email address of the recipient
 * @property {string} recipientFirstName - First name of the recipient
 * @property {string} recipientLastName - Last name of the recipient
 * @property {string} destinataire - Destination information
 */
export const baseCashoutAdditionnalInfosSchema = z.object({
  recipientEmail: z.string().email(),
  recipientFirstName: z.string(),
  recipientLastName: z.string(),
  destinataire: z.string(),
});

/**
 * Schema for base cashout data
 * @typedef {Object} BaseCashoutData
 * @property {string} idFromClient - Unique identifier from the client
 * @property {number} amount - Positive amount for the transaction
 * @property {string} callback - Valid URL for callback notifications
 * @property {string} recipientNumber - Phone number of the recipient
 */
export const baseCashoutDataSchema = z.object({
  idFromClient: z.string(),
  amount: z.number().positive(),
  callback: z.string().url(),
  recipientNumber: z.string(),
});

/**
 * Schema for Orange Money CI cashout data
 */
export const omCICashoutDataSchema = baseCashoutDataSchema.extend({
  additionnalInfos: baseCashoutAdditionnalInfosSchema.extend({
    otp: z.string(),
  }),
  serviceCode: z.literal("PAIEMENTMARCHANDOMPAYCIDIRECT"),
});

/**
 * Schema for MOOV CI cashout data
 */
export const moovCICashoutDataSchema = baseCashoutDataSchema.extend({
  additionnalInfos: baseCashoutAdditionnalInfosSchema,
  serviceCode: z.literal("PAIEMENTMARCHAND_MOOV_CI"),
});

/**
 * Schema for MTN CI cashout data
 */
export const mtnCICashoutDataSchema = baseCashoutDataSchema.extend({
  additionnalInfos: baseCashoutAdditionnalInfosSchema,
  serviceCode: z.literal("PAIEMENTMARCHAND_MTN_CI"),
});

/**
 * Schema for WAVE CI cashout data
 */
export const waveCICashoutDataSchema = baseCashoutDataSchema.extend({
  additionnalInfos: baseCashoutAdditionnalInfosSchema.extend({
    partner_name: z.string(),
    return_url: z.string().url(),
    cancel_url: z.string().url(),
  }),
  serviceCode: z.literal("CI_PAIEMENTWAVE_TP"),
});

/**
 * Schema for cashout response data
 */
export const cashoutResponseDataSchema = baseResponseDataSchema.extend({
  serviceCode: z
    .enum([
      "PAIEMENTMARCHANDOMPAYCIDIRECT",
      "PAIEMENTMARCHAND_MOOV_CI",
      "PAIEMENTMARCHAND_MTN_CI",
      "CI_PAIEMENTWAVE_TP",
    ] as const)
    .optional(),
});
