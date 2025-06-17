import { z } from "zod";

/**
 * Schema for base response data shared between cashin and cashout
 * @typedef {Object} BaseResponseData
 * @property {"SUCCESSFUL" | "INITIATED"} [status] - Status of the transaction
 * @property {string} [message] - Error message if any
 * @property {string} [idFromClient] - Client's transaction ID
 * @property {string} [idFromGU] - GU's transaction ID
 * @property {number} [amount] - Transaction amount
 * @property {number} [fees] - Transaction fees
 * @property {string} [recipientNumber] - Recipient's phone number
 * @property {number} [dateTime] - Transaction timestamp
 * @property {string} [numTransaction] - Transaction number
 * @property {string} [payment_url] - Payment URL
 * @property {string} [detailMessage] - Detailed message
 */
export const baseResponseDataSchema = z.object({
  status: z.enum(["SUCCESSFUL", "INITIATED"]).optional(),
  message: z.string().optional(),
  idFromClient: z.string().optional(),
  idFromGU: z.string().optional(),
  amount: z.number().optional(),
  fees: z.number().optional(),
  recipientNumber: z.string().optional(),
  dateTime: z.number().optional(),
  numTransaction: z.string().optional(),
  payment_url: z.string().optional(),
  detailMessage: z.string().optional(),
});
