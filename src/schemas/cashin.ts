import { z } from "zod";
import { baseResponseDataSchema } from "./common";

/**
 * Schema for base cashin data
 * @typedef {Object} BaseCashinData
 * @property {string} service_id - Service identifier
 * @property {string} recipient_phone_number - Phone number of the recipient
 * @property {number} amount - Positive amount for the transaction
 * @property {string} partner_id - Partner identifier
 * @property {string} partner_transaction_id - Partner's transaction identifier
 * @property {string} login_api - API login credentials
 * @property {string} password_api - API password credentials
 * @property {string} call_back_url - Valid URL for callback notifications
 */
export const baseCashinDataSchema = z.object({
  service_id: z.string(),
  recipient_phone_number: z.string(),
  amount: z.number().positive(),
  partner_id: z.string(),
  partner_transaction_id: z.string(),
  login_api: z.string(),
  password_api: z.string(),
  call_back_url: z.string().url(),
});

/**
 * Schema for Orange Money CI cashin data
 */
export const omCICashinDataSchema = baseCashinDataSchema.extend({
  service_id: z.literal("CASHINOMCIPART"),
});

/**
 * Schema for MOOV CI cashin data
 */
export const moovCICashinDataSchema = baseCashinDataSchema.extend({
  service_id: z.literal("CASHINMOOVPART"),
});

/**
 * Schema for MTN CI cashin data
 */
export const mtnCICashinDataSchema = baseCashinDataSchema.extend({
  service_id: z.literal("CASHINMTNPART"),
});

/**
 * Schema for WAVE CI cashin data
 */
export const waveCICashinDataSchema = baseCashinDataSchema.extend({
  service_id: z.literal("CI_CASHIN_WAVE_PART"),
});

/**
 * Schema for cashin response data
 */
export const cashinResponseDataSchema = baseResponseDataSchema.extend({
  serviceCode: z
    .enum([
      "CASHINOMCIPART",
      "CASHINMOOVPART",
      "CASHINMTNPART",
      "CI_CASHIN_WAVE_PART",
    ] as const)
    .optional(),
});
